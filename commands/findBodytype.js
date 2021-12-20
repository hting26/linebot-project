export default {
  type: 'text',
  text: '你想找的體型?',
  quickReply: {
    items: [
      {
        type: 'action',
        action: {
          type: 'message',
          label: '都可以❤',
          text: '都可以'
        }
      },
      {
        type: 'action',
        action: {
          type: 'message',
          label: '大',
          text: 'BIG'
        }
      },
      {
        type: 'action',
        action: {
          type: 'message',
          label: '中',
          text: 'MEDIUM'
        }
      },
      {
        type: 'action',
        action: {
          type: 'message',
          label: '小',
          text: 'SMALL'
        }
      }
    ]
  }
}
