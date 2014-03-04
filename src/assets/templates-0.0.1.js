angular.module('templates', ['blockcategory/blockcate.tpl.html', 'category/category.tpl.html', 'category/directive/category.tpl.html', 'com/home-left.tpl.html', 'com/home-right.tpl.html', 'com/topnav.tpl.html', 'detail/column_right.tpl.html', 'detail/detail.tpl.html', 'home/home.tpl.html', 'shop-free-detail/shop-free-detail.tpl.html']);

angular.module("blockcategory/blockcate.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("blockcategory/blockcate.tpl.html",
    "<div class=\"block-cate-home\">\n" +
    "  <!-- Show category and sub category-->\n" +
    "  <div class=\"title-cate-home\">\n" +
    "    <h2 class=\"title\">\n" +
    "      <a ng-href=\"{{blockcats.href}}\" title=\"{{blockcats.title}}\">{{blockcats.title}}</a>\n" +
    "    </h2>\n" +
    "    <ul>\n" +
    "      <li ng-repeat='blockcat in blockcats.data'>\n" +
    "        <a ng-href=\"{{blockcat.href}}\" title=\"{{blockcat.title}}\">{{blockcat.title}} </a>\n" +
    "      </li>\n" +
    "      <li>\n" +
    "        <a class=\"view-more\" ng-href=\"#\" title=\"Xem tất cả\"> Xem tất cả </a>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "  <!-- Show product list-->\n" +
    "  <div class=\"block-catehome-cont\">\n" +
    "    <div class=\"block-product\" ng-repeat='product in products.data'>\n" +
    "      <a class=\"img\" ng-href=\"{{product.detail}}\" title=\"{{product.title}}\">\n" +
    "        <img ng-src=\"{{product.href}}\" border=\"0\" alt=\"{{product.title}}\">\n" +
    "      </a>\n" +
    "      <div class=\"block-price\">\n" +
    "\n" +
    "        <div class=\"price-box\">\n" +
    "          <span class=\"regular-price\" id=\"product-price-65981\">\n" +
    "            <span class=\"new-price\">\n" +
    "              <span class=\"price\">{{product.newPrice}}</span>\n" +
    "            </span>\n" +
    "          </span>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <h3>\n" +
    "        <a class=\"name-prod\" ng-href=\"product.href\">{{product.title}}</a>\n" +
    "      </h3>\n" +
    "      <a class=\"shop\" ng-href=\"{{product.shop.href}}\" target=\"_blank\" title=\"{{product.shop.name}}\">Shop: <span>{{product.shop.name}} </span></a>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("category/category.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("category/category.tpl.html",
    "<div class=\"container-page col2-left-layout\">\n" +
    "\n" +
    "    <div id=\"container-wrapper\" class=\"main\">\n" +
    "        <div class=\"breadcrumbs\">\n" +
    "\n" +
    "            <div itemscope=\"\" itemtype=\"http://data-vocabulary.org/Breadcrumb\">\n" +
    "                <a ng-href=\"#\" title=\"Sendo\" itemprop=\"url\">\n" +
    "                    <span itemprop=\"title\">Sendo</span>\n" +
    "                </a>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "            <div itemscope=\"\" itemtype=\"http://data-vocabulary.org/Breadcrumb\">\n" +
    "                <a ng-href=\"#\" title=\"Thời trang nam\" itemprop=\"url\">\n" +
    "                    <span itemprop=\"title\">Thời trang nam</span>\n" +
    "                </a>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "            <div itemscope=\"\" itemtype=\"http://data-vocabulary.org/Breadcrumb\">\n" +
    "                <span itemprop=\"title\">Áo nam</span>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "        <div class=\"products-listing-wrapper\">\n" +
    "<!-- \n" +
    "            <div class=\"products-listing-left\">\n" +
    "                <div class=\"block block-layered-nav gomage-navigation-slider-type-cone gomage-navigation-icons-1F5070\">\n" +
    "\n" +
    "                    <div class=\"block-content\" id=\"gan-block-content\">\n" +
    "                        <p class=\"block-subtitle\">\n" +
    "\n" +
    "                        </p>\n" +
    "                        <div id=\"narrow-by-list\">\n" +
    "                            <dl class=\"gan-attribute\">\n" +
    "                                <dt id=\"advancednavigation-filter-content-cat-title\">\n" +
    "                                    <span class=\"filter-name\">Danh mục</span>\n" +
    "\n" +
    "                                </dt>\n" +
    "                                <dd id=\"advancednavigation-filter-content-cat\">\n" +
    "                                    <ol class=\" \">\n" +
    "                                        <li ng-repeat=\"item in catalog.catalog\">\n" +
    "                                            <a class=\" cate_lv1\" ng-href=\"#\">{{item}}</a>\n" +
    "                                        </li>\n" +
    "                                    </ol>\n" +
    "                                </dd>\n" +
    "                            </dl>\n" +
    "                            <dl class=\"gan-attribute\">\n" +
    "                                <dt id=\"advancednavigation-filter-content-mau_sac-title\">\n" +
    "                                    <span class=\"filter-name\">Màu sắc</span>\n" +
    "\n" +
    "                                </dt>\n" +
    "                                <dd id=\"advancednavigation-filter-content-mau_sac\">\n" +
    "\n" +
    "                                    <ol class=\" \">\n" +
    "                                        <li ng-repeat=\"item in catalog.color | limitTo: colornumber\">\n" +
    "                                            <a ng-href=\"#/product/product?search_color={{item}}\">{{item}}</a>\n" +
    "                                        </li>\n" +
    "                                        <li class=\"li-gan-attr-more\" ng-show=\"colordisplay\">\n" +
    "                                            <button class=\"gan-attr-more\" ng-click=\"colormore()\">Xem thêm</button>\n" +
    "                                        </li>\n" +
    "                                        <li class=\"li-gan-attr-less\" ng-show=\"!colordisplay\" ng-click=\"colorless()\">\n" +
    "                                            <button class=\"gan-attr-less\">Thu gọn</button>\n" +
    "                                        </li>\n" +
    "                                    </ol>\n" +
    "\n" +
    "                                </dd>\n" +
    "                            </dl>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div> -->\n" +
    "            <div category-sendo options=\"options\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <span id=\"fpcIdentifier\"></span>\n" +
    "</div>\n" +
    "");
}]);

