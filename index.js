import 'dotenv/config'
import linebot from 'linebot'
import axios from 'axios'
import findSex from './commands/findSex.js'
import findBodytype from './commands/findBodytype.js'
import './data/shelterData.js'
import findLocation from './commands/findLocation.js'
import flex from './commands/flex.js'
import returnShelter from './returnShelter.js'

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})

const eventData = [{ userId: '', animalKind: '', animalSex: '', bodytype: '', shelter: '' }]
const animalKind = []
const animalSex = []
const bodytype = []
bot.on('message', async (event) => {
  console.log(event)
  for (let i = 0; i < eventData.length; i++) {
    if (event.message.text === '開始') {
      if (event.source.userId !== eventData.userId) {
        eventData.push({ userId: event.source.userId })
        console.log(eventData)
      } else if (event.source.userId === eventData.userId) {
        if ((event.message.text === '貓') || (event.message.text === '狗')) {
          eventData[i].animalKind = event.message.text
        }
      }
      event.reply(findLocation)
    }
  }
  if (event.message.type === 'location') {
    returnShelter(event)
    event.reply('hello')
  }
  if (event.message.type === 'text') {
    if ((event.message.text === '貓') || (event.message.text === '狗')) {
      event.reply(findSex)
      animalKind.splice(0, 1, event.message.text)
      console.log(animalKind[0])
    }
    if ((event.message.text === '都可以') || (event.message.text === 'M') || (event.message.text === 'F')) {
      event.reply(findBodytype)
      animalSex.splice(0, 1, event.message.text)
      console.log(animalSex[0])
    }
    if ((event.message.text === '都可以') || (event.message.text === 'BIG') || (event.message.text === 'MEDIUM') || (event.message.text === 'SMALL')) {
      bodytype.splice(0, 1, event.message.text)
      console.log(bodytype[0])
    }
    try {
      const results = []
      const { data } = await axios.get('https://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL')
      for (const info of data) {
        if ((animalKind[0] === info.animal_kind) && (animalSex[0] === info.animal_sex) && (bodytype[0] === info.animal_bodytype)) {
          results.push(info.animal_subid)
          if (results.length >= 5) {
            break
          }
        }
      } if (results.length > 0) {
        // event.reply(results)
        // console.log(results)
        flex(event)
        console.log(flex(event))
      }
    } catch (error) {
      console.log(error)
      event.reply('錯誤')
    }
    // const animalSex = event.message.text
    // console.log(animalSex)
    // event.reply(findBodytype)
    // const bodytype = event.message.text
    // console.log(bodytype)
  }
}
)
