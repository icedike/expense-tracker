module.exports = {
  if_even: function (conditional, options) {
    if ((conditional % 2) === 0) {
      return options.fn(this)
    } else {
      return options.inverse(this)
    }
  }
}