angular.module("category/directive/category.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("category/directive/category.tpl.html",
    "<div class=\"products-listing-right\">\n" +
    "  <div class=\"products-listing-content \">\n" +
    "    <div class=\"title-a\">\n" +
    "      <a class=\"current\" ng-href=\"#san-pham-moi\" title=\"Hàng mới về\">Hàng mới về</a>\n" +
    "      <span>|</span>\n" +
    "      <a ng-href=\"#san-pham-ban-chay\" title=\"Sản phẩm bán chạy\">Sản phẩm bán chạy</a> \n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"filter_bar\">\n" +
    "      <label class=\"input-km\">\n" +
    "        <input name=\"free_shipping\" id=\"promotion\" type=\"checkbox\" value=\"\">\n" +
    "        <span>Chọn những sản phẩm đang khuyến mãi</span>\n" +
    "      </label>\n" +
    "      <label class=\"input-km\">\n" +
    "        <input name=\"shop_free_shipping\" id=\"shop_free_shipping\" type=\"checkbox\" value=\"\" ng-click=\"freeship($event)\">\n" +
    "        <span id=\"title_shop_free_shipping\">Chọn những sản phẩm\n" +
    "          <strong class=\"green-mp\">miễn phí</strong>vận chuyển</span>\n" +
    "      </label>\n" +
    "    </div>\n" +
    "    <div class=\"category-products\">\n" +
    "      <div class=\"toolbar\">\n" +
    "        <pagination total-items=\"products.total\" page=\"products.pagePlusOne\" max-size=\"15\" class=\"pagination-sm\" boundary-links=\"true\" items-per-page=\"per_page\"></pagination>\n" +
    "        <!-- pagination -->\n" +
    "      </div>\n" +
    "      <div class=\"listing-wrapper\">\n" +
    "        <div class=\"block-product \" ng-repeat='product in products.data'>\n" +
    "          <a class=\"img\" ng-href=\"{{product.detail}}\" title=\"{{product.title}}\">\n" +
    "            <img ng-src=\"{{product.href}}\" border=\"0\" title=\"{{product.title}}\" alt=\"product.title\">\n" +
    "          </a>\n" +
    "          <div class=\"free-ship-car\" ng-show=\"product.freeship\">\n" +
    "            <img ng-src=\"../../assets/images/free-ship-car.png\" width=\"18\" alt=\"\">Miễn phí</div>\n" +
    "          <div class=\"price-box\">\n" +
    "            <span class=\"regular-price\" id=\"product-price-533512\">\n" +
    "              <span class=\"price\">{{product.newPrice}}&nbsp;VNĐ</span>\n" +
    "            </span>\n" +
    "          </div>\n" +
    "\n" +
    "          <h3><a class=\"name-prod\" ng-href=\"{{product.href}}\" title=\"{{product.title}}\">{{product.title}}</a>\n" +
    "          </h3>\n" +
    "          <a class=\"shop\" ng-href=\"{{product.shop.href}}\" title=\"{{product.shop.title}}\">Shop:<span>{{product.shop.name}}</span></a>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"toolbar-bottom\">\n" +
    "\n" +
    "        <div class=\"toolbar\">\n" +
    "          <pagination total-items=\"products.total\" page=\"products.pagePlusOne\" max-size=\"5\" class=\"pagination-sm\" boundary-links=\"true\" items-per-page=\"per_page\"></pagination>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("com/home-left.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("com/home-left.tpl.html",
    "");
}]);

