import { plot } from './plot'

const sports = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 }
]

const ss = plot({
  type: 'interval', // 指定节点的种类是 interval
  data: sports, // 指定数据
  encodings: {
    x: 'genre', // 指定 x 通道由数据的 genre 属性决定
    y: 'sold' // 指定 y 通道由数据的 sold 属性决定
  }
})

document.body.appendChild(ss)
