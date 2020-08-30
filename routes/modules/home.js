const express = require('express')

const { Category, Record } = require('../../models/record')
const router = express.Router()

function formatDate(date) {
  const d = new Date(date)
  let month = '' + (d.getMonth() + 1)
  let day = '' + d.getDate()
  const year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('/')
}

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().lean()
    let totalAmount = 0
    categories.forEach(function (category) {
      totalAmount += category.totalAmount
    })
    const records = await Record.find().populate('category').sort({ date: 'desc' }).lean()
    const slashRecords = []
    records.forEach(function (record) {
      record.date = formatDate(record.date)
      slashRecords.push(record)
    })
    res.render('index', { categories, records: slashRecords, totalAmount })
  } catch (error) {
    console.log(error)
  }
})

router.get('/sort', async (req, res) => {
  const categoryId = req.query.sort_id
  try {
    const categories = await Category.find().lean()
    const records = await Record.find({ category: categoryId }).populate('category').lean()
    const slashRecords = []
    records.forEach(function (record) {
      record.date = formatDate(record.date)
      slashRecords.push(record)
    })
    const totalAmount = records.length > 0 ? records[0].category.totalAmount : 0
    res.render('index', { categories, records: slashRecords, totalAmount })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
