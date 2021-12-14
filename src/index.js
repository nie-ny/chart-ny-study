import { createRenderer } from './renderer'

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

// 坐标变换
renderer.save()
renderer.scale(2, 2)
renderer.rect({
  x: 10,
  y: 10,
  width: 50,
  height: 50
})
renderer.restore()
