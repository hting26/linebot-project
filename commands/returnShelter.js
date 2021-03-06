import { shelterData } from '../data/shelterData.js'
import flextemplate from '../template/flexTemplate.js'
import { distance } from '../distance.js'

export default (event) => {
  const myLatitude = event.message.latitude
  const myLongitude = event.message.longitude

  const minDistanceData = []

  const shelterFlex = JSON.parse(JSON.stringify(flextemplate))

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
                      size: 'md',
                      wrap: true,
                      text: shelterData[minDistanceData[i].index].ShelterName,
                      color: '#5c5c5c',
                      weight: 'bold',
                      align: 'start'
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
                          margin: 'md',
                          color: '#5c5c5c',
                          text: `????????? ${shelterData[minDistanceData[i].index].Address}`
                        },
                        {
                          type: 'text',
                          contents: [],
                          size: 'sm',
                          wrap: true,
                          margin: 'md',
                          color: '#5c5c5c',
                          text: `??????????????? ${shelterData[minDistanceData[i].index].OpenTime}`
                        },
                        {
                          type: 'text',
                          contents: [],
                          size: 'xs',
                          wrap: true,
                          margin: 'md',
                          color: '#5c5c5c',
                          text: `??????: ???${Math.round((minDistanceData[i].distance + Number.EPSILON) * 100) / 100}??????`
                        },
                        {
                          type: 'button',
                          action: {
                            type: 'message',
                            label: '??????',
                            text: `???${shelterData[minDistanceData[i].index].ShelterName}`
                          },
                          margin: 'md',
                          style: 'primary',
                          color: '#b5927f'
                        }
                      ]
                    }
                  ],
                  paddingAll: 'none',
                  margin: 'sm'
                }
              ]
            }
          ],
          paddingAll: '15px'
        }
      })
    }
    console.log(minDistanceData)

    event.reply(['????????????????????????', shelterFlex])
  }
}
