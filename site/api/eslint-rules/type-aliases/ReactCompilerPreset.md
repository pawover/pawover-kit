[**@pawover/kit-eslint-rules**](../index.md)

***

[@pawover/kit-eslint-rules](../index.md) / ReactCompilerPreset

# Type Alias: ReactCompilerPreset

> **ReactCompilerPreset** = `"recommended"` \| `"latest"`

Defined in: [reactCompiler.ts:16](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/eslint-rules/src/reactCompiler.ts#L16)

React Compiler 规则预设

- `"recommended"`：eslint-plugin-react-hooks 官方稳定预设
- `"latest"`：官方实验预设，额外包含 `react-hooks/void-use-memo`

## Example

```ts
const preset: ReactCompilerPreset = "latest";
```
