import { axisX } from './guide'
import { createBand } from './scale'
import { cartesian, createCoordinate } from './coordinate'
import { createRenderer } from './renderer'

const coordinate = createCoordinate({
  x: 0 + 45,
  y: 0 + 65,
  width: 640 - 45 - 45,
  height: 480 - 65 - 45,
  transforms: [cartesian()]
})

const { width = 640, height = 480, renderer: plugin } = {}
const renderer = createRenderer(width, height, plugin)

axisX(
  renderer,
  createBand({
    padding: 0.1,
    domain: ['Sports', 'Strategy', 'Action', 'Shooter', 'Other'],
    range: [0, 1],
    label: 'genre'
  }),
  coordinate,
  {
    domain: ['Sports', 'Strategy', 'Action', 'Shooter', 'Other'],
    label: 'genre'
  }
)

document.body.appendChild(renderer.svgDom())
