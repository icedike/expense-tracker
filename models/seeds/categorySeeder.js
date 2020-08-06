const { Category } = require('../record')
const db = require('../../config/mongoose')

db.once('open', () => {
  Category.create([
    {
      categoryName: '家居物業',
      icon: '<i class="fas fa-home"></i>'
    },
    {
      categoryName: '交通出行',
      icon: '<i class="fas fa-shuttle-van"></i>'
    },
    {
      categoryName: '休閒娛樂',
      icon: '<i class="fas fa-grin-beam"></i>'
    },
    {
      categoryName: '餐飲食品',
      icon: '<i class="fas fa-utensils"></i>'
    },
    {
      categoryName: '其他',
      icon: '<i class="fas fa-pen"></i>'
    }
  ]
  )
    .then(() => db.close())
    .catch(error => console.log(error))
  console.log('Category Done!!')
  // db.close()
})
