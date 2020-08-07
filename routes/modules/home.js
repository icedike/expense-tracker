const express = require('express')
const router = express.Router()

const { Category, Record } = require('../../models/record')

router.get('/', (req, res) => {
  Category.find()
    .lean()
    .then(categories => {
      return Record.find()
        .populate('category')
        .lean()
        .then(records => {
          for (let i = 0; i < records.length; i++) {
            records[i].date = records[i].date.replace(/-/g, '/')
          }
          return res.render('index', { categories, records })
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})

router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .then(categories => res.render('new', { categories }))
    .catch(error => console.log(error))
})

function outputyyyymmdd(date) {
  const mm = date.getMonth() + 1 // getMonth() is zero-based
  const dd = date.getDate()

  return [date.getFullYear(), (mm > 9 ? '' : '0') + mm, (dd > 9 ? '' : '0') + dd
  ].join('/')
}

module.exports = router
