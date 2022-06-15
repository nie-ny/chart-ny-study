import { plot } from './plot'

//
;(async () => {
  // 获得数据
  const response = await fetch('https://gw.alipayobjects.com/os/bmw-prod/d345d2d7-a35d-4d27-af92-4982b3e6b213.json')
  const data = await response.json()

  // 行头
  const keys = ['id', 'name', 'country', 'lifespan', 'points']

  const ss = plot({
    data,
    type: 'layer',
    transforms: [
      (data) => data.filter((_, i) => i < 10),
      // 预处理数据
      (data) =>
        data.map(({ lifespan, points, ...rest }) => ({
          ...rest,
          lifespan: `[${lifespan[0]}, ${lifespan[1]}]`,
          points: `[${points
            .slice(0, 2)
            .map((d) => `${d.slice(0, 2)}...`)
            .join(', ')}]`
        })),
      // 转换成一系列文本
      (data) => {
        const ths = ['index', ...keys].map((key) => ({
          index: -1,
          key,
          value: key,
          header: true
        }))
        const tds = data.flatMap((d, i) => {
          const cell = keys.map((key) => ({ index: i, key, value: d[key] }))
          return [...cell, { index: i, key: 'index', value: i }]
        })
        return [...ths, ...tds].reverse()
      }
    ],
    scales: {
      y: { type: 'band', padding: 0 },
      x: { domain: ['index', ...keys], padding: 0 },
      fontWeight: { type: 'identity' }
    },
    width: 900,
    guides: {
      x: { display: false },
      y: { display: false }
    },
    encodings: {
      y: 'index',
      x: 'key'
    },
    children: [
      {
        // 背景的表格
        type: 'cell',
        encodings: {
          fill: 'none',
          stroke: '#eee'
        }
      },
      {
        // 前面的文字
        type: 'text',
        paddingTop: 10,
        paddingLeft: 10,
        paddingBottom: 10,
        encodings: {
          text: (d) => (d.header ? d.value.toUpperCase() : d.value),
          fontWeight: (d) => (d.header ? 'bold' : 'normal')
        },
        styles: {
          dx: '0.5em',
          dy: '-1em'
        }
      }
    ]
  })

  document.body.appendChild(ss)
})()
