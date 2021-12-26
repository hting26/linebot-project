import { animalData } from './data/animalData.js'
import template from './template/flexTemplate.js'

export default (event) => {
  try {
    const results = []
    // const { data } = await axios.get('https://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL')
    for (const info of animalData) {
      if ((animalKind[0] === info.animal_kind) && (animalSex[0] === info.animal_sex) && (bodytype[0] === info.animal_bodytype) && (shelter[0] === info.shelter_name)) {
        results.push(info.animal_subid)
        if (results.length >= 5) {
          break
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
}
