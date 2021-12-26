import axios from 'axios'
import schedule from 'node-schedule'
export let shelterData = []

// 更新資料的 function
const getshelterData = () => {
  axios.get('https://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=2thVboChxuKs')
    .then(response => {
      shelterData = response.data
      console.log('shelter資料成功更新')
    })
}

// 機器人啟動時先更新資料
getshelterData()

// 設定排程每月20號 0:30 更新
schedule.scheduleJob('30 0 20 * *', getshelterData)
