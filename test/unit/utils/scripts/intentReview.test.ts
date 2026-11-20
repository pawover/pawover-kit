import { describe, expect, it } from "vitest";
import { annotate, filterWhitelisted, RELEASE_METADATA_PATHS } from "../../../../scripts/intentReview.ts";
import type { ReviewItem, ReviewReport } from "../../../../scripts/intentReview.ts";

const BASE = "a".repeat(40);
const HEAD = "b".repeat(40);
const FINGERPRINT = "c".repeat(64);
const HASH = "d".repeat(64);

function createItem (path: string, changedFiles: string[] = [path]): ReviewItem {
  return {
    id: `source:${path}`,
    kind: "source",
    path,
    fingerprint: FINGERPRINT,
    snapshot: Object.fromEntries(changedFiles.map((file) => [file, HASH])),
    changedFiles,
    problems: [],
  };
}

function createReport (items: ReviewItem[]): ReviewReport {
  return {
    schemaVersion: 1,
    root: "/repo",
    head: HEAD,
    base: BASE,
    items,
  };
}

describe("filterWhitelisted", () => {
  it("should keep every version metadata path", () => {
    const report = createReport([
      createItem("package.json"),
      createItem("packages/utils/package.json"),
      createItem("packages/utils/CHANGELOG.md"),
      createItem(".changeset/pre.json"),
      createItem(".changeset/pre/archived.md"),
      createItem(".changeset/consumed.md"),
    ]);

    const { whitelisted, outside } = filterWhitelisted(report, RELEASE_METADATA_PATHS);

    expect(outside).toEqual([]);
    expect(whitelisted.map((item) => item.path)).toEqual([
      "package.json",
      "packages/utils/package.json",
      "packages/utils/CHANGELOG.md",
      ".changeset/pre.json",
      ".changeset/pre/archived.md",
      ".changeset/consumed.md",
    ]);
  });

  it("should reject source changes outside the release metadata", () => {
    const report = createReport([
      createItem("package.json"),
      createItem("packages/utils/src/index.ts"),
      createItem("docs/agents/intent-baseline-flow.md"),
    ]);

    const { whitelisted, outside } = filterWhitelisted(report, RELEASE_METADATA_PATHS);

    expect(whitelisted.map((item) => item.path)).toEqual(["package.json"]);
    expect(outside.map((item) => item.path)).toEqual([
      "packages/utils/src/index.ts",
      "docs/agents/intent-baseline-flow.md",
    ]);
  });

  it("should reject a lockfile change", () => {
    const report = createReport([createItem("pnpm-lock.yaml")]);

    const { whitelisted, outside } = filterWhitelisted(report, RELEASE_METADATA_PATHS);

    expect(whitelisted).toEqual([]);
    expect(outside.map((item) => item.path)).toEqual(["pnpm-lock.yaml"]);
  });

  it("should reject an item whose changed files mix whitelisted and other paths", () => {
    const report = createReport([createItem("skills/kit/SKILL.md", ["skills/kit/SKILL.md", "package.json"])]);

    const { outside } = filterWhitelisted(report, RELEASE_METADATA_PATHS);

    expect(outside.map((item) => item.id)).toEqual(["source:skills/kit/SKILL.md"]);
  });

  it("should reject an item without changed files", () => {
    const report = createReport([createItem("package.json", [])]);

    const { outside } = filterWhitelisted(report, RELEASE_METADATA_PATHS);

    expect(outside.map((item) => item.id)).toEqual(["source:package.json"]);
  });

  it("should keep skill and planning items whose only changed file is the root manifest", () => {
    const report = createReport([
      { ...createItem("skills/kit/SKILL.md", ["package.json"]), id: "skill:skills/kit/SKILL.md", kind: "skill" },
      { ...createItem("_artifacts", ["package.json"]), id: "planning:_artifacts", kind: "planning" },
    ]);

    const { whitelisted, outside } = filterWhitelisted(report, RELEASE_METADATA_PATHS);

    expect(outside).toEqual([]);
    expect(whitelisted.map((item) => item.id)).toEqual(["skill:skills/kit/SKILL.md", "planning:_artifacts"]);
  });
});

describe("annotate", () => {
  it("should mark every item as no-change with the given reason and evidence", () => {
    const report = createReport([
      createItem("package.json"),
      createItem(".changeset/consumed.md"),
    ]);

    const annotated = annotate(report, "版本号 bump", HEAD);

    expect(annotated.items.map((item) => item.outcome)).toEqual(["no-change", "no-change"]);
    expect(annotated.items.map((item) => item.reason)).toEqual(["版本号 bump", "版本号 bump"]);
    expect(annotated.items[0]?.evidence).toHaveLength(1);
    expect(annotated.items[0]?.evidence[0]).toContain("package.json");
    expect(annotated.items[0]?.evidence[0]).toContain(HEAD);
  });

  it("should keep the report revision fields", () => {
    const annotated = annotate(createReport([createItem("package.json")]), "版本号 bump", HEAD);

    expect(annotated.schemaVersion).toBe(1);
    expect(annotated.root).toBe("/repo");
    expect(annotated.base).toBe(BASE);
    expect(annotated.head).toBe(HEAD);
  });

  it("should not mutate the input report", () => {
    const report = createReport([createItem("package.json")]);

    annotate(report, "版本号 bump", HEAD);

    expect(report.items[0]).not.toHaveProperty("outcome");
  });
});
