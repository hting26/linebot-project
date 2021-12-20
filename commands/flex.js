import template from '../template/flextemplate.js'
import index from '..index/'
export default async (event) => {
  const flex = JSON.parse(JSON.stringify(template))
  flex.contents.body.contents.text = index.info.animal_subid
  event.reply(flex)
}
