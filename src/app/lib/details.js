angular.module('app.details', [])

.factory('$details', function() {
    // body...

    var titleCategoryHome = [{
        _id: 'thoi-trang-nu-1',
        href: '#',
        title: 'TOP THỜI TRANG NỮ',
        data: [{
            title: 'Áo nữ',
            href: '#'
        }, {
            title: 'Đầm',
            href: '#'
        }, {
            title: 'Váy',
            href: '#'
        }, {
            title: 'Quần nữ',
            href: '#'
        }, {
            title: 'Giày, dép nữ',
            href: '#'
        }, {
            title: 'Phụ kiện',
            href: '#'
        }, {
            title: 'Trang sức',
            href: '#'
        }, ]
    }, {
        _id: 'thoi-trang-nam-2',
        href: '#',
        title: 'TOP THỜI TRANG NAM',
        data: [{
                title: 'Áo nam',
                href: '#'
            },


            {
                title: 'Áo khoác',
                href: '#'
            },


            {
                title: 'Quần nam',
                href: '#'
            },


            {
                title: 'Giày, dép nam',
                href: '#'
            },


            {
                title: 'Áo vest, blazer',
                href: '#'
            },


            {
                title: 'Đồ lót và ngủ',
                href: '#'
            },
        ]
    }, {
        _id: 'me-va-be-3',
        href: '#',
        title: 'TOP MẸ VÀ BÉ',
        data: [{
                title: 'Thời trang cho bé',
                href: '#'
            },


            {
                title: 'Đồ dùng sơ sinh',
                href: '#'
            },


            {
                title: 'Đồ cho bé khi ra ngoài',
                href: '#'
            },


            {
                title: 'Đồ dùng cho mẹ sau khi sinh',
                href: '#'
            },
        ]
    }, {
        _id: 'my-pham-4',
        href: '#',
        title: 'TOP MỸ PHẨM',
        data: [{
                title: 'Trang điểm mặt',
                href: '#'
            },


            {
                title: 'Nước hoa',
                href: '#'
            },


            {
                title: 'Chăm sóc da nữ',
                href: '#'
            },


            {
                title: 'Trang điểm mắt',
                href: '#'
            },


            {
                title: 'Trang điểm  môi',
                href: '#'
            },
        ]
    }, {
        _id: 'phu-kien-cong-nghe-5',
        href: '#',
        title: 'TOP PHỤ KIỆN CÔNG NGHỆ',
        data: [{
                title: 'Case Máy tính bảng',
                href: '#'
            },


            {
                title: 'Case ĐTDĐ',
                href: '#'
            },


            {
                title: 'USB',
                href: '#'
            },


            {
                title: 'Chuột',
                href: '#'
            },


            {
                title: 'Tai nghe',
                href: '#'
            },


            {
                title: 'Đế tản nhiệt',
                href: '#'
            },
        ]
    }, {
        _id: 'khong-gian-song-6',
        href: '#',
        title: 'TOP KHÔNG GIAN SỐNG',
        data: [{
                title: 'Khung hình',
                href: '#'
            },


            {
                title: 'Tinh dầu',
                href: '#'
            },

            {
                title: 'Đồng hồ để bàn',
                href: '#'
            },


            {
                title: 'Ly, tách',
                href: '#'
            },


            {
                title: 'Tranh',
                href: '#'
            },
        ]
    }];
    return {
        titleCategoryHome: titleCategoryHome
    };
});