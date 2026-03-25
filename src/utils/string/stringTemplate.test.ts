import { describe, it, expect } from "vitest";
import { stringTemplate } from "./stringTemplate";

describe("stringTemplate", () => {
  it("should replace a single placeholder with a value from the template object", () => {
    expect(stringTemplate("Hello {{name}}!", { name: "World" })).toBe("Hello World!");
    expect(stringTemplate("Welcome, {{user}}.", { user: "Alice" })).toBe("Welcome, Alice.");
  });

  it("should replace multiple placeholders", () => {
    const templateObj = { name: "Bob", age: 30 };
    expect(stringTemplate("{{name}} is {{age}} years old.", templateObj))
      .toBe("Bob is 30 years old.");
  });

  it("should replace repeated placeholders", () => {
    expect(stringTemplate("{{word}} {{word}} {{word}}", { word: "echo" }))
      .toBe("echo echo echo");
  });

  it("should handle different data types in the template object", () => {
    const templateObj = {
      str: "text",
      num: 42,
      bool: true,
      obj: { key: "value" },
      arr: [1, 2, 3],
    };
    expect(stringTemplate("{{str}}, {{num}}, {{bool}}, {{obj}}, {{arr}}", templateObj))
      .toBe("text, 42, true, [object Object], 1,2,3");
  });

  it("should leave unmatched placeholders unchanged", () => {
    expect(stringTemplate("Hello {{unknown}}!", { name: "World" }))
      .toBe("Hello {{unknown}}!");
    expect(stringTemplate("{{missing}} and {{present}}", { present: "found" }))
      .toBe("{{missing}} and found");
  });

  it("should replace placeholders with null or undefined values with the original placeholder", () => {
    const templateObj = {
      nil: null,
      undef: undefined,
    };
    expect(stringTemplate("{{nil}}, {{undef}}", templateObj))
      .toBe("{{nil}}, {{undef}}");
  });

  it("should return an empty string if the input is not a valid string", () => {
    // @ts-ignore Testing incorrect type on purpose
    expect(stringTemplate(null, { name: "World" })).toBe("");
    // @ts-ignore
    expect(stringTemplate(undefined, { name: "World" })).toBe("");
    // @ts-ignore
    expect(stringTemplate(123, { name: "World" })).toBe("");
  });

  it("should return an empty string if the input is an empty string", () => {
    expect(stringTemplate("", { name: "World" })).toBe("");
  });

  it("should handle complex templates with surrounding text", () => {
    const templateObj = { adjective: "powerful", noun: "tool" };
    expect(stringTemplate("This is a {{adjective}} {{noun}}.", templateObj))
      .toBe("This is a powerful tool.");
  });

  it("should work with a custom regular expression", () => {
    const customRegex = /\$\{(.+?)\}/g;
    const templateObj = { greeting: "Hey", target: "folks" };
    // eslint-disable-next-line no-template-curly-in-string
    expect(stringTemplate("`${greeting} ${target}!`", templateObj, customRegex))
      .toBe("`Hey folks!`");
  });

  it("should handle consecutive placeholders correctly", () => {
    // The regex /\{\{(.+?)\}\}/ uses non-greedy matching and works for adjacent placeholders.
    expect(stringTemplate("{{adj}}{{noun}}", { adj: "big", noun: "car" }))
      .toBe("bigcar");

    // And also for those with separators
    expect(stringTemplate("{{adj}}-{{noun}}", { adj: "big", noun: "car" }))
      .toBe("big-car");
  });

  it("should reset regex lastIndex to prevent state issues on subsequent calls", () => {
    const sharedRegex = /\{\{(.+?)\}\}/g;

    // First call
    expect(stringTemplate("{{a}} and {{b}}", { a: "first", b: "second" }, sharedRegex))
      .toBe("first and second");

    // Second call with same regex should behave identically
    expect(stringTemplate("{{a}} and {{b}}", { a: "first", b: "second" }, sharedRegex))
      .toBe("first and second");
  });
});
