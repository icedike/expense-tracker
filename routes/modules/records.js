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

router.get('/:record_id/edit', (req, res) => {
  const id = req.params.record_id
  Category.find()
    .lean()
    .then(categories => {
      return Record.findById(id)
        .populate('category')
        .lean()
        .then(record => {
          categories.forEach(function (category, index) {
            if (category.categoryName === record.category.categoryName) {
              categories[index].selected = true
            }
          })
          return res.render('edit', { categories, record })
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})

router.put('/:record_id', (req, res) => {
  const id = req.params.record_id
  const editRecord = req.body
  Category.findOne({ categoryName: editRecord.category })
    .then(category => {
      editRecord.category = category._id
      category.totalAmount += Number(editRecord.amount)
      return category.save()
        .then(() => {
          return Record.findById(id)
            .then(record => {
              return Category.findById(record.category)
                .then(oldCategory => {
                  oldCategory.totalAmount -= record.amount
                  return oldCategory.save()
                })
                .then(() => {
                  record = Object.assign(record, editRecord)
                  return record.save()
                })
                .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.delete('/:record_id', (req, res) => {
  const id = req.params.record_id
  Record.findById(id)
    .then(record => {
      return Category.findById(record.category)
        .then(category => {
          category.totalAmount -= record.amount
          return category.save()
        })
        .then(() => record.remove())
        .catch(error => console.log(error))
    })
    .then(() => res.redirect('/'))
    .catch()
})

module.exports = router
