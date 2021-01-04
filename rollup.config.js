import clear from 'rollup-plugin-clear'; // 转换cjs
import commonjs from 'rollup-plugin-commonjs'; // 转换cjs
import { terser } from 'rollup-plugin-terser'; // 压缩，可以判断模式，开发模式不加入到plugins
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript';

export default {
  input: 'src/index.ts', // 源文件入口
  output: [
    {
      file: 'dist/browser-version-tool.esm.js', // package.json 中 "module"
      format: 'esm', // es module 形式的包， 用来import 导入， 可以tree shaking
      sourcemap: false
    }, {
      file: 'dist/browser-version-tool.cjs.js', // package.json 中 "main"
      format: 'cjs', // commonjs 形式的包， require 导入
      sourcemap: false
    }, {
      file: 'dist/browser-version-tool.umd.js',
      name: 'GLWidget',
      format: 'umd', // umd 兼容形式的包， 可以直接应用于网页 script
      sourcemap: false,
    }
  ],
  plugins: [
    clear({
      targets: ['dist']
    }),
    resolve(),
    babel({
      exclude: 'node_modules/**'
    }),
    typescript(),
    commonjs(),
    terser(),
  ]
}