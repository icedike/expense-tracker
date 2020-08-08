const express = require('express')

const { Category, Record } = require('../../models/record')
const record = require('../../models/record')
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
          const slashRecords = []
          records.forEach(function (record) {
            record.date = record.date.replace(/-/g, '/')
            slashRecords.push(record)
          })
          return res.render('index', { categories, records: slashRecords, totalAmount })
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})

router.get('/sort', (req, res) => {
  const categoryId = req.query.sort_id
  Category.find()
    .lean()
    .then(categories => {
      return Record.find({ category: categoryId })
        .populate('category')
        .lean()
        .then(records => {
          const slashRecords = []
          records.forEach(function (record) {
            record.date = record.date.replace(/-/g, '/')
            slashRecords.push(record)
          })
          let totalAmount = 0
          if (records.length > 0) {
            totalAmount = records[0].category.totalAmount
          } else {
            totalAmount = 0
          }
          return res.render('index', { categories, records: slashRecords, totalAmount })
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})

module.exports = router
