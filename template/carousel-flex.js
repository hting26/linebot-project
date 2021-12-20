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
    },
    {
      type: 'bubble',
      hero: {
        type: 'image',
        size: 'full',
        aspectRatio: '20:13',
        aspectMode: 'cover',
        url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_6_carousel.png'
      },
      body: {
        type: 'box',
        layout: 'vertical',
        spacing: 'sm',
        contents: [
          {
            type: 'text',
            text: 'Metal Desk Lamp',
            wrap: true,
            weight: 'bold',
            size: 'xl'
          },
          {
            type: 'box',
            layout: 'baseline',
            flex: 1,
            contents: [
              {
                type: 'text',
                text: '$11',
                wrap: true,
                weight: 'bold',
                size: 'xl',
                flex: 0
              },
              {
                type: 'text',
                text: '.99',
                wrap: true,
                weight: 'bold',
                size: 'sm',
                flex: 0
              }
            ]
          },
          {
            type: 'text',
            text: 'Temporarily out of stock',
            wrap: true,
            size: 'xxs',
            margin: 'md',
            color: '#ff5551',
            flex: 0
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
            flex: 2,
            style: 'primary',
            color: '#aaaaaa',
            action: {
              type: 'uri',
              label: 'Add to Cart',
              uri: 'https://linecorp.com'
            }
          },
          {
            type: 'button',
            action: {
              type: 'uri',
              label: 'Add to wish list',
              uri: 'https://linecorp.com'
            }
          }
        ]
      }
    },
    {
      type: 'bubble',
      body: {
        type: 'box',
        layout: 'vertical',
        spacing: 'sm',
        contents: [
          {
            type: 'button',
            flex: 1,
            gravity: 'center',
            action: {
              type: 'uri',
              label: 'See more',
              uri: 'https://linecorp.com'
            }
          }
        ]
      }
    }
  ]
}
