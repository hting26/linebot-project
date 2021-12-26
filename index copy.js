import 'dotenv/config'
import linebot from 'linebot'
import axios from 'axios'
import findSex from './commands/findSex.js'
import findBodytype from './commands/findBodytype.js'
import findLocation from './commands/findLocation.js'
// import flex from './commands/flex.js'
import returnShelter from './returnShelter.js'
// import { shelterData } from './data/shelterData.js'

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})

const eventData = []
// const eventData = [{ userId: '', animalKind: '', animalSex: '', bodytype: '', shelter: '' }]
// const animalKind = []
// const animalSex = []
// const bodytype = []

bot.on('message', async (event) => {
  console.log(event)
  // console.log(eventData)
  // if (event.message.text === '開始找貓') {
  //   if (event.source.userId !== eventData.userId) {
  //     eventData.push({ userId: event.source.userId })
  //     console.log(eventData)
  //   } else if (event.source.userId === eventData.userId) {
  //     if ((event.message.text === '貓') || (event.message.text === '狗')) {
  //       eventData[i].animalKind = event.message.text
  //     }
  //   }
  // }
  // if (event.message.type === 'text') {
  if ((event.message.text === '貓') || (event.message.text === '狗')) {
    event.reply(findLocation)
    eventData.push(event.source.userId = { animalKind: event.message.text })
    // eventData.push({ userId: event.source.userId, animalKind: event.message.text })
    // console.log(eventData)
  }
  if (event.message.type === 'location') {
    returnShelter(event)
  }
  if (event.message.type === 'text') {
    if (event.message.text.startsWith('找')) {
      if (event.source.userId === eventData.index) {
        eventData.index = event.source.userId.Shelter = event.message.text.replace('找', '')
      }
      // eventData.push({ userId: event.source.userId, Shelter: event.message.text.replace('找', '') })
      // console.log(eventData)
      event.reply(findSex)
    }
  }
  if ((event.message.text === '都可以') || (event.message.text === 'M') || (event.message.text === 'F')) {
    event.reply(findBodytype)
    eventData.push({ userId: event.source.userId, animalSex: event.message.text })
    // console.log(eventData)
    // animalSex.splice(0, 1, event.message.text)
    // console.log(animalSex[0])
  }
  if ((event.message.text === '都可以') || (event.message.text === 'BIG') || (event.message.text === 'MEDIUM') || (event.message.text === 'SMALL')) {
    eventData.push({ userId: event.source.userId, bodytype: event.message.text })
    console.log(eventData)
    // bodytype.splice(0, 1, event.message.text)
    // console.log(bodytype[0])
  }
  try {
    const results = []
    const { data } = await axios.get('https://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL')
    for (const info of data) {
      for (const user of eventData) {
        // console.log(user.animalKind)
        // if ((animalKind[0] === info.animal_kind) && (animalSex[0] === info.animal_sex) && (bodytype[0] === info.animal_bodytype)) {
        if ((user.animalKind === info.animal_kind) && (user.animalSex === info.animal_sex) && (user.bodytype === info.animal_bodytype)) {
          results.push(info.animal_subid)
          if (results.length >= 5) {
            break
          }
        }
      }
    } if (results.length > 0) {
      event.reply(results)
      console.log(results)
      // flex(event)
      // console.log(flex(event))
    }
  } catch (error) {
    console.log(error)
    event.reply('錯誤')
  }
  // }
}
)