angular.module("com/home-right.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("com/home-right.tpl.html",
    "<div class=\"home-right\">\n" +
    "    <div class=\"top-3banner\">\n" +
    "        <a class=\"\" ng-href=\"#\" title=\"Chọn trang phục giúp phái nữ thoải mái luyện tập thể dục thể thao \">\n" +
    "            <img src=\"../assets/images/Banner__240x180_2002014_1_simg_51230b_240x180_max.jpg\" alt=\"Chọn trang phục giúp phái nữ thoải mái luyện tập thể dục thể thao \">\n" +
    "        </a>\n" +
    "        <a class=\"\" ng-href=\"#\" title=\"Thế giới đồ dùng cho bé sơ sinh\">\n" +
    "            <img src=\"../assets/images/Banner__240x180_20012014_3_simg_51230b_240x180_max.jpg\" alt=\"Thế giới đồ dùng cho bé sơ sinh\">\n" +
    "        </a>\n" +
    "        <a class=\"end\" ng-href=\"#\" title=\"Các loại giày dép nam phù hợp với mọi đối tượng\">\n" +
    "            <img src=\"../assets/images/Banner__240x180_20012014_2_simg_51230b_240x180_max.jpg\" alt=\"Các loại giày dép nam phù hợp với mọi đối tượng\">\n" +
    "        </a>\n" +
    "    </div>\n" +
    "    <div ng-repeat=\"blockcat in blockcats\">\n" +
    "        <div class=\"block-cate-home\" block-Category blockcat='blockcat'></div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("com/topnav.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("com/topnav.tpl.html",
    "<div class=\"wrapper\">\n" +
    "    <div id=\"header\">\n" +
    "        <div class=\"header-content\">\n" +
    "            <h1 class=\"logo-sendo\">\n" +
    "                Non-Profit\n" +
    "            </h1>\n" +
    "            <div class=\"header-wrap\">\n" +
    "                <div class=\"head-info\">\n" +
    "                    <div class=\"img-info\">\n" +
    "                        <a class=\"a-tooltip\" target=\"_blank\" data-original-title=\"Người mua chỉ thanh toán khi nhận hàng còn nguyên niêm phong, nguyên đai nguyên kiện. Áp dụng trên toàn quốc với các đơn hàng có giá trị dưới 10,000,000 đồng.\" data-toggle=\"tooltip\" data-placement=\"bottom\" href=\"#\">\n" +
    "                            <img title=\"\" alt=\"\" src=\"../assets/images/img-cod.png\">\n" +
    "                        </a>\n" +
    "                        <a class=\"a-tooltip\" target=\"_blank\" data-original-title=\"Người mua có quyền khiếu nại và yêu cầu được hoàn tiền nếu hàng hóa không giống như mô tả hoặc không phải là món hàng mà bạn muốn mua.\" data-toggle=\"tooltip\" data-placement=\"bottom\" href=\"#\">\n" +
    "                            <img title=\"\" alt=\"\" src=\"../assets/images/img-gddb.png\">\n" +
    "                        </a>\n" +
    "                    </div>\n" +
    "                    <ul>\n" +
    "                        <li class=\"first\"><a title=\"Bảo vệ người mua\" href=\"#\">Bảo vệ người\n" +
    "                            mua</a>\n" +
    "                        </li>\n" +
    "                        <li><a title=\"Hỏi đáp\" href=\"#\">Hỏi đáp</a>\n" +
    "                        </li>\n" +
    "                        <li>Hỗ trợ :\n" +
    "                            <img title=\"\" alt=\"\" src=\"../assets/images/img-ht-head.png\">\n" +
    "                            <strong>(04) 7300 4455</strong>(HN) -\n" +
    "                            <strong>(08) 7300 4455</strong>(TP HCM)\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "                </div>\n" +
    "                <div class=\"box-search\">\n" +
    "\n" +
    "                    <div class=\"search-bar\">\n" +
    "                        <div class=\"search-input-select\">\n" +
    "                            <input id=\"search\" type=\"text\" placeholder=\"Nhập từ khóa tìm kiếm\" name=\"q\" class=\"search-txt\" autocomplete=\"off\" typeahead=\"value for value in getCached($viewValue)\" ng-model=\"selected\" typeahead-on-select=\"selectMatch($item)\">\n" +
    "                            <div id=\"search_autocomplete\" class=\"search-autocomplete\" style=\"display: none;\"></div>\n" +
    "                        </div>\n" +
    "                        <input value=\"\" type=\"submit\" class=\"search-btn\" ng-click=\"searchproduct()\">\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"cart-head\" title=\"Giỏ hàng của bạn\"><a title=\"Giỏ hàng 0\" href=\"#\">Giỏ hàng <span class=\"total\" id=\"qtyCart\">(0)</span></a>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"block-login\" id=\"fospconnect\">\n" +
    "                        <ul>\n" +
    "                            <li><a class=\"dn login-modal-click\" href=\"#\" title=\"Đăng nhập\">Đăng nhập</a>\n" +
    "                            </li>\n" +
    "                            <li><a class=\"dk signup-modal-click\" href=\"#\" title=\"Đăng ký\">Đăng ký </a>\n" +
    "                            </li>\n" +
    "                        </ul>\n" +
    "                        <div class=\"login-sendo\">\n" +
    "                            <div class=\"login-block\"><a class=\"a-login\" href=\"#\" title=\"Đăng nhập\">Đăng nhập</a>\n" +
    "                                <div class=\"login-ext\">\n" +
    "                                    <strong>Hoặc đăng nhập bằng:</strong>\n" +
    "                                    <a title=\"facebook\" href=\"#\" class=\"login-fb\">\n" +
    "                                        <img title=\"\" alt=\"\" src=\"../assets/images/icon-fb-s.png\">\n" +
    "                                    </a>\n" +
    "                                    <a title=\"yahoo\" href=\"#\" class=\"login-yahoo\">\n" +
    "                                        <img title=\"\" alt=\"\" src=\"../assets/images/icon-yahoo.png\">\n" +
    "                                    </a>\n" +
    "                                    <a title=\"google\" href=\"#\" class=\"login-google\">\n" +
    "                                        <img title=\"\" alt=\"\" src=\"../assets/images/icon-google.png\">\n" +
    "                                    </a>\n" +
    "                                </div>\n" +
    "                                <div class=\"a-signup\">\n" +
    "                                    <span>Bạn chưa có tài khoản?</span><a title=\"Đăng ký\" href=\"#\">Đăng ký</a>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "        <div id=\"nav-main\">\n" +
    "        <div class=\"line\"></div>\n" +
    "        <div class=\"nav-main-cont\">\n" +
    "            <div class=\"nav-main-left\">\n" +
    "                <div class=\"nav-main-box\">\n" +
    "                    <div class=\"nav-cate-title\">Danh mục sản phẩm\n" +
    "                        <span></span>\n" +
    "                    </div>\n" +
    "                   <!--  <ul class=\"home\">\n" +
    "                        <li class=\"\" ng-repeat='category in categories'>\n" +
    "                            <span class=\"{{category.class}}\"></span>\n" +
    "                            <h2><a class=\"\" title=\"{{cagtegory.title}}\" href=\"{{category.href}}\">{{category.name}}</a>\n" +
    "                            </h2>\n" +
    "                        </li>\n" +
    "                    </ul> -->\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"nav-main-right\">\n" +
    "                <div class=\"nav-top-box\">\n" +
    "                    <ul>\n" +
    "                        <li>\n" +
    "                            <a title=\"Khuyến mãi\" href=\"#\" class=\"promotions\">\n" +
    "                                <span></span>Khuyến mãi</a>\n" +
    "                        </li>\n" +
    "                        <li>\n" +
    "                            <a title=\"Cẩm nang mua sắm\" href=\"#\" class=\"camnang\">\n" +
    "                                <span></span>Cẩm nang mua sắm</a>\n" +
    "                            <ul class=\"sub-cnms\">\n" +
    "                                <li ng-repeat='guide in guides'><a title=\"{{guide.title}}\" href=\"{{guide.href}}\">{{guide.title}}</a>\n" +
    "                                </li>\n" +
    "                            </ul>\n" +
    "                        </li>\n" +
    "                        <li>\n" +
    "                            <a href=\"#\" title=\"Diễn đàn dành cho cộng đồng mua bán online tại Việt Nam\" target=\"_blank\" class=\"forum\">\n" +
    "                                <span></span>Cộng đồng</a>\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "                </div>\n" +
    "                <div class=\"open-shop\" id=\"open-shop\">\n" +
    "                    <a rel=\"nofollow\" href=\"#\" title=\"Mở shop\"> Mở Shop </a>\n" +
    "                </div>\n" +
    "                <div style=\"display: none;\" id=\"manager_shop\" class=\"open-shop\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("detail/column_right.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("detail/column_right.tpl.html",
    "<div class=\"col-right sidebar \">\n" +
    "    <!--<div class=\"holderShopInfo\"></div>-->\n" +
    "    <div class=\"shop-info\">\n" +
    "        <div class=\"name-shop\">\n" +
    "            <input type=\"hidden\" name=\"sid\" id=\"sid\" value=\"7705\">\n" +
    "            <a title=\"\" name=\"SHOP BALO THOI TRANG NAM\" class=\"shopname\" href=\"/shop/shop-balo-thoi-trang-nam/\">SHOP BALO THOI TRANG NAM</a>\n" +
    "        </div>\n" +
    "        <div class=\"dt-info shop-point\">\n" +
    "            <span class=\"fl pnorat\">Shop chưa được đánh giá</span>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"dt-info\">\n" +
    "            Thời gian hoạt động:\n" +
    "            <strong class=\"shopCreatedAt\">\n" +
    "                3 tháng</strong>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"cls\"></div>\n" +
    "        <div class=\"guide-info\">\n" +
    "\n" +
    "            <span style=\"\" id=\"commentrequiredlogin\">\n" +
    "                <a href=\"#\" title=\"Đăng nhập và gởi tin nhắn\" onclick=\"login_modal_click();\" class=\"a-login a-tooltip gtn\">Gởi tin nhắn</a>\n" +
    "            </span>\n" +
    "\n" +
    "            <a title=\"Thích shop\" id=\"fav_shop\" rel=\"7705\" href=\"javascript:void(0)\" class=\"ts\">Thích shop</a>\n" +
    "        </div>\n" +
    "        <button onclick=\"window.location.href='/shop/shop-balo-thoi-trang-nam'\" class=\"btn-gotoshop\">\n" +
    "            <span>Vào shop</span>\n" +
    "        </button>\n" +
    "    </div>\n" +
    "    <div class=\"protect-buyer\">\n" +
    "        <span class=\"title\">Bảo vệ người mua</span>\n" +
    "        <span class=\"desc\">\n" +
    "            <strong>Đảm bảo hoàn tiền đầy đủ</strong>\n" +
    "            <br>Nếu hàng không đến đúng thời gian quy định.\n" +
    "        </span>\n" +
    "        <span class=\"desc\">\n" +
    "            <strong>Giữ khoản thanh toán an toàn</strong>\n" +
    "            <br>Cho đến khi bạn xác nhận đã hài lòng với món hàng nhận được.\n" +
    "        </span>\n" +
    "    </div>\n" +
    "    <div class=\"holderSamePrice\">\n" +
    "\n" +
    "\n" +
    "        <div class=\"pro_sameprice\">\n" +
    "            <h2>Sản phẩm đồng giá</h2>\n" +
    "            <div class=\"samepricenum\">\n" +
    "                <span>Giá:</span>~\n" +
    "                <span class=\"price\">250,000&nbsp;VNĐ</span>\n" +
    "            </div>\n" +
    "            <div class=\"block_pro\">\n" +
    "                <ul>\n" +
    "                    <li>\n" +
    "                        <h3>\n" +
    "                            <a title=\"VÍ NỮ\" class=\"title\" href=\"http://www.sendo.vn/thoi-trang-nu/phu-kien/vi/vi-nu-524235/\">\n" +
    "                                <div class=\"imgpro\">\n" +
    "                                    <img src=\"http://media3.sendo.vn/img/2014/2_20/vg07_01_2iiplmq3mmldk_simg_4b5ac4_80x80_maxb.jpg\" alt=\"VÍ NỮ\" title=\"VÍ NỮ\">\n" +
    "                                </div>\n" +
    "                                <div class=\"textpro\">VÍ NỮ</div>\n" +
    "                            </a>\n" +
    "                        </h3>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <h3>\n" +
    "                            <a title=\"Ví Cầm Tay Dự Tiệc\" class=\"title\" href=\"http://www.sendo.vn/thoi-trang-nu/phu-kien/vi/vi-cam-tay-du-tiec-512898/\">\n" +
    "                                <div class=\"imgpro\">\n" +
    "                                    <img src=\"http://media3.sendo.vn/img/2014/2_12/vi_cam_tay_2ihko8m9ds8h4_simg_4b5ac4_80x80_maxb.jpg\" alt=\"Ví Cầm Tay Dự Tiệc\" title=\"Ví Cầm Tay Dự Tiệc\">\n" +
    "                                </div>\n" +
    "                                <div class=\"textpro\">Ví Cầm Tay Dự Tiệc</div>\n" +
    "                            </a>\n" +
    "                        </h3>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <h3>\n" +
    "                            <a title=\"Ví cầm tay thời trang phong cách Hàn Quốc - T13\" class=\"title\" href=\"http://www.sendo.vn/thoi-trang-nu/phu-kien/vi/vi-cam-tay-thoi-trang-phong-cach-han-quoc-t13-501785/\">\n" +
    "                                <div class=\"imgpro\">\n" +
    "                                    <img src=\"http://media3.sendo.vn/img/2014/1_15/vi_chanel_2__2idgtpj4i1fj4_simg_4b5ac4_80x80_maxb.jpg\" alt=\"Ví cầm tay thời trang phong cách Hàn Quốc - T13\" title=\"Ví cầm tay thời trang phong cách Hàn Quốc - T13\">\n" +
    "                                </div>\n" +
    "                                <div class=\"textpro\">Ví cầm tay thời trang phong cách Hàn Quốc - T13</div>\n" +
    "                            </a>\n" +
    "                        </h3>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <h3>\n" +
    "                            <a title=\"Ví cầm tay \" class=\"title\" href=\"http://www.sendo.vn/thoi-trang-nu/phu-kien/vi/vi-cam-tay-441725/\">\n" +
    "                                <div class=\"imgpro\">\n" +
    "                                    <img src=\"http://media3.sendo.vn/img/2013/12_9/63609029_02_2i86m9ccrlbop_simg_4b5ac4_80x80_maxb.jpg\" alt=\"Ví cầm tay \" title=\"Ví cầm tay \">\n" +
    "                                </div>\n" +
    "                                <div class=\"textpro\">Ví cầm tay</div>\n" +
    "                            </a>\n" +
    "                        </h3>\n" +
    "                    </li>\n" +
    "                    <li>\n" +
    "                        <h3>\n" +
    "                            <a title=\"Ví nữ Bovi's sành điệu ,cá tính VNB1 \" class=\"title\" href=\"http://www.sendo.vn/thoi-trang-nu/phu-kien/vi/vi-nu-bovis-sanh-dieu-ca-tinh-vnb1-407875/\">\n" +
    "                                <div class=\"imgpro\">\n" +
    "                                    <img src=\"http://media3.sendo.vn/img/2013/11_28/798866808_445528990_574_574_2i6ihdggmcj0q_simg_4b5ac4_80x80_maxb.jpg\" alt=\"Ví nữ Bovi's sành điệu ,cá tính VNB1 \" title=\"Ví nữ Bovi's sành điệu ,cá tính VNB1 \">\n" +
    "                                </div>\n" +
    "                                <div class=\"textpro\">Ví nữ Bovi's sành điệu ,cá tính VNB1</div>\n" +
    "                            </a>\n" +
    "                        </h3>\n" +
    "                    </li>\n" +
    "                    <div class=\"cls\"></div>\n" +
    "                </ul>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"holderHotSale\">\n" +
    "        <div class=\"products-in-shop\">\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("detail/detail.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("detail/detail.tpl.html",
    "<div id=\"container-wrapper\" class=\"\" ng-if=\"exist\">\n" +
    "    <div class=\"container-page\">\n" +
    "        <!--DETAIL PAGE-->\n" +
    "        <div class=\"detail-container\">\n" +
    "            <div class=\"col-main \">\n" +
    "                <div id=\"messages_product_view\"></div>\n" +
    "                <!--product view-->\n" +
    "                <div itemscope=\"\" class=\"product-view\">\n" +
    "                    <div class=\"product-essential\">\n" +
    "                        <div class=\"cls\"></div>\n" +
    "                        <div class=\"product-shop\" ng-class=\"{'for-pkcn': technical}\">\n" +
    "                            <div class=\"product-name\">\n" +
    "                                <div itemprop=\"name\">\n" +
    "                                    <h1>{{product.name}}</h1>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                            <div class=\"price_status\">\n" +
    "                                <div class=\"price-box\">\n" +
    "                                    <meta content=\"VND\" itemprop=\"currency\">\n" +
    "                                    <p class=\"old-price hasPromotion\">\n" +
    "                                        <span class=\"price-label\">Giá:</span>\n" +
    "                                        <span id=\"product-price-524935\" class=\"regular-price none\">\n" +
    "                                            <span itemprop=\"price\" class=\"no-display\">{{product.newPrice}}</span>\n" +
    "                                            <span class=\"price\">{{product.newPrice}}</span>\n" +
    "                                        </span>\n" +
    "                                    </p>\n" +
    "                                </div>\n" +
    "                                <!-- kho hang -->\n" +
    "                                <div class=\"kho-hang\">\n" +
    "                                    <label>Kho hàng:</label>\n" +
    "                                    <span class=\"kh\">{{product.inventory}}</span>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                            <div class=\"box-pvc\">\n" +
    "                                <div class=\"shop-free-detail\" ng-show='product.discount'>\n" +
    "                                    <span class=\"shop-free-label\">Shop\n" +
    "                                        <strong class=\"green-mp\">hỗ trợ</strong>vận chuyển:</span>\n" +
    "                                    <br>\n" +
    "                                    <div class=\"shop-free-cont\">\n" +
    "                                        <div class=\"ship-info-txt\">\n" +
    "                                            <span ng-repeat=\"free in product.discount\">\n" +
    "                                                <strong class=\"bg\">{{free.level}}</strong>:\n" +
    "                                                <strong>{{free.discount}}</strong>cho đơn hàng từ\n" +
    "                                                <strong>{{free.costBill}}</strong>trở lên.</span>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                                <span itemprop=\"seller\" class=\"no-display\"></span>\n" +
    "\n" +
    "                            </div>\n" +
    "\n" +
    "                            <div class=\"cls\"></div>\n" +
    "\n" +
    "                            <div class=\"product_options\" ng-class=\"{'product-options-tech': technical}\">\n" +
    "                                <span itemtype=\"#\" itemscope=\"\" itemprop=\"offerDetails\">\n" +
    "                                    <span itemprop=\"seller\" class=\"no-display\"></span>\n" +
    "                                </span>\n" +
    "                                <div class=\"cls\"></div>\n" +
    "                                <div ng-class=\"{'box-attr': !technical, 'attribute-origin-tech': technical}\">\n" +
    "                                    <div class=\"box-att-content\">\n" +
    "                                        <div ng-show=\"product.attrs['colors']\">\n" +
    "                                            <div class=\"label\">Màu sắc:</div>\n" +
    "                                            <div class=\"b_in_se\">\n" +
    "                                                <select name=\"options[4415527][]\" ng-model=\"current_color\" ng-options=\"color for color in product.attrs['colors']\">\n" +
    "                                                </select>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                        <div ng-show=\"product.attrs['size']\">\n" +
    "                                            <div class=\"label\">Size</div>\n" +
    "                                            <div class=\"b_in_se\">\n" +
    "                                                <select name=\"options[4415527][]\" ng-model=\"current_color\" ng-options=\"color for color in product.attrs['size']\">\n" +
    "                                                </select>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                                <div class=\"attribute-origin-tech\">\n" +
    "                                    <div class=\"box-att-content\" ng-repeat=\"info in product.digitalInfoInventory\">\n" +
    "                                        <div class=\"label\">{{info.label}}</div>\n" +
    "                                        <div class=\"b_in_se\">{{info.binse}}</div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                                <div class=\"quantity\">\n" +
    "                                    <div class=\"box-sl\">\n" +
    "                                        <label class=\"label_detail\">Số lượng:</label>\n" +
    "                                        <input class=\"require\" type=\"text\" onkeypress=\"return checkNumber(this, event)\" title=\"Số lượng\" value=\"1\" maxlength=\"12\" id=\"qty\" name=\"qty\">\n" +
    "                                        <span class=\"goods-num\">\n" +
    "                                        </span>\n" +
    "                                        <span class=\"name\">(Cái)</span>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"product-img-box\">\n" +
    "                            <div class=\"img-zoom-83\">\n" +
    "                                <div class=\"clearfix p_10 \">\n" +
    "                                    <a title=\"\" rel=\"gal1\" class=\"jqzoom\" href=\"http://media3.sendo.vn/img/2014/2_20/vg06_01_2iirceq9j6h59_simg_nc_380a4d_460x640_maxb.jpg\" style=\"outline-style: none; text-decoration: none;\">\n" +
    "                                        <div class=\"zoomPad\">\n" +
    "                                            <img title=\"VÍ NỮ\" alt=\"VÍ NỮ\" ng-src=\"{{product.href}}\" itemprop=\"image\" style=\"opacity: 1;\">\n" +
    "                                            <div class=\"zoomPup\" style=\"top: 169px; left: -1px; width: 156px; height: 150px; position: absolute; border-width: 1px; opacity: 1; display: none;\">\n" +
    "                                                <img ng-src=\"http://media3.sendo.vn/img/2014/2_20/vg06_01_2iirceq9j6h59_simg_nc_65e188_240x320_maxb.jpg\" style=\"position: absolute; display: block; left: 0px; top: -170px;\">\n" +
    "                                            </div>\n" +
    "                                            <div class=\"zoomWindow\" style=\"position: absolute; z-index: 5001; left: 250px; top: 0px; display: none;\">\n" +
    "                                                <div class=\"zoomWrapper\" style=\"width: 300px;\">\n" +
    "                                                    <div class=\"zoomWrapperTitle\" style=\"width: 100%; position: absolute; display: block;\">VÍ NỮ</div>\n" +
    "                                                    <div class=\"zoomWrapperImage\" style=\"width: 100%; height: 300px;\">\n" +
    "                                                        <img ng-src=\"http://media3.sendo.vn/img/2014/2_20/vg06_01_2iirceq9j6h59_simg_nc_380a4d_460x640_maxb.jpg\" style=\"position: absolute; border: 0px; display: block; left: 0px; top: -340px;\">\n" +
    "                                                    </div>\n" +
    "                                                </div>\n" +
    "                                            </div>\n" +
    "                                            <div class=\"zoomPreload\" style=\"visibility: hidden; top: 138.5px; left: 75px; position: absolute;\">Loading zoom</div>\n" +
    "                                        </div>\n" +
    "                                    </a>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"cls\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div ng-if=\"!exist\">\n" +
    "    <h1 style=\"text-align:center\">item not found</h1>\n" +
    "</div>\n" +
    "");
}]);

angular.module("home/home.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home/home.tpl.html",
    "<div class=\"container-page col1-layout\">\n" +
    "    <div class=\"std\">\n" +
    "        <!--CONTAINER-->\n" +
    "        <div id=\"container-wrapper\">\n" +
    "            <div class=\"container\">\n" +
    "                <div class=\"home-page\">\n" +
    "                    <div sendo-left></div>\n" +
    "                    <div sendo-right></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("shop-free-detail/shop-free-detail.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("shop-free-detail/shop-free-detail.tpl.html",
    "<div class=\"shop-free-detail\"  ng-show='discount'>\n" +
    "  <span class=\"shop-free-label\">Shop\n" +
    "    <strong class=\"green-mp\">hỗ trợ</strong>vận chuyển:</span>\n" +
    "  <br>\n" +
    "  <div class=\"shop-free-cont\">\n" +
    "    <div class=\"ship-info-txt\">\n" +
    "      <span>\n" +
    "        <strong class=\"bg\">{{free.level}}</strong>:\n" +
    "        <strong>{{free.discount}}</strong>cho đơn hàng từ\n" +
    "        <strong>{{free.costBill}}</strong>trở lên.</span>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<span itemprop=\"seller\" class=\"no-display\"></span>\n" +
    "");
}]);
