import { isNaN, isReadableStream } from "../../utils";

const CONTROL_CHARS_ENUM = {
  NEW_LINE: 10,
  CARRIAGE_RETURN: 13,
  SPACE: 32,
  COLON: 58,
} as const;

/**
 * Represents a message sent in an event stream
 * https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format
 */
export interface EventSourceMessage {
  /**
   * The event ID to set the EventSource object's last event ID value.
   */
  id: string;
  /**
   * A string identifying the type of event described.
   */
  event: string;
  /**
   * The event data
   */
  data: string;
  /**
   * The delay to wait before reconnection.
   * @unit ms
   */
  reconnectionDelay?: number | undefined;
}

/**
 * Converts a ReadableStream into a callback pattern.
 * @param stream The input ReadableStream.
 * @param onChunk A function that will be called on each new byte chunk in the stream.
 * @returns A promise that will be resolved when the stream closes.
 */
export async function getBytes(stream: ReadableStream<Uint8Array> | AsyncIterable<Uint8Array>, onChunk: (array: Uint8Array) => void) {
  if (isReadableStream(stream)) {
    const reader = stream.getReader();
    let result: ReadableStreamReadResult<Uint8Array>;
    while (!(result = await reader.read()).done) {
      onChunk(result.value);
    }
  } else {
    for await (const chunk of stream) {
      onChunk(chunk);
    }
  }
}

/**
 * Parses arbitrary byte chunks into EventSource line buffers.
 * Each line should be of the format "field: value" and ends with \r, \n, or \r\n.
 * @param onLine A function that will be called on each new EventSource line.
 * @returns A function that should be called for each incoming byte chunk.
 */
export function getLines(onLine: (line: Uint8Array, fieldLength: number) => void) {
  let buffer: Uint8Array | undefined;
  let position: number; // current read position
  let fieldLength: number; // length of the `field` portion of the line
  let discardTrailingNewline = false;

  // return a function that can process each incoming byte chunk:
  return function onChunk(arr: Uint8Array) {
    if (buffer === undefined) {
      buffer = arr;
      position = 0;
      fieldLength = -1;
    } else {
      // we're still parsing the old line. Append the new bytes into buffer:
      buffer = concat(buffer, arr);
    }

    const bufLength = buffer.length;
    let lineStart = 0; // index where the current line starts
    while (position < bufLength) {
      if (discardTrailingNewline) {
        if (buffer[position] === CONTROL_CHARS_ENUM.NEW_LINE) {
          lineStart = ++position; // skip to next char
        }

        discardTrailingNewline = false;
      }

      // start looking forward till the end of line:
      let lineEnd = -1; // index of the \r or \n char
      for (; position < bufLength && lineEnd === -1; ++position) {
        switch (buffer[position]) {
          case CONTROL_CHARS_ENUM.COLON:
            if (fieldLength === -1) {
              // first colon in line
              fieldLength = position - lineStart;
            }
            break;
          // @ts-ignore:7029 \r case below should fallthrough to \n:
          case CONTROL_CHARS_ENUM.CARRIAGE_RETURN:
            discardTrailingNewline = true;

          case CONTROL_CHARS_ENUM.NEW_LINE:
            lineEnd = position;
            break;

          default:
            break;
        }
      }

      if (lineEnd === -1) {
        // We reached the end of the buffer but the line hasn't ended.
        // Wait for the next arr and then continue parsing:
        break;
      }

      // we've reached the line end, send it out:
      onLine(buffer.subarray(lineStart, lineEnd), fieldLength);
      lineStart = position; // we're now on the next line
      fieldLength = -1;
    }

    if (lineStart === bufLength) {
      buffer = undefined; // we've finished reading it
    } else if (lineStart !== 0) {
      // Create a new view into buffer beginning at lineStart so we don't
      // need to copy over the previous lines when we get the new arr:
      buffer = buffer.subarray(lineStart);
      position -= lineStart;
    }
  };
}

/**
 * Parses line buffers into EventSourceMessages.
 * @param onId A function that will be called on each `id` field.
 * @param onReconnect A function that will be called on each `retry` field.
 * @param onMessage A function that will be called on each message.
 * @returns A function that should be called for each incoming line buffer.
 */
export function getMessages(
  onMessage?: (message: EventSourceMessage) => void,
  onId?: (id: string) => void,
  onReconnect?: (delay: number) => void,
) {
  const decoder = new TextDecoder();
  let message = createMessage();

  // return a function that can process each incoming line buffer:
  return function onLine(line: Uint8Array, fieldLength: number) {
    if (line.length === 0) {
      // If the data buffer's last character is a U+000A LINE FEED (LF) character, then remove the last character from the data buffer.
      if (message.data.endsWith("\n")) {
        message.data = message.data.substring(0, message.data.length - 1);
      }

      // empty line denotes end of message. Trigger the callback and start a new message:
      onMessage?.(message);
      message = createMessage();
    } else if (fieldLength > 0) {
      // exclude comments and lines with no values
      // line is of format "<field>:<value>" or "<field>: <value>"
      // https://html.spec.whatwg.org/multipage/server-sent-events.html#event-stream-interpretation
      const field = decoder.decode(line.subarray(0, fieldLength));
      const valueOffset = fieldLength + (line[fieldLength + 1] === CONTROL_CHARS_ENUM.SPACE ? 2 : 1);
      const value = decoder.decode(line.subarray(valueOffset));

      switch (field) {
        case "id":
          onId?.((message.id = value));
          break;

        case "event":
          message.event = value;
          break;

        case "data":
          // Append the field value to the data buffer, then append a single U+000A LINE FEED (LF) character to the data buffer.
          message.data = message.data + value + "\n";
          break;

        case "reconnectionDelay":
          {
            const reconnectionDelay = parseInt(value, 10);
            if (!isNaN(reconnectionDelay)) {
              // per spec, ignore non-integers
              onReconnect?.((message.reconnectionDelay = reconnectionDelay));
            }
          }

          break;

        default:
          break;
      }
    }
  };
}

function concat(a: Uint8Array, b: Uint8Array) {
  const res = new Uint8Array(a.length + b.length);
  res.set(a);
  res.set(b, a.length);

  return res;
}

function createMessage(): EventSourceMessage {
  // data, event, and id must be initialized to empty strings:
  // https://html.spec.whatwg.org/multipage/server-sent-events.html#event-stream-interpretation
  // retry should be initialized to undefined so we return a consistent shape
  // to the js engine all the time: https://mathiasbynens.be/notes/shapes-ics#takeaways
  return { id: "", event: "", data: "", reconnectionDelay: undefined };
}
