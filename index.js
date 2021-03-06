import 'dotenv/config'
import linebot from 'linebot'
import axios from 'axios'
import findSex from './commands/findSex.js'
import findBodytype from './commands/findBodytype.js'
import findLocation from './commands/findLocation.js'
import returnShelter from './commands/returnShelter.js'
import template from './template/flex.js'
// import fs from 'fs'

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

const eventData = {}

bot.on('message', async (event) => {
  // console.log(event)
  // 1.使用者傳送搜尋物種
  if ((event.message.text === '貓') || (event.message.text === '狗')) {
    // 請使用者傳送位置
    event.reply(findLocation)
    eventData[event.source.userId] = { animalKind: event.message.text, shelter: '', animalSex: '', bodytype: '' }
  }
  // 回傳五間Shelter
  if (event.message.type === 'location') {
    returnShelter(event)
  }

  // 2.使用者選擇Shelter後，請使用者選性別
  if (event.message.type === 'text') {
    if (event.message.text.startsWith('找')) {
      event.reply(findSex)
      eventData[event.source.userId].shelter = event.message.text.replace('找', '')
    }
  }

  // 3.使用者選擇性別後，請使用者選體型
  if ((event.message.text === '不限') || (event.message.text === 'M') || (event.message.text === 'F')) {
    event.reply(findBodytype)
    eventData[event.source.userId].animalSex = event.message.text
  }
  // 紀錄體型
  if ((event.message.text === '都可以') || (event.message.text === 'BIG') || (event.message.text === 'MEDIUM') || (event.message.text === 'SMALL')) {
    eventData[event.source.userId].bodytype = event.message.text
    console.log(eventData)
  }
  try {
    const flexTemplate = JSON.parse(JSON.stringify(template))
    const results = []
    const { data } = await axios.get('https://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL')
    for (const info of data) {
      if (eventData[event.source.userId].animalSex === '不限') {
        if ((eventData[event.source.userId]?.animalKind === info.animal_kind) && (eventData[event.source.userId]?.bodytype === info.animal_bodytype) && (eventData[event.source.userId]?.shelter === info.shelter_name)) {
          results.push(info.animal_subid)
          flexTemplate.contents.contents.push({
            type: 'bubble',
            size: 'kilo',
            hero: {
              type: 'image',
              url: info.album_file || 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1286&q=80',
              size: 'full',
              aspectMode: 'cover',
              aspectRatio: '20:17'
            },
            body: {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'text',
                  text: `收容編號 ${info.animal_subid}` || '-',
                  size: 'sm',
                  wrap: true
                },
                {
                  type: 'box',
                  layout: 'vertical',
                  margin: 'lg',
                  spacing: 'sm',
                  contents: [
                    {
                      type: 'box',
                      layout: 'baseline',
                      spacing: 'sm',
                      contents: [
                        {
                          type: 'text',
                          text: '性別',
                          color: '#aaaaaa',
                          size: 'sm',
                          flex: 1
                        },
                        {
                          type: 'text',
                          text: info.animal_sex === 'M' ? '公' : '母',
                          wrap: true,
                          color: '#666666',
                          size: 'sm',
                          flex: 5
                        }
                      ]
                    },
                    {
                      type: 'box',
                      layout: 'baseline',
                      spacing: 'sm',
                      contents: [
                        {
                          type: 'text',
                          text: '體型',
                          color: '#aaaaaa',
                          size: 'sm',
                          flex: 1
                        },
                        {
                          type: 'text',
                          text: info.animal_bodytype === 'BIG' ? '大' : info.animal_bodytype === 'MEDIUM' ? '中' : '小',
                          wrap: true,
                          color: '#666666',
                          size: 'sm',
                          flex: 5
                        }
                      ]
                    },
                    {
                      type: 'box',
                      layout: 'baseline',
                      spacing: 'sm',
                      contents: [
                        {
                          type: 'text',
                          text: '毛色',
                          color: '#aaaaaa',
                          size: 'sm',
                          flex: 1
                        },
                        {
                          type: 'text',
                          text: info.animal_colour || '-',
                          wrap: true,
                          color: '#666666',
                          size: 'sm',
                          flex: 5
                        }
                      ]
                    },
                    {
                      type: 'box',
                      layout: 'baseline',
                      spacing: 'sm',
                      contents: [
                        {
                          type: 'text',
                          text: '狀態描述',
                          color: '#aaaaaa',
                          size: 'sm',
                          flex: 2
                        },
                        {
                          type: 'text',
                          text: info.animal_remark || '-',
                          wrap: true,
                          color: '#666666',
                          size: 'sm',
                          flex: 5
                        }
                      ]
                    },
                    {
                      type: 'box',
                      layout: 'baseline',
                      spacing: 'sm',
                      contents: [
                        {
                          type: 'text',
                          text: '開放認養時間',
                          color: '#aaaaaa',
                          size: 'sm',
                          flex: 4
                        },
                        {
                          type: 'text',
                          text: info.animal_opendate || '-',
                          wrap: true,
                          color: '#666666',
                          size: 'sm',
                          flex: 5
                        }
                      ]
                    }
                  ]
                }
              ],
              paddingBottom: '6px'
            },
            footer: {
              type: 'box',
              layout: 'vertical',
              spacing: 'none',
              contents: [
                {
                  type: 'button',
                  style: 'primary',
                  action: {
                    type: 'uri',
                    label: '前往網站',
                    uri: encodeURI(`https://asms.coa.gov.tw/amlapp/App/AnnounceList.aspx?Id=${info.animal_id}&AcceptNum=${info.animal_subid}&PageType=Adopt`) || 'https://asms.coa.gov.tw/Amlapp/App/AnnounceMent.aspx?PageType=Adopt'
                  },
                  height: 'sm',
                  color: '#b5927f'
                }
              ],
              flex: 0
            },
            styles: {
              footer: {
                separator: false
              }
            }
          })
          if (results.length >= 12) {
            break
          }
        }
      } else if ((eventData[event.source.userId]?.animalKind === info.animal_kind) && (eventData[event.source.userId]?.animalSex === info.animal_sex) && (eventData[event.source.userId]?.bodytype === info.animal_bodytype) && (eventData[event.source.userId]?.shelter === info.shelter_name)) {
        results.push(info.animal_subid)
        flexTemplate.contents.contents.push({
          type: 'bubble',
          size: 'kilo',
          hero: {
            type: 'image',
            url: info.album_file || 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1286&q=80',
            size: 'full',
            aspectMode: 'cover',
            aspectRatio: '20:17'
          },
          body: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: `收容編號 ${info.animal_subid}` || '-',
                size: 'sm',
                wrap: true
              },
              {
                type: 'box',
                layout: 'vertical',
                margin: 'lg',
                spacing: 'sm',
                contents: [
                  {
                    type: 'box',
                    layout: 'baseline',
                    spacing: 'sm',
                    contents: [
                      {
                        type: 'text',
                        text: '性別',
                        color: '#aaaaaa',
                        size: 'sm',
                        flex: 1
                      },
                      {
                        type: 'text',
                        text: info.animal_sex || '-',
                        wrap: true,
                        color: '#666666',
                        size: 'sm',
                        flex: 5
                      }
                    ]
                  },
                  {
                    type: 'box',
                    layout: 'baseline',
                    spacing: 'sm',
                    contents: [
                      {
                        type: 'text',
                        text: '體型',
                        color: '#aaaaaa',
                        size: 'sm',
                        flex: 1
                      },
                      {
                        type: 'text',
                        text: info.animal_bodytype || '-',
                        wrap: true,
                        color: '#666666',
                        size: 'sm',
                        flex: 5
                      }
                    ]
                  },
                  {
                    type: 'box',
                    layout: 'baseline',
                    spacing: 'sm',
                    contents: [
                      {
                        type: 'text',
                        text: '毛色',
                        color: '#aaaaaa',
                        size: 'sm',
                        flex: 1
                      },
                      {
                        type: 'text',
                        text: info.animal_colour || '-',
                        wrap: true,
                        color: '#666666',
                        size: 'sm',
                        flex: 5
                      }
                    ]
                  },
                  {
                    type: 'box',
                    layout: 'baseline',
                    spacing: 'sm',
                    contents: [
                      {
                        type: 'text',
                        text: '狀態描述',
                        color: '#aaaaaa',
                        size: 'sm',
                        flex: 2
                      },
                      {
                        type: 'text',
                        text: info.animal_remark || '-',
                        wrap: true,
                        color: '#666666',
                        size: 'sm',
                        flex: 5
                      }
                    ]
                  },
                  {
                    type: 'box',
                    layout: 'baseline',
                    spacing: 'sm',
                    contents: [
                      {
                        type: 'text',
                        text: '開放認養時間',
                        color: '#aaaaaa',
                        size: 'sm',
                        flex: 4
                      },
                      {
                        type: 'text',
                        text: info.animal_opendate || '-',
                        wrap: true,
                        color: '#666666',
                        size: 'sm',
                        flex: 5
                      }
                    ]
                  }
                ]
              }
            ],
            paddingBottom: '6px'
          },
          footer: {
            type: 'box',
            layout: 'vertical',
            spacing: 'none',
            contents: [
              {
                type: 'button',
                style: 'primary',
                action: {
                  type: 'uri',
                  label: '前往網站',
                  uri: encodeURI(`https://asms.coa.gov.tw/amlapp/App/AnnounceList.aspx?Id=${info.animal_id}&AcceptNum=${info.animal_subid}&PageType=Adopt`)
                },
                height: 'sm',
                color: '#b5927f'
              }
            ],
            flex: 0
          },
          styles: {
            footer: {
              separator: false
            }
          }
        })
        if (results.length >= 12) {
          break
        }
      }
    }
    if (results.length > 0) {
      event.reply(flexTemplate)
      // fs.writeFileSync('aaa.json', JSON.stringify(flexTemplate, null, 2))
      console.log(results)
      // delete eventData[event.source.userId]
    } else {
      event.reply('此搜尋條件找不到資料，試試其他條件吧！')
    }
  } catch (error) {
    console.log(error)
    event.reply('錯誤')
  }
}
)

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})
