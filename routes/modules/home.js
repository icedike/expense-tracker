const express = require('express')

const { Category, Record } = require('../../models/record')
const router = express.Router()

router.get('/', async (req, res) => {
  let totalAmount = 0
  const slashRecords = []
  let categories = []
  try {
    categories = await Category.find().lean()
    categories.forEach(function (category) {
      totalAmount += category.totalAmount
    })
  } catch (error) {
    console.log(error)
  }

  try {
    const records = await Record.find().lean()
    records.forEach(function (record) {
      record.date = record.date.replace(/-/g, '/')
      slashRecords.push(record)
      res.render('index', { categories, records: slashRecords, totalAmount })
    })
  } catch (error) {
    console.log(error)
  }
})

router.get('/sort', async (req, res) => {
  const categoryId = req.query.sort_id
  let categories = []
  try {
    categories = await Category.find().lean()
  } catch (error) {
    console.log(error)
  }

  try {
    const records = await Record.find({ category: categoryId }).populate('category').lean()
    const slashRecords = []
    records.forEach(function (record) {
      record.date = record.date.replace(/-/g, '/')
      slashRecords.push(record)
    })
    const totalAmount = records.length > 0 ? records[0].category.totalAmount : 0
    return res.render('index', { categories, records: slashRecords, totalAmount })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
