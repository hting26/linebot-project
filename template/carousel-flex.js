export default {
  type: 'carousel',
  contents: [
    {
      type: 'bubble',
      hero: {
        type: 'image',
        size: 'full',
        aspectRatio: '20:13',
        aspectMode: 'cover',
        url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_5_carousel.png'
      },
      body: {
        type: 'box',
        layout: 'vertical',
        spacing: 'sm',
        contents: [
          {
            type: 'text',
            text: 'shelter_name',
            wrap: true,
            weight: 'bold',
            size: 'xl'
          },
          {
            type: 'box',
            layout: 'baseline',
            contents: [
              {
                type: 'text',
                text: 'animal_colour',
                wrap: true,
                weight: 'bold',
                size: 'lg',
                flex: 0
              },
              {
                type: 'text',
                text: 'animal_sex',
                wrap: true,
                weight: 'bold',
                size: 'lg',
                margin: 'xl'
              }
            ]
          },
          {
            type: 'text',
            text: 'animal_subid'
          },
          {
            type: 'text',
            text: 'animal_remark'
          }
        ]
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        spacing: 'sm',
        contents: [
          {
            type: 'button',
            style: 'primary',
            action: {
              type: 'uri',
              label: 'Call shelter_tel',
              uri: 'https://linecorp.com'
            }
          },
          {
            type: 'button',
            action: {
              type: 'uri',
              label: 'To website',
              uri: 'https://linecorp.com'
            },
            style: 'secondary'
          }
        ]
      }
    }
  ]
}
