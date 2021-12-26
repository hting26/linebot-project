export default {
  type: 'bubble',
  size: 'kilo',
  hero: {
    type: 'image',
    url: 'https://asms.coa.gov.tw/amlapp/Upload/Pic/48e78994-9787-4aa2-824e-4d1e1c4b8ed7_org.jpg',
    size: 'full',
    aspectMode: 'cover',
    action: {
      type: 'uri',
      uri: 'https://asms.coa.gov.tw/amlapp/Upload/Pic/48e78994-9787-4aa2-824e-4d1e1c4b8ed7_org.jpg'
    },
    aspectRatio: '20:17'
  },
  body: {
    type: 'box',
    layout: 'vertical',
    contents: [
      {
        type: 'text',
        text: '收容編號：animal_subid',
        weight: 'bold',
        size: 'md',
        wrap: true
      },
      {
        type: 'box',
        layout: 'vertical',
        margin: 'lg',
        spacing: 'sm',
        contents: [
          {
            type: 'box',
            layout: 'baseline',
            spacing: 'sm',
            contents: [
              {
                type: 'text',
                text: '性別',
                color: '#aaaaaa',
                size: 'sm',
                flex: 1
              },
              {
                type: 'text',
                text: 'animal_sex',
                wrap: true,
                color: '#666666',
                size: 'sm',
                flex: 5
              }
            ]
          },
          {
            type: 'box',
            layout: 'baseline',
            spacing: 'sm',
            contents: [
              {
                type: 'text',
                text: '體型',
                color: '#aaaaaa',
                size: 'sm',
                flex: 1
              },
              {
                type: 'text',
                text: 'animal_bodytype',
                wrap: true,
                color: '#666666',
                size: 'sm',
                flex: 5
              }
            ]
          },
          {
            type: 'box',
            layout: 'baseline',
            spacing: 'sm',
            contents: [
              {
                type: 'text',
                text: '花色',
                color: '#aaaaaa',
                size: 'sm',
                flex: 1
              },
              {
                type: 'text',
                text: 'animal_colour',
                wrap: true,
                color: '#666666',
                size: 'sm',
                flex: 5
              }
            ]
          },
          {
            type: 'box',
            layout: 'baseline',
            spacing: 'sm',
            contents: [
              {
                type: 'text',
                text: '狀態描述',
                color: '#aaaaaa',
                size: 'sm',
                flex: 2
              },
              {
                type: 'text',
                text: 'animal_remark晶片入所後施打 晶片入所後施打，超級親人會呼嚕',
                wrap: true,
                color: '#666666',
                size: 'sm',
                flex: 5
              }
            ]
          }
        ]
      }
    ],
    paddingBottom: '6px'
  },
  footer: {
    type: 'box',
    layout: 'vertical',
    spacing: 'none',
    contents: [
      {
        type: 'button',
        style: 'primary',
        action: {
          type: 'uri',
          label: 'WEBSITE',
          uri: 'https://linecorp.com'
        },
        height: 'sm',
        color: '#b5927f'
      }
    ],
    flex: 0
  },
  styles: {
    footer: {
      separator: false
    }
  }
}
