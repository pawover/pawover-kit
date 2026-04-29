import cz from "./cz.config.cjs";

export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [2, "always", cz.types.map((i) => i.value)],
    "scope-enum": [2, "always", cz.scopes.map((i) => i.name)],
  },
};
