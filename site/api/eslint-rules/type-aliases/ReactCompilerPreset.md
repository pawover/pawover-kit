[**@pawover/kit-eslint-rules**](../index.md)

***

[@pawover/kit-eslint-rules](../index.md) / ReactCompilerPreset

# Type Alias: ReactCompilerPreset

> **ReactCompilerPreset** = `"recommended"` \| `"latest"`

Defined in: [reactCompiler.ts:16](https://github.com/pawover/pawover-kit/blob/ec2032f35fecda346aa287a28c2f1127f9562f44/packages/eslint-rules/src/reactCompiler.ts#L16)

React Compiler 规则预设

- `"recommended"`：eslint-plugin-react-hooks 官方稳定预设
- `"latest"`：官方实验预设，额外包含 `react-hooks/void-use-memo`

## Example

```ts
const preset: ReactCompilerPreset = "latest";
```
