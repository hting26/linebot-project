import 'dotenv/config'
import linebot from 'linebot'
import axios from 'axios'
// import test from './test.js'
import findsex from './findSex.js'
import findBodytype from './findBodytype.js'

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})

bot.on('message', async (event) => {
  const results = []
  const animalKind = []
  const animalSex = []
  const bodytype = []
  if (event.message.type === 'text') {
    if ((event.message.text === '貓') || (event.message.text === '狗')) {
      event.reply(findsex)
      animalKind.push(event.message.text)
      // const animalKind = (event.message.text)
      console.log(animalKind[0])
    }
    if ((event.message.text === '都可以') || (event.message.text === 'M') || (event.message.text === 'F')) {
      event.reply(findBodytype)
      animalSex.push(event.message.text)
      // const animalSex = (event.message.text)
      console.log(animalSex[0])
    }
    if ((event.message.text === '都可以') || (event.message.text === 'BIG') || (event.message.text === 'MEDIUM') || (event.message.text === 'SMALL')) {
      // const bodytype = (event.message.text)
      bodytype.push(event.message.text)
      console.log(bodytype[0])
    }
    try {
      const { data } = await axios.get('https://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL')
      for (const info of data) {
        if ((animalKind[0] === info.animal_kind) && (animalSex[0] === info.animal_sex) && (bodytype[0] === info.animal_bodytype)) {
          results.push(info.animal_subid)
          if (results.length >= 5) {
            break
          }
        }
      } console.log(results)
      if (results.length > 0) {
        event.reply(results)
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
//     try {
//       const { data } = await axios.get('https://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL')
//       for (const info of data) {
//         if (event.message.text === '喵') {
//           const findKind = '貓'
//           event.reply(findsex)
//           console.log(findKind)
//           results.push(
//             info.shelter_name
//           )
//           datatest.push(
//             info.animal_area_pkid
//           )
//           event.reply(test)
//           if (datatest.length >= 15) {
//             break
//           }
//           console.log(datatest)
//           console.log(results)
//           if (results.length >= 5) {
//             break
//           }
//         }
//       }
//       if (results.length > 0) {
//         event.reply(results)
//       } else {
//         event.reply('找不到')
//       }
//     } catch (error) {
//       console.log(error)
//       event.reply('錯誤')
//     }
//   }
// })
