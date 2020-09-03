const { Category, Record } = require('../record')
const User = require('../user')
const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')

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

const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}

db.once('open', async () => {
  const hash = await bcrypt.genSalt(10).then(salt => bcrypt.hash(SEED_USER.password, salt))
  const user = await User.create({
    name: SEED_USER.name,
    email: SEED_USER.email,
    password: hash
  })

  for (const dataItem of data) {
    const category = await Category.findOne({ categoryName: dataItem.category })
    dataItem.category = category._id
    dataItem.userId = user._id
    await Record.create(dataItem)
  }

  console.log('Record Done!!')
  process.exit()
})
