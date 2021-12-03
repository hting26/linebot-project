import template from '../template/flextemplate.js'
export default async (event) => {
  const flex = JSON.parse(JSON.stringify(template))
  flex.contents.hero.url = 'https://asms.coa.gov.tw/amlapp/upload/pic/ab769d5e-7611-43e9-95c8-4c6377ca6223_org.jpg'
  event.reply(flex)
}
