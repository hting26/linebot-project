import { shelterData } from './data/shelterData.js'
import template from './template/flexTemplate.js'
import { distance } from './distance.js'

export default (event) => {
  const myLatitude = event.message.latitude
  const myLongitude = event.message.longitude

  const minDistanceData = []

  const shelterFlex = JSON.parse(JSON.stringify(template))

  for (let i = 0; i < shelterData.length; i++) {
    const Lon = shelterData[i].Lon
    const Lat = shelterData[i].Lat

    if (i < 5) {
      minDistanceData.push({
        Name: shelterData[i].ShelterName,
        index: i,
        distance: distance(myLatitude, myLongitude, Lat, Lon, 'K')
      })
      minDistanceData.sort((a, b) => a.distance - b.distance)
    } else {
      if (distance(myLatitude, myLongitude, Lat, Lon, 'K') < minDistanceData[4].distance) {
        minDistanceData.pop()
        minDistanceData.push({
          Name: shelterData[i].ShelterName,
          index: i,
          distance: distance(myLatitude, myLongitude, Lat, Lon, 'K')
        })
        minDistanceData.sort((a, b) => a.distance - b.distance)
      }
    }
  }

  if (minDistanceData.length !== 0) {
    for (let i = 0; i < minDistanceData.length; i++) {
      shelterFlex.contents.contents.push({
        type: 'bubble',
        size: 'kilo',
        header: {
          type: 'box',
          layout: 'vertical',
          contents: [],
          paddingAll: '0px'
        },
        body: {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'text',
                      contents: [],
                      size: 'sm',
                      wrap: true,
                      text: shelterData[minDistanceData[i].index].ShelterName,
                      color: '#ffffff',
                      weight: 'bold'
                    }
                  ],
                  spacing: 'sm'
                },
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'box',
                      layout: 'vertical',
                      contents: [
                        {
                          type: 'text',
                          contents: [],
                          size: 'sm',
                          wrap: true,
                          margin: 'sm',
                          color: '#ffffffde',
                          text: `地址： ${shelterData[minDistanceData[i].index].Address}`
                        },
                        {
                          type: 'text',
                          contents: [],
                          size: 'sm',
                          wrap: true,
                          margin: 'sm',
                          color: '#ffffffde',
                          text: `開放時間： ${shelterData[minDistanceData[i].index].OpenTime}`
                        },
                        {
                          type: 'text',
                          contents: [],
                          size: 'sm',
                          wrap: true,
                          margin: 'sm',
                          color: '#ffffffde',
                          text: `距離: 約${Math.round((minDistanceData[i].distance + Number.EPSILON) * 100) / 100}公里`
                        }
                      ]
                    }
                  ],
                  paddingAll: '13px',
                  margin: 'md',
                  backgroundColor: '#ffffff1A'
                }
              ]
            }
          ],
          paddingAll: '15px',
          backgroundColor: '#7d6352',
          action: {
            type: 'postback',
            label: 'action',
            data: 'hello'
          }
        }
      })
    }
    console.log(minDistanceData)

    event.reply([shelterFlex, '請點選您想去的收容所'])
  } else {
    event.reply('附近沒有收容所')
  }
}
