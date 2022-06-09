import { createRenderer } from './renderer/index'
import { createLinear } from './scale/index'

// 创建渲染器
const renderer = createRenderer(600, 400)

// 绘制基本图形
renderer.rect({
  x: 10,
  y: 10,
  width: 50,
  height: 50,
  fill: 'red'
})

document.body.appendChild(renderer.svgDom())

const tem = createLinear({ domain: [0, 10], range: [50, 100] })

console.log('🚀 ~ file: index.js ~ line 40 ~ tem', tem.ticks(6))
