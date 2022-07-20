/* 
  package.json中的脚本配置"dev": "rollup -cw" 
    -c  为默认配置文件
    w   为监视文件变化
*/
import babel from 'rollup-plugin-babel'

// rollup默认可以导出一个对象，作为打包的配置文件
export default {
  input: './src/index.js',  // 入口
  output: {
    file: './dist/vue.js', // 出口
    // 在global上增加Vue属性 global.vue
    name: 'Vue',
    format: 'umd', // 打包格式：esm es6模块  commonJS模块 iife自执行函数 umd统一模块规范（兼容amd、commonJS）
    sourcemap: true // 可以调试源代码
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'  // 排除node_modules所有文件
    })
  ]
}