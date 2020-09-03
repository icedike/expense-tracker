const { Category } = require('../record')
const db = require('../../config/mongoose')

db.once('open', () => {
  Category.create([
    {
      categoryName: '家居物業',
      icon: 'fas fa-home'
    },
    {
      categoryName: '交通出行',
      icon: 'fas fa-shuttle-van'
    },
    {
      categoryName: '休閒娛樂',
      icon: 'fas fa-grin-beam'
    },
    {
      categoryName: '餐飲食品',
      icon: 'fas fa-utensils'
    },
    {
      categoryName: '其他',
      icon: 'fas fa-pen'
    }
  ]
  )
    .then(() => db.close())
    .catch(error => console.log(error))
  console.log('Category Done!!')
})
