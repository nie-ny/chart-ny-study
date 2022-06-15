import { plot } from './plot'

const sports = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 }
]

// const ss = plot({
//   type: 'interval', // 指定节点的种类是 interval
//   data: sports, // 指定数据
//   encodings: {
//     x: 'genre', // 指定 x 通道由数据的 genre 属性决定
//     y: 'sold' // 指定 y 通道由数据的 sold 属性决定
//   }
// })

const ss = plot({
  type: 'interval',
  data: sports,
  // 将数据的 sold 字段转换成百分比形式
  transforms: [
    (data) => {
      const sum = data.reduce((total, d) => total + d.sold, 0)
      return data.map(({ genre, sold }) => ({ genre, sold: sold / sum }))
    }
  ],
  // 使用两个坐标系变换：transpose 和 polar
  coordinates: [{ type: 'transpose' }, { type: 'polar' }],
  // 使用一个统计变换 stackY
  statistics: [{ type: 'stackY' }],
  // 设置 x 通道使用的比例尺的 padding 属性
  // interval 的 x 通道必须使用 band 比例尺，所以有 padding 属性
  scales: {
    x: { padding: 0 }
  },
  guides: {
    x: { display: false }, // 不显示 x 方向的坐标轴
    y: { display: false } // 不显示 y 方向的坐标轴
  },
  encodings: {
    y: 'sold', // y 通道和 sold 属性绑定
    fill: 'genre' // fill 通道和 genre 属性绑定
  },
  // 设置饼图的样式
  styles: {
    stroke: '#000',
    strokeWidth: 2
  }
})

document.body.appendChild(ss)
