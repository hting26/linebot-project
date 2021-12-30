import axios from 'axios'
import schedule from 'node-schedule'
export let animalData = []

// 更新資料的 function
const getanimalData = () => {
  axios.get('https://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL')
    .then(response => {
      animalData = response.data
      console.log('animal資料成功更新')
    })
}

// 機器人啟動時先更新資料
getanimalData()

// 設定排程每天 1:00 更新
schedule.scheduleJob('0 1 * * *', getanimalData)
