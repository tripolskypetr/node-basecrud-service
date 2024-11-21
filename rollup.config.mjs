import typescript from "@rollup/plugin-typescript";
import path from "path";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: path.join("build", "index.mjs"),
        format: "esm",
      },
      {
        file: path.join("build", "index.cjs"),
        format: "commonjs",
      },
    ],
    plugins: [
      typescript({
        tsconfig: "./tsconfig.json",
        noEmit: true,
      }),
    ],
  },
];
