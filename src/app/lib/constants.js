angular.module('app.lib', [])

.factory('$consts', function() {

    var category = [{
        name: 'Thời trang nữ',
        href: '#/category/1',
        class: 'icon-cate thoi-trang-nu'
    }, {
        name: 'Thời trang nam',
        href: '#/category/2',
        class: 'icon-cate thoi-trang-nam'
    }, {
        name: 'Mẹ và bé',
        href: '#/category/3',
        class: 'icon-cate me-va-be'
    }, {
        name: 'Mỹ phẩm',
        href: '#/category/4',
        class: 'icon-cate my-pham'
    }, {
        name: 'Phụ kiện công nghệ',
        href: '#/category/5',
        class: 'icon-cate phu-kien-cong-nghe'

    }, {
        name: 'Không gian sống',
        href: '#/category/6',
        class: 'icon-cate khong-gian-song',

    }];
    var shoppingGuide = [{
            title: 'Xu hướng thời trang nữ',
            href: '#',
        },

        {
            title: 'Xu hướng thời trang nam',
            href: '#',
        },

        {
            title: 'Tư vấn thời trang nữ',
            href: '#',
        },

        {
            title: 'Tư vấn thời trang nam',
            href: '#',
        },

        {
            title: 'Tư vấn thời trang mẹ và bé',
            href: '#',
        },

        {
            title: 'Đánh giá thời trang mẹ và bé',
            href: '#',
        }
    ];
    return {
        category: category,
        shoppingGuide: shoppingGuide
    };
});