export function stringTemplate(input: string, data: Record<string, unknown>, regex = /\{\{(.+?)\}\}/g): string {
  let result = "";
  let from = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(input))) {
    result += input.slice(from, match.index) + data[match[1]!];
    from = regex.lastIndex;
  }

  return result + input.slice(from);
}
