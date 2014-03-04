db.cached.drop();
var cache = {
  sample: 'sample'
};
var characters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'T', 'Y', 'W',
  'Z', 'V', 'J', 'S', 'R', 'r', 's', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'y', 't', 'w', 'z', 'v', 'j'
];

var _id;
for (var i = 0; i < 1000; i++) {
  var word = '';
  var words = getRandomInt(1, 7);
  for (var j = 0; j < words; j++) {
    word = characters[getRandomInt(0, 47)] + word;
  }
  cache.value = word;
  db.cached.insert(cache);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
