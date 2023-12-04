import path from 'path'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import rollupTypescript from 'rollup-plugin-typescript2'
import terser from '@rollup/plugin-terser';
import babel from '@rollup/plugin-babel'
import { dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 读取 package.json 配置
import pkg from './package.json' assert { type: "json" };
// 当前运行环境，可通过 cross-env 命令行设置
const env = process.env.NODE_ENV
// umd 模式的编译结果文件输出的全局变量名称
const name = 'RollupTsTemplate'
const config = {
  // 入口文件，src/index.ts
  input: path.resolve(__dirname, 'src/index.ts'),
  // 输出文件
  output: [
    // commonjs
    {
      // package.json 配置的 main 属性
      file: pkg.main,
      format: 'cjs',
    },
    // es module
    {
      // package.json 配置的 module 属性
      file: pkg.module,
      format: 'es',
    },
    // umd
    {
      // umd 导出文件的全局变量
      name,
      // package.json 配置的 umd 属性
      file: pkg.umd,
      format: 'umd'
    }
  ],
  plugins: [
    // 解析第三方依赖
    resolve(),
    // 识别 commonjs 模式第三方依赖
    commonjs(),
    // rollup 编译 typescript
    rollupTypescript(),
    babel({
      babelHelpers: 'bundled',
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.es6', '.es', '.mjs', '.vue'],
      exclude: ["node_modules/**"],
    })
  ]
}

// 若打包正式环境，压缩代码
if (env === 'production') {
  config.plugins.push(terser())
}
export default config
