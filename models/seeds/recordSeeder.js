const { Category, Record } = require('../record')
const db = require('../../config/mongoose')

const data = [
  {
    name: '午餐',
    category: '餐飲食品',
    date: '2020-07-02',
    amount: 60
  },
  {
    name: '大樂透',
    category: '其他',
    date: '2020-07-03',
    amount: 50
  },
  {
    name: '捷運',
    category: '交通出行',
    date: '2020-07-04',
    amount: 120
  },
  {
    name: '電影：驚奇隊長',
    category: '休閒娛樂',
    date: '2020-07-10',
    amount: 220
  },
  {
    name: '租金',
    category: '家居物業',
    date: '2020-08-01',
    amount: 25000
  }
]

db.once('open', () => {
  data.forEach(dataItem => {
    Category.findOne({ categoryName: dataItem.category })
      .then(category => {
        dataItem.category = category._id
        category.totalAmount += dataItem.amount
        Record.create(dataItem)
        category.save()
      })
      .catch(error => console.log(error))
  })
  console.log('Record Done!!')
})
