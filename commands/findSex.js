export default {
  type: 'text',
  text: '你想找的動物性別?',
  quickReply: {
    items: [
      {
        type: 'action',
        action: {
          type: 'message',
          label: '不限🐕',
          text: '不限'
        }
      },
      {
        type: 'action',
        action: {
          type: 'message',
          label: '公',
          text: 'M'
        }
      },
      {
        type: 'action',
        action: {
          type: 'message',
          label: '母',
          text: 'F'
        }
      }
    ]
  }
}
