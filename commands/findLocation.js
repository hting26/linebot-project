export default {
  type: 'text',
  text: '請點選傳送位置，系統會回覆五間最近的收容所',
  quickReply: {
    items: [
      {
        type: 'action',
        action: {
          type: 'location',
          label: '傳送位置'
        }
      }
      // ,
      // {
      //   type: 'action',
      //   action: {
      //     type: 'message',
      //     label: 'A.台北',
      //     text: '台北'
      //   }
      // },
      // {
      //   type: 'action',
      //   action: {
      //     type: 'message',
      //     label: 'B.台中',
      //     text: '台中'
      //   }
      // }
    ]
  }
}
