const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
  categoryName: String,
  icon: String
})

const recordSchema = new Schema({
  name: String,
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  date: Date,
  amount: Number,
  merchant: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    require: true
  }
})

module.exports = {
  Category: mongoose.model('Category', categorySchema),
  Record: mongoose.model('Record', recordSchema)
}
