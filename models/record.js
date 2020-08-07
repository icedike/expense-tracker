const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
  categoryName: String,
  icon: String,
  // records: [{ type: Schema.Types.ObjectId, ref: 'Record' }],
  totalAmount: {
    type: Number,
    default: 0
  }
})

const recordSchema = new Schema({
  name: String,
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  date: String,
  amount: Number
})

module.exports = {
  Category: mongoose.model('Category', categorySchema),
  Record: mongoose.model('Record', recordSchema)
}
