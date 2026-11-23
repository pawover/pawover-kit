import { describe, expect, it } from "vitest";
import {
  isBaselinePath,
  parseStatusEntries,
  parseStatusPaths,
  patchPackageVersion,
  untrackedPaths,
} from "../../../../scripts/syncBaseline.ts";

const PACKAGE_CONTENT = [
  "{",
  '  "name": "@pawover/kit-utils",',
  '  "version": "1.1.1-alpha.0",',
  '  "scripts": {',
  '    "build": "tsdown"',
  "  },",
  '  "devDependencies": {',
  '    "@pawover/kit-internal": "workspace:*"',
  "  }",
  "}",
  "",
].join("\n");

describe("parseStatusEntries", () => {
  it("should parse NUL separated entries without unescaping paths", () => {
    const status = [
      " M package.json",
      "M  packages/utils/package.json",
      "D  .changeset/pre/abc.md",
      "?? unexpected file.txt",
      "?? 文档.txt",
      "",
    ].join("\0");

    expect(parseStatusEntries(status)).toEqual([
      { code: " M", path: "package.json" },
      { code: "M ", path: "packages/utils/package.json" },
      { code: "D ", path: ".changeset/pre/abc.md" },
      { code: "??", path: "unexpected file.txt" },
      { code: "??", path: "文档.txt" },
    ]);
  });

  it("should pair rename entries with their original path", () => {
    expect(parseStatusEntries("R  new/CHANGELOG.md\0old/CHANGELOG.md\0")).toEqual([
      { code: "R ", path: "new/CHANGELOG.md", originalPath: "old/CHANGELOG.md" },
    ]);
  });

  it("should handle empty output", () => {
    expect(parseStatusEntries("")).toEqual([]);
    expect(parseStatusEntries("\0")).toEqual([]);
  });
});

describe("parseStatusPaths", () => {
  it("should return every path including rename originals", () => {
    const status = " M package.json\0?? unexpected file.txt\0R  new.md\0old.md\0";

    expect(parseStatusPaths(status)).toEqual([
      "package.json",
      "unexpected file.txt",
      "new.md",
      "old.md",
    ]);
  });

  it("should handle empty output", () => {
    expect(parseStatusPaths("")).toEqual([]);
  });
});

describe("untrackedPaths", () => {
  it("should select only untracked entries with spaces and non-ASCII names", () => {
    const status = " M package.json\0?? .changeset/pre/new.md\0?? unexpected file.txt\0?? 文档.txt\0";

    expect(untrackedPaths(status)).toEqual([".changeset/pre/new.md", "unexpected file.txt", "文档.txt"]);
  });

  it("should return an empty list when nothing is untracked", () => {
    expect(untrackedPaths("")).toEqual([]);
    expect(untrackedPaths(" M package.json\0")).toEqual([]);
  });
});

describe("isBaselinePath", () => {
  it("should allow package files", () => {
    expect(isBaselinePath("package.json")).toBe(true);
    expect(isBaselinePath("packages/utils/package.json")).toBe(true);
    expect(isBaselinePath("packages/eslint-rules/package.json")).toBe(true);
  });

  it("should allow pre archive files", () => {
    expect(isBaselinePath(".changeset/pre/archived.md")).toBe(true);
  });

  it("should reject paths outside the version patch scope", () => {
    expect(isBaselinePath("packages/utils/CHANGELOG.md")).toBe(false);
    expect(isBaselinePath("packages/utils/src/index.ts")).toBe(false);
    expect(isBaselinePath("pnpm-lock.yaml")).toBe(false);
    expect(isBaselinePath(".changeset/pre.json")).toBe(false);
    expect(isBaselinePath(".changeset/add-feature.md")).toBe(false);
    expect(isBaselinePath("docs/agents/architecture.md")).toBe(false);
  });
});

describe("patchPackageVersion", () => {
  it("should only replace version and keep key order and other fields", () => {
    const result = patchPackageVersion(PACKAGE_CONTENT, "1.1.1");

    expect(result.status).toBe("patched");
    if (result.status !== "patched") {
      return;
    }

    const parsed = JSON.parse(result.content);

    expect(Object.keys(parsed)).toEqual(["name", "version", "scripts", "devDependencies"]);
    expect(parsed.version).toBe("1.1.1");
    expect(parsed.scripts).toEqual({ build: "tsdown" });
    expect(parsed.devDependencies).toEqual({ "@pawover/kit-internal": "workspace:*" });
    expect(result.name).toBe("@pawover/kit-utils");
    expect(result.version).toBe("1.1.1");
  });

  it("should serialize with two-space indentation and a trailing newline", () => {
    const compact = JSON.stringify({ name: "x", version: "1.0.0-alpha.0" });
    const result = patchPackageVersion(compact, "1.0.0");

    expect(result.status).toBe("patched");
    if (result.status !== "patched") {
      return;
    }

    expect(result.content).toBe(`${JSON.stringify({ name: "x", version: "1.0.0" }, null, 2)}\n`);
  });

  it("should report unchanged when versions match", () => {
    expect(patchPackageVersion(PACKAGE_CONTENT, "1.1.1-alpha.0")).toEqual({ status: "unchanged" });
  });

  it("should skip when the main version is not a non-empty string", () => {
    expect(patchPackageVersion(PACKAGE_CONTENT, undefined).status).toBe("skipped");
    expect(patchPackageVersion(PACKAGE_CONTENT, 1).status).toBe("skipped");
    expect(patchPackageVersion(PACKAGE_CONTENT, "").status).toBe("skipped");
  });

  it("should skip when the main version is not a valid version", () => {
    for (const invalid of ["abc", " ", "1.0", "v1.0.0", "1.0.0abc"]) {
      expect(patchPackageVersion(PACKAGE_CONTENT, invalid).status).toBe("skipped");
    }
  });

  it("should skip when the feature version base is ahead of main", () => {
    expect(patchPackageVersion(PACKAGE_CONTENT, "1.0.0").status).toBe("skipped");
    expect(patchPackageVersion(PACKAGE_CONTENT, "1.1.0").status).toBe("skipped");
  });

  it("should patch when the feature version base is at or below main", () => {
    expect(patchPackageVersion(PACKAGE_CONTENT, "1.1.1").status).toBe("patched");
    expect(patchPackageVersion(PACKAGE_CONTENT, "2.0.0").status).toBe("patched");
  });
});
