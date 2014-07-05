var pull = require("pull-stream");
var unwind = require("pull-unwind");

var otherwise2 = pull.Through(function (read, alt) {
  var ended;
  return function (end, cb) {
    read(end || ended, function (_end, data) {
      if (_end && _end !== true) {
        return alt(_end, function () {
          return cb(_end);
        });
      }

      if (_end) return alt(end || ended, function (end, data) {
        if (end) ended = true;
        cb(end, data);
      })

      return cb(_end, data);
    })
  }
})

var otherwise = module.exports = pull.Through(function (read, alt) {
  return unwind()(
    pull.values([
      read,
      alt
    ])
  )
})
