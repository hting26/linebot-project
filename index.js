import 'dotenv/config'
import linebot from 'linebot'
import axios from 'axios'
// flex深淺層複製 0928  const flex = JSON(parse (strinfy)) 

// https://developers.line.biz/zh-hant/docs/messaging-api/flex-message-elements/#container
// https://developers.line.biz/flex-simulator/
// https://developers.line.biz/console/channel/1656653418/messaging-api
// https://ithelp.ithome.com.tw/articles/10229719  
// line postbackaction
// https://data.gov.tw/dataset/85903

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})

bot.on('message', async (event) => {
  if (event.message.type === 'text') {
    try {
      const { data } = await axios.get('https://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL')
      const replies=[]
      // for(let i =0; i)
      // for (const loc of data.animal_place) {
      //   if (loc === event.message.text){
      //     event.reply()
      //   }
      }
    }
  }
})
