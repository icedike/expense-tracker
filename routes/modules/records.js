const express = require('express')

const { Category, Record } = require('../../models/record')
const router = express.Router()

router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .then(categories => res.render('new', { categories }))
    .catch(error => console.log(error))
})

router.post('/', async (req, res) => {
  const newRecord = req.body
  try {
    const category = await Category.findOne({ categoryName: newRecord.category })
    newRecord.category = category._id
    category.totalAmount += Number(newRecord.amount)
    await category.save()
    await Record.create(newRecord)
    res.redirect('/')
  } catch (error) {
    console.log(error)
  }
})

router.get('/:record_id/edit', async (req, res) => {
  const id = req.params.record_id
  try {
    const categories = await Category.find().lean()
    const record = await Record.findById(id).populate('category').lean()
    categories.forEach(function (category, index) {
      if (category.categoryName === record.category.categoryName) {
        categories[index].selected = true
      }
    })
    res.render('edit', { categories, record })
  } catch (error) {
    console.log(error)
  }
})

router.put('/:record_id', async (req, res) => {
  const id = req.params.record_id
  const editRecord = req.body
  try {
    const category = await Category.findOne({ categoryName: editRecord.category })
    editRecord.category = category._id
    category.totalAmount += Number(editRecord.amount)
    await category.save()
    let record = await Record.findById(id)
    const oldCategory = await Category.findById(record.category)
    oldCategory.totalAmount -= record.amount
    await oldCategory.save()
    record = Object.assign(record, editRecord)
    await record.save()
    res.redirect('/')
  } catch (error) {
    console.log(error)
  }
})

router.delete('/:record_id', async (req, res) => {
  const id = req.params.record_id

  try {
    const record = await Record.findById(id)
    const category = await Category.findById(record.category)
    category.totalAmount -= record.amount
    await category.save()
    await record.remove()
    res.redirect('/')
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
