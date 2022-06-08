import { createRenderer } from './renderer/index'

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

renderer.save()

renderer.rect({
  x: 100,
  y: 10,
  width: 50,
  height: 50
})

renderer.restore()

renderer.rect({
  x: 10,
  y: 100,
  width: 50,
  height: 50
})

renderer.save()

document.body.appendChild(renderer.svgDom())
