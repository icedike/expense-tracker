const express = require('express')
const { Category, Record } = require('../../models/record')
const router = express.Router()
const { formatDate } = require('../../config/dateUtil')

router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .then(categories => res.render('new', { categories }))
    .catch(error => console.log(error))
})

router.post('/', async (req, res) => {
  const newRecord = req.body
  newRecord.userId = req.user._id
  try {
    const category = await Category.findOne({ categoryName: newRecord.category })
    newRecord.category = category._id
    await Record.create(newRecord)
    res.redirect('/')
  } catch (error) {
    console.log(error)
  }
})

router.get('/:record_id/edit', async (req, res) => {
  const _id = req.params.record_id
  const userId = req.user._id
  try {
    const categories = await Category.find().lean()
    const record = await Record.findOne({ _id, userId }).populate('category').lean()
    categories.forEach(function (category, index) {
      if (category.categoryName === record.category.categoryName) {
        categories[index].selected = true
      }
    })
    record.date = formatDate(record.date, true).replace(/\//g, '-')
    console.log('date', record.date)
    res.render('edit', { categories, record })
  } catch (error) {
    console.log(error)
  }
})

router.put('/:record_id', async (req, res) => {
  const _id = req.params.record_id
  const editRecord = req.body
  const userId = req.user._id
  try {
    const category = await Category.findOne({ categoryName: editRecord.category })
    editRecord.category = category._id
    let record = await Record.findOne({ _id, userId })
    record = Object.assign(record, editRecord)
    await record.save()
    res.redirect('/')
  } catch (error) {
    console.log(error)
  }
})

router.delete('/:record_id', async (req, res) => {
  const _id = req.params.record_id
  const userId = req.user._id
  try {
    const record = await Record.findOne({ _id, userId })
    await record.remove()
    res.redirect('/')
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
