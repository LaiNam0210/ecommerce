db.product.drop();

var characters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'T', 'Y', 'W',
  'Z', 'V', 'J', 'S', 'R', 'X', 'r', 's', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'y', 't', 'w', 'z', 'v', 'j', 'x'
];

var inventory = [
  'Thành Phố Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Cần Thơ', 'Bình Dương', 'Quảng Nam', 'Hải Phòng', 'Hà Nội'
];

var discount = [{
  level: 'Mức 1',
  discount: '20,000 VNĐ',
  costBill: '350,000 VNĐ'
}, {
  level: 'Mức 2',
  discount: '35,000 VNĐ',
  costBill: '550,000 VNĐ'
}];
var color = [
  'Bạc',
  'Be',
  'Booc đô',
  'Cam',
  'Caro',
  'Chấm bi',
  'Cốm',
  'Ghi',
  'Họa tiết',
  'Hồng',
  'Kem',
  'Khác',
  'Màu cà phê sữa',
  'Màu  cánh gián',
  'Màu khói nhạt',
  'Màu nâu vân đồi mồi',
  'Màu nâu vàng',
  'Màu rêu ánh vàng',
  'Màu trà',
  'Màu tro',
  'Màu đỏ ánh cam',
  'Nâu',
  'Nâu đen',
  'Sọc dọc',
  'Sọc ngang',
  'Tím',
  'Tím than',
  'Trắng',
  'Vàng',
  'Vàng chanh',
  'Xám',
  'Xám đen',
  'Xanh',
  'Xanh côban',
  'Xanh da trời',
  'Xanh lá',
  'Xanh nước biển',
  'Xanh rêu',
  'Xanh đen',
  'Đen',
  'Đỏ',
  'Đỏ nâu',
  'Đồng'
];

var producer = [
  'Đang cập nhật',
  'HanNJam',
  'QuanVJu',
  'ManKJu',
  'QuanTJu'

];

var material = [
  'Giấy',
  'Thun',
  'Mũ',
  'Sắt'
];
var years = [
  '2000',
  '2001',
  '2002',
  '2003',
  '2004',
  '2005',
  '2006',
  '2007',
  '2008',
  '2009',
  '2010',
  '2011',
  '2012',
  '2013',
  '2014',
];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var product = {
  //cover: ['../assets/images/1a101d86a1b2f49f0a89a204fe3e259c_2i081b1819l0j_simg_c809ce_160x210_maxb.jpg'],
  attrs: {},
};

for (var i = 1; i < 10000; i++) {
  var word = '';
  var words = getRandomInt(1, 7);
  for (var j = 0; j < words; j++) {
    word = characters[getRandomInt(0, 49)] + word;
  }
  product.title = "Sample " + word;
  product._id = i;
  var len = getRandomInt(1, 5);
  var colors = [];

  for (var k = 0; k < len; k++) {
    colors[k] = color[getRandomInt(0, color.length)];
  }

  product.attrs.colors = colors;
  product.catid = getRandomInt(1, 10);
  product.inventory = inventory[getRandomInt(0, inventory.length - 1)];
  var href = getRandomInt(1, 50);
  product.href = '../assets/images/' + href + '.jpg';
   product.detail = '#/detail/' + i;
  product.newPrice = 85000 + getRandomInt(1, 7) * 10000;
  product.shopid = getRandomInt(1, 5);
  product.discount = getRandomInt(0, 1) === 1 ? discount : [];
  product.freeship = getRandomInt(0, 1);
  product.digitalInfoInventory = [{
    label: 'Nguồn gốc: ',
    binse: getRandomInt(0, 1) === 1 ? 'Chính Hãng' : 'Hàng Công Ty'
  }, {
    label: 'Xuất xứ',
    binse: inventory[getRandomInt(0, inventory.length - 1)]
  }, {
    label: 'Năm sản xuất:',
    binse: years[getRandomInt(0, years.length - 1)]
  }, {
    label: 'Hãng sản xuất',
    binse: producer[getRandomInt(0, 4)]
  }, {
    label: 'Chất liệu',
    binse: material[getRandomInt(0, 4)]
  }];
  db.product.save(product);
}
