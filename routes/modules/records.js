const express = require('express')

const { Category, Record } = require('../../models/record')
const router = express.Router()

router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .then(categories => res.render('new', { categories }))
    .catch(error => console.log(error))
})

router.post('/', (req, res) => {
  const newRecord = req.body
  Category.findOne({ categoryName: newRecord.category })
    .then(category => {
      newRecord.category = category._id
      category.totalAmount += Number(newRecord.amount)
      category.save()
      return Record.create(newRecord)
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})

module.exports = router
