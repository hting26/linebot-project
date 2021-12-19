export default {
  type: 'text',
  text: '請選擇要搜尋的收容所',
  quickReply: {
    items: [
      {
        type: 'action',
        action: {
          type: 'location',
          label: '傳送位置'
        }
      },
      {
        type: 'action',
        imageUrl: 'https://xxx/image1.png',
        action: {
          type: 'message',
          label: 'A.台北',
          text: '台北'
        }
      },
      {
        type: 'action',
        imageUrl: 'https://xxx/image2.png',
        action: {
          type: 'message',
          label: 'B.台中',
          text: '台中'
        }
      }
    ]
  }
}
