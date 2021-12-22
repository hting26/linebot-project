import { shelterData } from './data/shelterData.js'
import template from '../template/flexTemplate.js'
import { distance } from './distance.js'

export default (event) => {
  const myLatitude = event.message.latitude
  const myLongitude = event.message.longitude

  let minDistanceData = []

  const shelterFlex = JSON.parse(JSON.stringify(template))

  for (let i = 0; i < shelterData.length; i++) {
    const Lon = shelterData[i].Lon
    const Lat = shelterData[i].Lat

    // 資料的Name  => 我的是ShelterName
    if (i < 5) {
      minDistanceData.push({
        Name: shelterData[i].Name,
        index: i,
        distance: distance(myLatitude, myLongitude, Lat, Lon, 'K')
      })
      minDistanceData.sort((a, b) => a.distance - b.distance)
    } else {
      if (distance(myLatitude, myLongitude, Lat, Lon, 'K') < minDistanceData[4].distance) {
        minDistanceData.pop()
        minDistanceData.push({
          Name: shelterData[i].Name,
          index: i,
          distance: distance(myLatitude, myLongitude, Lat, Lon, 'K')
        })
        minDistanceData.sort((a, b) => a.distance - b.distance)
      }
    }
  }

  // 去除過遠球場
  minDistanceData = minDistanceData.filter((item) => item.distance < 15)

  if (minDistanceData.length !== 0) {
    for (let i = 0; i < minDistanceData.length; i++) {
      shelterFlex.contents.contents.push({
        type: 'bubble',
        size: 'micro',
        hero: {
          type: 'image',
          url: new URL(shelterData[minDistanceData[i].index].Photo1.split('/').pop(), process.env.SERVICE_URL).toString(),
          size: 'full',
          aspectMode: 'cover',
          aspectRatio: '320:213'
        },
        body: {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'text',
              text: shelterData[minDistanceData[i].index].Name,
              weight: 'bold',
              size: 'sm',
              align: 'center',
              wrap: true
            },
            {
              type: 'text',
              text: `距離: 約${Math.round((minDistanceData[i].distance + Number.EPSILON) * 100) / 100}公里`,
              size: '12px',
              align: 'center',
              weight: 'bold'
            },
            {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'box',
                  layout: 'baseline',
                  spacing: 'sm',
                  contents: [
                    {
                      type: 'text',
                      wrap: true,
                      color: '#8c8c8c',
                      size: 'xs',
                      flex: 5,
                      text: '📍' + shelterData[minDistanceData[i].index].Address
                    }
                  ]
                }
              ]
            }
          ],
          spacing: 'sm',
          paddingAll: '13px'
        },
        action: {
          type: 'message',
          label: 'action',
          text: `go ${shelterData[minDistanceData[i].index].Name}`
        }
      })
    }
    console.log(minDistanceData)

    event.reply([shelterFlex, '請點選您想去的球場'])
  } else {
    event.reply('附近沒有球場')
  }
}
