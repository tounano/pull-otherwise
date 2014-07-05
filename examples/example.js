var pull = require("pull-stream");
var otherwise = require("../");

var mainSource = pull.values([1,2,3,4]);
var alternative = pull.values([5,6,7,8,9]);

pull(
  mainSource,
  otherwise(alternative),
  pull.log()
)