const express = require('express')

const { Category, Record } = require('../../models/record')
const router = express.Router()

router.get('/', (req, res) => {
  Category.find()
    .lean()
    .then(categories => {
      let totalAmount = 0
      categories.forEach(function (category) {
        totalAmount += category.totalAmount
      })
      return Record.find()
        .populate('category')
        .lean()
        .then(records => {
          for (let i = 0; i < records.length; i++) {
            records[i].date = records[i].date.replace(/-/g, '/')
          }
          return res.render('index', { categories, records, totalAmount })
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})

module.exports = router
