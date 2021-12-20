export default {
  type: 'text',
  text: '你想找的性別?',
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
