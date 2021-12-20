import axios from 'axios'
import schedule from 'node-schedule'
export let shelterData = []

// 更新資料的 function
const getData = () => {
  axios.get('https://data.coa.gov.tw/Service/OpenData/TransService.aspx')
    .then(response => {
      shelterData = response.shelterData
      console.log('資料成功更新')
    })
}

// 機器人啟動時先更新資料
getData()

// 設定排程每周一 0:00 更新
schedule.scheduleJob('0 0 * * 1', getData)
