angular.module('leftfilter', [])

.factory('catalog', function() {
  var catalog = [
    'Danh Mục', 'Áo sơ mi', 'Áo kiểu',
    'Áo thun có tay', 'Áo thun không tay',
    'Áo hai day, áo quây', 'Áo vest, blazer',
    'Áo khoác', 'Áo đôi',
    'Sản phẩm khác', 'Áo len'
  ];
  var price = [
    'Giá',
    '0 VNĐ -  100,000 VNĐ',
    '100,000 VNĐ - 300,000 VNĐ',
    '300,000 VNĐ - 500,000 VNĐ',
    '500,000 VNĐ - 1,000,000 VNĐ',
    'Trên 1,000,000 VNĐ'
  ];

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

  var style = [
    'Kiểu Dáng',
    'Dài tay',
    'Khác',
    'Ngắn tay',
    'Sát nách'
  ];

  var origin = [
    'Xuất Xứ',
    'Anh',
    'Hồng Kông',
    'Mỹ',
    'Pháp',
    'Singapore',
    'Thái Lan',
    'Việt Nam',
    'Đang cập nhật'
  ];
  return {
    catalog: catalog,
    price: price,
    color: color,
    style: style,
    origin: origin
  };
});
