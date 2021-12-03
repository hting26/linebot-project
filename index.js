import 'dotenv/config'
import linebot from 'linebot'
import axios from 'axios'

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})
const results = []
bot.on('message', async (event) => {
  if (event.message.type === 'text') {
    try {
      const { data } = await axios.get('https://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL')
      for (const info of data) {
        if (info.animal_kind === event.message.text) {
          results.push(
            info.shelter_name
          )
          if (results.length >= 5) {
            break
          }
        }
      }
      if (results.length > 0) {
        event.reply(results)
      } else {
        event.replay('找不到')
      }
    } catch (error) {
      console.log(error)
      event.reply('錯誤')
    }
  }
})
