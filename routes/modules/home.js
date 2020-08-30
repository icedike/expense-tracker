const express = require('express')
const mongoose = require('mongoose')

const { formatDate } = require('../../config/dateUtil')

const { Category, Record } = require('../../models/record')
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().lean()
    let totalAmount = 0
    let availableMonth = []
    categories.forEach(function (category) {
      totalAmount += category.totalAmount
    })
    const records = await Record.find().populate('category').sort({ date: 'desc' }).lean()
    const slashRecords = []
    records.forEach(function (record) {
      record.date = formatDate(record.date, true)
      const recordMonth = formatDate(record.date, false)
      if (availableMonth.indexOf(recordMonth) === -1) availableMonth.push(recordMonth)
      slashRecords.push(record)
    })
    availableMonth = availableMonth.map(month => ({ month }))
    res.render('index', { categories, records: slashRecords, availableMonth, totalAmount })
  } catch (error) {
    console.log(error)
  }
})

router.get('/sort', async (req, res) => {
  const { category, month } = req.query
  const condition = {}
  let availableMonth = []
  let totalAmount = 0
  if (category) condition.category = mongoose.Types.ObjectId(category)
  if (month) {
    const yyyymm = month.split('/')
    condition.year = Number(yyyymm[0])
    condition.month = Number(yyyymm[1])
  }
  try {
    const categories = await Category.find().lean()
    const records = await Record.aggregate([
      { $addFields: { month: { $month: '$date' }, year: { $year: '$date' } } },
      { $match: condition },
      { $sort: { date: -1 } },
      {
        $lookup: { as: 'category', from: 'categories', localField: 'category', foreignField: '_id' }
      }
    ]).unwind('category')
    console.log('records', records)
    const slashRecords = []
    records.forEach(function (record) {
      record.date = formatDate(record.date, true)
      totalAmount += record.amount
      slashRecords.push(record)
    })
    const allRecords = await Record.find().sort({ date: 'desc' })
    allRecords.forEach(function (record) {
      const recordMonth = formatDate(record.date, false)
      if (availableMonth.indexOf(recordMonth) === -1) availableMonth.push(recordMonth)
    })

    categories.forEach(item => (item.isSelected = item._id.equals(category)))
    availableMonth = availableMonth.map(month => ({ month }))
    availableMonth.forEach(item => (item.isSelected = item.month === month))
    res.render('index', { categories, records: slashRecords, availableMonth, totalAmount })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
