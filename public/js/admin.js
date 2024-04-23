var styles = [];
var key = "";
var isSearching = false;
var rowStyleHTML = [
    `
    <button class="Xbutton"><i class="fa-solid fa-xmark"></i></button>
    <div id="window_style_1">
        <div>
            <h3 class="website-name"></h3>
        </div>
        <div>
            <div class="window-child-left">
                <label for="adsPosition">Vị trí (*)</label>
                <input type="text" name="" id="adsPosition">
            </div>
            <div class="window-child-right">
                <label for="platform">Nền tảng</label>
                <select name="" id="platform">
                    <option value="PC">PC</option>
                    <option value="Mobile">Mobile</option>
                    <option value="PC & Mobile">PC & Mobile</option>
                </select>
            </div>
        </div>
        <div>
            <div>
                <label for="dimensions">Kích thước (*)</label>
                <textarea name="" id="dimensions" cols="30" rows="7"></textarea>
            </div>
        </div>
        <div>
            <div class="demo-container">
                <h3>DEMO (*)</h3>
                <div>
                    <input type="text" class="content" placeholder="Content">
                    <i class="fa-solid fa-link"></i>
                    <input class="link-demo" type="text" placeholder="Link demo">
                </div>
                <button class="add-demo" title="Thêm demo"><i class="fa-solid fa-plus"></i></button>
            </div>
        </div>
        <div>
            <div class="window-child-left">
                <label for="col1">Cách tính giá</label>
                <select name="" id="col1">
                    <option value="Độc quyền ngày">Độc quyền ngày</option>
                    <option value="Độc quyền/tuần">Độc quyền/tuần</option>
                    <option value="Độc quyền/tháng">Độc quyền/tháng</option>
                    <option value="Chia sẻ 3/ngày">Chia sẻ 3/ngày</option>
                    <option value="Chia sẻ 5/ngày">Chia sẻ 5/ngày</option>
                    <option value="Chia sẻ 3/tuần">Chia sẻ 3/tuần</option>
                    <option value="Chia sẻ 5/tuần">Chia sẻ 5/tuần</option>
                </select>
            </div>
            <div class="window-child-right">
                <label for="col2">Trang chủ</label>
                <input type="text" id="col2" class="price">
            </div>
        </div>
        <div>
            <div class="window-child-left">
                <label for="col3">Roadblock Xuyên site (Độc quyền ngày)</label>
                <input type="text" id="col3" class="price">
            </div>
            <div class="window-child-right">
                <label for="col4">CTR Trung bình (%)</label>
                <input type="text" id="col4" class="performance">
            </div>
        </div>
        <div>
            <div>
                <label for="col5">Est. Traffic/Tuần/slot</label>
                <input type="text" id="col5" class="performance">
            </div>
        </div>
    </div>
    <button class="save">SAVE</button>
    `,
    `
    <button class="Xbutton"><i class="fa-solid fa-xmark"></i></button>
    <div id="window_style_2">
        <div>
            <h3 class="website-name"></h3>
        </div>
        <div>
            <div class="window-child-left">
                <label for="adsPosition">Vị trí (*)</label>
                <input type="text" name="" id="adsPosition">
            </div>
            <div class="window-child-right">
                <label for="platform">Nền tảng</label>
                <select name="" id="platform">
                    <option value="PC">PC</option>
                    <option value="Mobile">Mobile</option>
                    <option value="PC & Mobile">PC & Mobile</option>
                </select>
            </div>
        </div>
        <div>
            <div>
                <label for="dimensions">Kích thước (*)</label>
                <textarea name="" id="dimensions" cols="30" rows="7"></textarea>
            </div>
        </div>
        <div>
            <div class="demo-container">
                <h3>DEMO (*)</h3>
                <div>
                    <input type="text" class="content" placeholder="Content">
                    <i class="fa-solid fa-link"></i>
                    <input class="link-demo" type="text" placeholder="Link demo">
                </div>
                <button class="add-demo" title="Thêm demo"><i class="fa-solid fa-plus"></i></button>
            </div>
        </div>
        <div>
            <div class="window-child-left">
                <label for="col1">Cách tính giá</label>
                <select name="" id="col1">
                    <option value="Độc quyền ngày">Độc quyền ngày</option>
                    <option value="Độc quyền/tuần">Độc quyền/tuần</option>
                    <option value="Độc quyền/tháng">Độc quyền/tháng</option>
                    <option value="Chia sẻ 3/ngày">Chia sẻ 3/ngày</option>
                    <option value="Chia sẻ 5/ngày">Chia sẻ 5/ngày</option>
                    <option value="Chia sẻ 3/tuần">Chia sẻ 3/tuần</option>
                    <option value="Chia sẻ 5/tuần">Chia sẻ 5/tuần</option>
                </select>
            </div>
            <div class="window-child-right">
                <label for="col2">Đơn giá (VNĐ)</label>
                <input type="text" id="col2" class="price">
            </div>
        </div>
        <div>
            <div class="window-child-left">
                <label for="col3">CTR trung bình (%)</label>
                <input type="text" id="col3" class="performance">
            </div>
            <div class="window-child-right">
                <label for="col4">Est Impression</label>
                <input type="text" id="col4" class="performance">
            </div>
        </div>
        <div>
            <div>
                <label for="col5">Note</label>
                <input type="text" id="col5">
            </div>
        </div>
    </div>
    <button class="save">SAVE</button>
    `,
    `
    <button class="Xbutton"><i class="fa-solid fa-xmark"></i></button>
    <div id="window_style_3">
        <div>
            <h3 class="website-name"></h3>
        </div>
        <div>
            <div class="window-child-left">
                <label for="adsPosition">Vị trí (*)</label>
                <input type="text" name="" id="adsPosition">
            </div>
            <div class="window-child-right">
                <label for="platform">Nền tảng</label>
                <select name="" id="platform">
                    <option value="PC">PC</option>
                    <option value="Mobile">Mobile</option>
                    <option value="PC & Mobile">PC & Mobile</option>
                </select>
            </div>
        </div>
        <div>
            <div>
                <label for="dimensions">Kích thước (*)</label>
                <textarea name="" id="dimensions" cols="30" rows="7"></textarea>
            </div>
        </div>
        <div>
            <div class="demo-container">
                <h3>DEMO (*)</h3>
                <div>
                    <input type="text" class="content" placeholder="Content">
                    <i class="fa-solid fa-link"></i>
                    <input class="link-demo" type="text" placeholder="Link demo">
                </div>
                <button class="add-demo" title="Thêm demo"><i class="fa-solid fa-plus"></i></button>
            </div>
        </div>
        <div>
            <div class="window-child-left">
                <label for="col1">Cách tính giá</label>
                <select name="" id="col1">
                    <option value="Độc quyền ngày">Độc quyền ngày</option>
                    <option value="Độc quyền/tuần">Độc quyền/tuần</option>
                    <option value="Độc quyền/tháng">Độc quyền/tháng</option>
                    <option value="Chia sẻ 3/ngày">Chia sẻ 3/ngày</option>
                    <option value="Chia sẻ 5/ngày">Chia sẻ 5/ngày</option>
                    <option value="Chia sẻ 3/tuần">Chia sẻ 3/tuần</option>
                    <option value="Chia sẻ 5/tuần">Chia sẻ 5/tuần</option>
                </select>
            </div>
            <div class="window-child-right">
                <label for="col2">Trang chủ (Đã bao gồm VAT)</label>
                <input type="text" id="col2" class="price">
            </div>
        </div>
        <div>
            <div class="window-child-left">
                <label for="col3">Xuyên trang (Đã bao gồm VAT)</label>
                <input type="text" id="col3" class="price">
            </div>
            <div class="window-child-right">
                <label for="col4">Chuyên mục (*) (Đã bao gồm VAT)</label>
                <input type="text" id="col4" class="price">
            </div>
        </div>
        <div>
            <div>
                <label for="col5">Est. Traffic</label>
                <input type="text" id="col5" class="performance">
            </div>
        </div>
    </div>
    <button class="save">SAVE</button>
    `,
    `
    <button class="Xbutton"><i class="fa-solid fa-xmark"></i></button>
    <div id="window_style_4">
        <div>
            <h3 class="website-name"></h3>
        </div>
        <div>
            <div class="window-child-left">
                <label for="adsPosition">Vị trí (*)</label>
                <input type="text" name="" id="adsPosition">
            </div>
            <div class="window-child-right">
                <label for="platform">Nền tảng</label>
                <select name="" id="platform">
                    <option value="PC">PC</option>
                    <option value="Mobile">Mobile</option>
                    <option value="PC & Mobile">PC & Mobile</option>
                </select>
            </div>
        </div>
        <div>
            <div>
                <label for="dimensions">Kích thước (*)</label>
                <textarea name="" id="dimensions" cols="30" rows="7"></textarea>
            </div>
        </div>
        <div>
            <div class="demo-container">
                <h3>DEMO (*)</h3>
                <div>
                    <input type="text" class="content" placeholder="Content">
                    <i class="fa-solid fa-link"></i>
                    <input class="link-demo" type="text" placeholder="Link demo">
                </div>
                <button class="add-demo" title="Thêm demo"><i class="fa-solid fa-plus"></i></button>
            </div>
        </div>
        <div>
            <div class="window-child-left">
                <label for="col1">Cách tính giá</label>
                <select name="" id="col1">
                    <option value="Độc quyền ngày">Độc quyền ngày</option>
                    <option value="Độc quyền/tuần">Độc quyền/tuần</option>
                    <option value="Độc quyền/tháng">Độc quyền/tháng</option>
                    <option value="Chia sẻ 3/ngày">Chia sẻ 3/ngày</option>
                    <option value="Chia sẻ 5/ngày">Chia sẻ 5/ngày</option>
                    <option value="Chia sẻ 3/tuần">Chia sẻ 3/tuần</option>
                    <option value="Chia sẻ 5/tuần">Chia sẻ 5/tuần</option>
                </select>
            </div>
            <div class="window-child-right">
                <label for="col2">Trang chủ (Đã bao gồm VAT)</label>
                <input type="text" id="col2" class="price">
            </div>
        </div>
        <div>
            <div class="window-child-left">
                <label for="col3">Roadblock Xuyên site (Độc quyền ngày) (Chưa gồm VAT)</label>
                <input type="text" id="col3" class="price">
            </div>
            <div class="window-child-right">
                <label for="col4">CTR Trung bình (%)</label>
                <input type="text" id="col4" class="performance">
            </div>
        </div>
        <div>
            <div>
                <label for="col5">Est. Traffic</label>
                <input type="text" id="col5" class="performance">
            </div>
        </div>
    </div>
    <button class="save">SAVE</button>
    `,
    `
    <button class="Xbutton"><i class="fa-solid fa-xmark"></i></button>
    <div id="window_style_6">
        <div>
            <h3 class="website-name"></h3>
        </div>
        <div>
            <div class="window-child-left">
                <label for="adsPosition">Vị trí (*)</label>
                <input type="text" name="" id="adsPosition">
            </div>
            <div class="window-child-right">
                <label for="platform">Nền tảng</label>
                <select name="" id="platform">
                    <option value="PC">PC</option>
                    <option value="Mobile">Mobile</option>
                    <option value="PC & Mobile">PC & Mobile</option>
                </select>
            </div>
        </div>
        <div>
            <div>
                <label for="dimensions">Kích thước (*)</label>
                <textarea name="" id="dimensions" cols="30" rows="7"></textarea>
            </div>
        </div>
        <div>
            <div class="demo-container">
                <h3>DEMO (*)</h3>
                <div>
                    <input type="text" class="content" placeholder="Content">
                    <i class="fa-solid fa-link"></i>
                    <input class="link-demo" type="text" placeholder="Link demo">
                </div>
                <button class="add-demo" title="Thêm demo"><i class="fa-solid fa-plus"></i></button>
            </div>
        </div>
        <div>
            <div class="window-child-left">
                <label for="col1">Tuần (Chia sẻ 3)</label>
                <input type="text" id="col1" class="price">
            </div>
            <div class="window-child-right">
                <label for="col2">Tháng (Chia sẻ 3)</label>
                <input type="text" id="col2" class="price">
            </div>
        </div>
        <div>
            <div class="window-child-left">
                <label for="col3">Quý (Chia sẻ 3)</label>
                <input type="text" id="col3" class="price">
            </div>
            <div class="window-child-right">
                <label for="col4">Est. CTR (%)</label>
                <input type="text" id="col4" class="performance">
            </div>
        </div>
        <div>
            <div>
                <label for="col5">Est. Traffic</label>
                <input type="text" id="col5" class="performance">
            </div>
        </div>
    </div>
    <button class="save">SAVE</button>
    `,
    
    `
    <button class="Xbutton"><i class="fa-solid fa-xmark"></i></button>
    <div id="window_style_5">
        <div>
            <h3 class="website-name"></h3>
        </div>
        <div>
            <div class="window-child-left">
                <label for="adsPosition">Vị trí (*)</label>
                <input type="text" name="" id="adsPosition">
            </div>
            <div class="window-child-right">
                <label for="platform">Nền tảng</label>
                <select name="" id="platform">
                    <option value="PC">PC</option>
                    <option value="Mobile">Mobile</option>
                    <option value="PC & Mobile">PC & Mobile</option>
                </select>
            </div>
        </div>
        <div>
            <div>
                <label for="dimensions">Kích thước (*)</label>
                <textarea name="" id="dimensions" cols="30" rows="7"></textarea>
            </div>
        </div>
        <div>
            <div class="demo-container">
                <h3>DEMO (*)</h3>
                <div>
                    <input type="text" class="content" placeholder="Content">
                    <i class="fa-solid fa-link"></i>
                    <input class="link-demo" type="text" placeholder="Link demo">
                </div>
                <button class="add-demo" title="Thêm demo"><i class="fa-solid fa-plus"></i></button>
            </div>
        </div>
        <div>
            <div class="window-child-left">
                <label for="col1">Cách tính giá</label>
                <select name="" id="col1">
                    <option value="Độc quyền ngày">Độc quyền ngày</option>
                    <option value="Độc quyền/tuần">Độc quyền/tuần</option>
                    <option value="Độc quyền/tháng">Độc quyền/tháng</option>
                    <option value="Chia sẻ 3/ngày">Chia sẻ 3/ngày</option>
                    <option value="Chia sẻ 5/ngày">Chia sẻ 5/ngày</option>
                    <option value="Chia sẻ 3/tuần">Chia sẻ 3/tuần</option>
                    <option value="Chia sẻ 5/tuần">Chia sẻ 5/tuần</option>
                </select>
            </div>
            <div class="window-child-right">
                <label for="col2">Trang chủ</label>
                <input type="text" id="col2" class="price">
            </div>
        </div>
        <div>
            <div class="window-child-left">
                <label for="col3">Xuyên trang chi tiết</label>
                <input type="text" id="col3" class="price">
            </div>
            <div class="window-child-right">
                <label for="col4">Xuyên trang</label>
                <input type="text" id="col4" class="price">
            </div>
        </div>
        <div>
            <div>
                <label for="col5">Est Traffic/Tuần/Slot</label>
                <input type="text" id="col5" class="performance">
            </div>
        </div>
    </div>
    <button class="save">SAVE</button>
    `
]

$(document).ready(function() {
    fetch('http://localhost:3030/api/style', {
        method: "GET",
        headers: {
            "Content-Type" : "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            showNotification(response.statusText)
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(result => {
        styles = result;
        search();
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
    });
});

// on homepage
$(document).ready(function() {
    $(document).on('click', '.logo-web', function(event) {
        event.stopPropagation();

        location.reload();
    });

    $(document).on('click', '.to-top-btn', function(event) {
        event.stopPropagation();

        $('html, body').animate({scrollTop: 0}, 500);
    });

    $(document).on('click', '.num-page-btn', function (event) {
        event.stopPropagation();

        var quantityPage = parseInt($(this).closest("table").find(".quantity-page").text());
        if (quantityPage == 1) {
            return
        }

        var numPageClick = parseInt($(this).text());
        if (numPageClick > quantityPage) {
            return
        }
        
        var currentPage = parseInt($(this).siblings(".active-page-button").text());
        if (numPageClick === currentPage) {
            return;
        }

        if (quantityPage <= 3 || numPageClick === 1 || numPageClick === quantityPage) {
            $(this).siblings("button").removeClass("active-page-button").addClass("pagination-button");
            $(this).removeClass("pagination-button").addClass("active-page-button");
        } else {
            var prevNum = numPageClick - 1;
            var nextNum = numPageClick + 1;
            
            $(this).closest(".pagination-button-container").find(".num-page-btn").each(function(index) {
                if (index === 0) {
                    $(this).text(prevNum).removeClass("active-page-button").addClass("pagination-button");
                } else if (index === 1) {
                    $(this).text(numPageClick).removeClass("pagination-button").addClass("active-page-button");
                } else {
                    $(this).text(nextNum).removeClass("active-page-button").addClass("pagination-button");
                }
            });
        }

        changePage($(this).closest("table"), numPageClick);
    });

    $(document).on('click', '.pre', function (event) {
        event.stopPropagation();

        var quantityPage = parseInt($(this).closest("table").find(".quantity-page").text());
        var currentPage = parseInt($(this).siblings(".active-page-button").text());
        if (quantityPage == 1 || currentPage == 1) {
            return
        }

        if (currentPage == 2) {
            $(this).closest(".pagination-button-container").find(".num-page-btn").each(function(index) {
                if (index === 0) {
                    $(this).removeClass("pagination-button").addClass("active-page-button");
                } else if (index === 1) {
                    $(this).removeClass("active-page-button").addClass("pagination-button");
                } else {
                    $(this).removeClass("active-page-button").addClass("pagination-button");
                }
            });
        } else {
            $(this).closest(".pagination-button-container").find(".num-page-btn").each(function(index) {
                if (index === 0) {
                    $(this).text(currentPage-2).removeClass("active-page-button").addClass("pagination-button");
                } else if (index === 1) {
                    $(this).text(currentPage-1).removeClass("pagination-button").addClass("active-page-button");
                } else {
                    $(this).text(currentPage).removeClass("active-page-button").addClass("pagination-button");
                }
            });
        }

        changePage($(this).closest("table"), currentPage - 1);
    });

    $(document).on('click', '.next', function (event) {
        event.stopPropagation();

        var quantityPage = parseInt($(this).closest("table").find(".quantity-page").text());
        var currentPage = parseInt($(this).siblings(".active-page-button").text());
        if (quantityPage == 1 || currentPage == quantityPage) {
            return
        }

        if (currentPage == quantityPage - 1) {
            $(this).closest(".pagination-button-container").find(".num-page-btn").each(function(index) {
                if (index === 0) {
                    $(this).removeClass("active-page-button").addClass("pagination-button");
                } else if (index === 1) {
                    $(this).removeClass("active-page-button").addClass("pagination-button");
                } else {
                    $(this).removeClass("pagination-button").addClass("active-page-button");
                }
            });
        } else {
            $(this).closest(".pagination-button-container").find(".num-page-btn").each(function(index) {
                if (index === 0) {
                    $(this).text(currentPage).removeClass("active-page-button").addClass("pagination-button");
                } else if (index === 1) {
                    $(this).text(currentPage+1).removeClass("pagination-button").addClass("active-page-button");
                } else {
                    $(this).text(currentPage+2).removeClass("active-page-button").addClass("pagination-button");
                }
            });
        }

        changePage($(this).closest("table"), currentPage + 1);
    });

    $(document).on('change', '#tableSelector', function() {
        var tableId = $(this).val();
        var tableOffset = $("#" + tableId).offset().top - 50; 
        $("html, body").animate({ scrollTop: tableOffset }, 500);
    });
    
    $('#search_form').submit(function(event){
        event.preventDefault();
        key = $('#search_form input[type="text"]').val().toLowerCase();
        search();
    });

    $(document).on('click', '.delete-btn', function (event) {
        event.stopPropagation();

        if (confirm('Confirm delete this row.')) {
            const idRow = $(this).data('idrow');
            const $deletedRow = $(this).closest('.row-table');
            const $table = $deletedRow.closest('table');

            fetch('http://localhost:3030/api/row', {
                method: 'DELETE',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({ idRow: idRow })
            })
            .then(response => {
                if (!response.ok) {
                    showNotification(response.statusText)
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(result => {
                var message = result.message;

                $deletedRow.remove();
                const $prevRow = $deletedRow.prev();
                const $nextRow = $deletedRow.next();
    
                if ($prevRow.hasClass('header-website') && $nextRow.hasClass('header-website')) {
                    $prevRow.remove();
                }
                if ($table.find('.row-table').length === 0) {
                    $table.remove();
                }

                showNotification(message);
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
        }
    });

    $('.price').on('input', function(event) {
        var inputValue = $(this).val();

        $(this).val(formatNumber(inputValue));
    });

    $(document).on('click', '.add-row', function(event) {
        event.stopPropagation();
    
        var idWebsite = $(this).data('idwebsite');
        var website = $(this).closest('.header-website').find('a').text();
        var idStyle = $(this).closest('.table').attr('id').replace("table_", "");

        $("body").children().not(".window, .notification").addClass("blur");

        $('.window').empty().append(rowStyleHTML[idStyle-1]);
        $('.window .website-name').text(website);
        $('.window').show();
    });
});

// on window
$(document).ready(function() {
    $(document).on('click', '.Xbutton', function(event) {
        event.stopPropagation();
    
        $('.window').empty().hide();
        $("body").children().removeClass("blur");
    });

    $(document).on('input', '.price', function(event) {
        var inputValue = $(this).val();

        $(this).val(formatNumber(inputValue));
    });

    $(document).on('click', '.add-demo', function(event) {
        event.stopPropagation();

        var newElement = `
            <div>
                <input type="text" class="content" placeholder="Content">
                <i class="fa-solid fa-link"></i>
                <input class="link-demo" type="text" placeholder="Link demo">
                <button class="remove-demo" title="Loại bỏ demo này"><i class="fa-solid fa-xmark"></i></button>
            </div>
        `;
        
        $(this).before(newElement);
    });

    $(document).on('click', '.remove-demo', function(event) {
        event.stopPropagation();
        
        $(this).closest('div').remove();
    });

    $(document).on('click', '.save', function() {
        var $data = $(this).siblings('div');
    
        var idStyle = $data.attr('id').replace('window_style_', '');
        var website = $data.find('.website-name').text().trim().toLowerCase();
        var adsPosition = $data.find('#adsPosition').val().trim();
        var dimensions = $data.find('#dimensions').val().trim();
        var platform = $data.find('#platform').val().trim();
        
        var col1 = getColumnData($data, '#col1') == "" ? null : getColumnData($data, '#col1');
        var col2 = getColumnData($data, '#col2') == "" ? null : getColumnData($data, '#col2');
        var col3 = getColumnData($data, '#col3') == "" ? null : getColumnData($data, '#col3');
        var col4 = getColumnData($data, '#col4') == "" ? null : getColumnData($data, '#col4');
        var col5 = getColumnData($data, '#col5') == "" ? null : getColumnData($data, '#col5');
    
        var demoContent = '';
        var linkDemo = '';
    
        $data.find('.demo-container > div').each(function() {
            var content = $(this).find('.content').val().trim();
            var link = $(this).find('.link-demo').val().trim();
            if (content !== '' && link !== '') {
                demoContent += content + '\n';
                linkDemo += link + '\n';
            }
        });
    
        if (adsPosition == '' || dimensions == '') {
            showNotification('Hãy điền các thông tin quan trọng');
            return
        }
    
        if (demoContent == '' || linkDemo == '') {
            showNotification('Hãy điền ít nhất một demo');
            return
        }
    
        var newRow = {
            idStyle: idStyle,
            website: website,
            adsPosition: adsPosition,
            dimensions: dimensions,
            platform: platform,
            demo: demoContent.trim(),
            linkDemo: linkDemo.trim(),
            col1: col1,
            col2: col2,
            col3: col3,
            col4: col4,
            col5: col5 
        }
    
        creatNewRow(newRow);
    }); 
});

function showData(data, style, quantityPage) {
    if (!data.length) {
        return;
    }

    var headerTableHTML = `
        <tr class="header-table" id="header_table_${ style.idStyle }">
            <th class="adsPosition">Vị trí</th>
            <th class="dimensions">Kích thước</th>
            <th class="platform">Nền tảng</th>
            <th class="demo">Demo</th>
            <th class="col1">${ style.detailCol1 }</th>
            <th class="col2">${ style.detailCol2 }</th>
            <th class="col3">${ style.detailCol3 }</th>
            <th class="col4">${ style.detailCol4 }</th>
            <th class="col5">${ style.detailCol5 }</th>
            <th class="action">Thao tác</th> 
        </tr>
    `;

    var footTableHTML = `
        <tr>    
            <td colspan="10">
                <div class="pagination-container">
                    <div class="pagination-button-container">
                        <button class="pagination-button pre"><i class="fa-solid fa-chevron-left"></i></button>
                        <button class="num-page-btn active-page-button">1</button>
                        <button class="num-page-btn pagination-button">2</button>
                        <button class="num-page-btn pagination-button">3</button>
                        <button class="pagination-button next"><i class="fa-solid fa-chevron-right"></i></button>
                    </div>
                    <form class="input-page">
                        <input type="text">
                        / <span class="quantity-page">${ quantityPage }</span> page
                        <button>Go</button>
                    </form>
                </div>
            </td>
        </tr>
    `;

    $(`#table_${ style.idStyle } thead`).append(headerTableHTML);

    $(`#table_${ style.idStyle } tfoot`).append(footTableHTML);

    var currentWebsite = "";

    for (let i = 0; i < data.length; i++) {
        if (data[i].website != currentWebsite) {            
            currentWebsite = data[i].website;

            var headerWebsiteHTML = `
                <tr class="header-website" id="header_table_${ data[i].website.toLowerCase().replace(/\./g, '') }">
                    <th colspan="10"><a href="${ data[i].url }" target="_blank" rel="noopener noreferrer" title="${ data[i].url }">${ data[i].website.toUpperCase() }</a>  <button class="add-row" data-idwebsite="${ data[i].idWebsite }" title="Thêm mới"><i class="fa-solid fa-plus"></i></button></th>
                </tr>
            `;
            $(`#table_${ style.idStyle } tbody`).append(headerWebsiteHTML);
        }

        var demos = data[i].demo.split('\n');
        var links = data[i].linkDemo.split('\n');
        var setDemo = "";
        for (let j = 0; j < demos.length; j++) {
            setDemo += `
                <div class="linkdemo"><a href="${ links[j] }" target="_blank" rel="noopener noreferrer">${ demos[j] }</a></div>
            `;
        }

        var row = `
        <tr class="row-table">
            <td class="adsPosition">${ data[i].adsPosition }</td>
            <td class="dimensions">${ data[i].dimensions }</td>
            <td class="platform">${ data[i].platform }</td>
            <td class="demo"><div>${ setDemo }</div></td>
            <td class="col1">${ data[i][style.col1] ? numterToString(data[i][style.col1]) : "" }</td>
            <td class="col2">${ data[i][style.col2] ? numterToString(data[i][style.col2]) : "" }</td>
            <td class="col3">${ data[i][style.col3] ? numterToString(data[i][style.col3]) : "" }</td>
            <td class="col4">${ data[i][style.col4] ? numterToString(data[i][style.col4]) : "" }</td>
            <td class="col5">${ data[i][style.col5] ? numterToString(data[i][style.col5]) : "" }</td>
            <td class="action">
                <div class="action-container">
                    <button type="button" class="update-btn" title="Chỉnh sửa"><i class="fa-solid fa-pen"></i></button>
                    <button type="button" class="delete-btn" title="Xóa" data-idRow="${ data[i].idRow }"><i class="fa-solid fa-trash"></i></button>
                </div>
            </td>
        </tr>
        `;
        $(`#table_${ style.idStyle } tbody`).append(row);
    
    }
}

function numterToString (num) {
    if (typeof(num) == 'number' || num.includes('000')) {
        return num.toString().replace(/[,. ]/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
    return num
}

function search () {
    $(".table").each(function() {
        $(this).find("thead").empty();
        $(this).find("tbody").empty();
        $(this).find("tfoot").empty();
    });

    for (let i = 0; i < styles.length; i++) {
        fetch(`http://localhost:3030/api/rows-style?idStyle=${ styles[i].idStyle }&key=${ encodeURIComponent(key) }`, {
            method: "GET",
            headers: {
                "Content-Type" : "application/json"
            }
        })
        .then(response => {
            if (!response.ok) {
                showNotification(response.statusText)
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(result => {
            var data = result.data;
            var quantityPage = result.quantityPage
            showData(data, styles[i], quantityPage);
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });
    }
}

function changePage (table, page) {

    var idStyle = table.attr('id').replace("table_", "");

    table.find("tbody").empty();
    fetch(`http://localhost:3030/api/rows-style?idStyle=${ idStyle }&key=${ encodeURIComponent(key) }&page=${ page }`, {
            method: "GET",
            headers: {
                "Content-Type" : "application/json"
            }
        })
        .then(response => {
            if (!response.ok) {
                showNotification(response.statusText)
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(result => {
            var data = result.data;

            for (let i = 0; i < data.length; i++) {
                if (data[i].website != currentWebsite) {            
                    currentWebsite = data[i].website;
        
                    var headerWebsiteHTML = `
                        <tr class="header-website" id="header_table_${ data[i].website }" title="${ data[i].url }">
                            <th colspan="10"><a href="${ data[i].url }" target="_blank" rel="noopener noreferrer">${ data[i].website.toUpperCase() }</a></th>
                        </tr>
                    `;
                    $(`#table_${ style.idStyle } tbody`).append(headerWebsiteHTML);
                }
        
                var demos = data[i].demo.split('\n');
                var links = data[i].linkDemo.split('\n');
                var setDemo = "";
                for (let j = 0; j < demos.length; j++) {
                    setDemo += `
                        <div class="linkdemo"><a href="${ links[j] }" target="_blank" rel="noopener noreferrer">${ demos[j] }</a></div>
                    `;
                }
        
                // merge website
                while(i + rowspanWebsite < data.length && data[i + rowspanWebsite].website == data[i].website) {
                    rowspanWebsite ++;
                }
        
                var setWebsiteHTML = ``
                if (data[i-1] && data[i-1].website == data[i].website) {
                    setWebsiteHTML =  ``;
                } else {
                    setWebsiteHTML = `<td class="website" rowspan="${ rowspanWebsite }" title="${ data[i].url }"><a href="${ data[i].url }" target="_blank" rel="noopener noreferrer">${ data[i].website }</a></td>`;
                    rowspanWebsite = 0;
                }
                
                // merge adsPosition and dimensions
                while(i + rowspanPosition < data.length && data[i + rowspanPosition].adsPosition == data[i].adsPosition) {
                    rowspanPosition ++;
                }
                var setPositionDimensionsHTML = ``;
                if (data[i-1] && data[i-1].adsPosition == data[i].adsPosition) {
                    setPositionDimensionsHTML =  ``;
                } else {
                    setPositionDimensionsHTML = `<td class="adsPosition">${ data[i].adsPosition }</td>
                                                <td class="dimensions">${ data[i].dimensions }</td>`;
                    rowspanPosition = 0;
                }
        
                // merge platform
                while(i + rowspanPlatform < data.length && data[i + rowspanPlatform].platform == data[i].platform) {
                    rowspanPlatform ++;
                }
                var setPlatformHTML = ``;
                if (data[i-1] && data[i-1].platform == data[i].platform) {
                    setPlatformHTML =  ``;
                } else {
                    setPlatformHTML = `<td class="platform" rowspan="${ rowspanPlatform }">${ data[i].platform }</td>`;
                    rowspanPlatform = 0;
                }
        
                // merge demo
                while(i + rowspanDemo < data.length && data[i + rowspanDemo].linkDemo == data[i].linkDemo) {
                    rowspanDemo ++;
                }
                var setDemoHTML = ``;
                if (data[i-1] && data[i-1].linkDemo == data[i].linkDemo) {
                    setDemoHTML =  ``;
                } else {
                    setDemoHTML = `<td class="demo" rowspan="${ rowspanDemo }"><div>${ setDemo }</div></td>`;
                    rowspanDemo = 0;
                }
        
                var row = `
                <tr class="row-table">
                    ${ setWebsiteHTML }
                    ${ setPositionDimensionsHTML }
                    ${ setPlatformHTML }
                    ${ setDemoHTML }
                    <td class="col1">${ data[i][style.col1] ? numterToString(data[i][style.col1]) : "" }</td>
                    <td class="col2">${ data[i][style.col2] ? numterToString(data[i][style.col2]) : "" }</td>
                    <td class="col3">${ data[i][style.col3] ? numterToString(data[i][style.col3]) : "" }</td>
                    <td class="col4">${ data[i][style.col4] ? numterToString(data[i][style.col4]) : "" }</td>
                    <td class="col5">${ data[i][style.col5] ? numterToString(data[i][style.col5]) : "" }</td>
                </tr>
                `;
                $(`#table_${ idStyle } tbody`).append(row);
            
            }
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });
}

function showNotification(message) {
    $('#notificationText').text(message);
    $('#notification').show();
    setTimeout(() => {
        setTimeout(() => {
            $('#notification').addClass('right-slide');
        }, 10);
    }, 10);
    setTimeout(() => {
        $('#notification').removeClass('right-slide'); 
        setTimeout(() => {
            $('#notification').hide(); 
        }, 500);
    }, 3000); 
}

function formatNumber(input) {
    var number = input.replace(/\D/g, '');

    var formattedNumber = number.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    return formattedNumber;
}

function getColumnData($container, columnSelector) {
    var columnData = $container.find(columnSelector).val().trim();
    if (columnData !== '' && $container.find(columnSelector).hasClass('price')) {
        columnData = columnData.replace(/\s+/g, '').replace(/[.,]/g, ''); 
    }
    return columnData;
}

function creatNewRow (newRow) {
    fetch('http://localhost:3030/api/row', {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body:JSON.stringify(newRow)
    })
    .then(response => {
        if (!response.ok) {
            showNotification(response.statusText)
            throw new Error('Network response was not ok');
            con
        }
        return response.json();
    })
    .then(result => {
        showNotification(result.message);

        $('.Xbutton').click();
    
        var demos = newRow.demo.split('\n');
        var links = newRow.linkDemo.split('\n');
        var setDemo = "";
        for (let j = 0; j < demos.length; j++) {
            setDemo += `
                <div class="linkdemo"><a href="${ links[j] }" target="_blank" rel="noopener noreferrer">${ demos[j] }</a></div>
            `;
        }

        var newRowHTML = `
        <tr class="row-table new-row">
            <td class="adsPosition">${newRow.adsPosition}</td>
            <td class="dimensions">${newRow.dimensions}</td>
            <td class="platform">${newRow.platform}</td>
            <td class="demo"><div>${ setDemo }</div></td>
            <td class="col1">${newRow.col1 ? numterToString(newRow.col1) : ""}</td>
            <td class="col2">${newRow.col2 ? numterToString(newRow.col2) : ""}</td>
            <td class="col3">${newRow.col3 ? numterToString(newRow.col3) : ""}</td>
            <td class="col4">${newRow.col4 ? numterToString(newRow.col4) : ""}</td>
            <td class="col5">${newRow.col5 ? numterToString(newRow.col5) : ""}</td>
            <td class="action">
                <div class="action-container">
                    <button type="button" class="update-btn" title="Chỉnh sửa"><i class="fa-solid fa-pen"></i></button>
                    <button type="button" class="delete-btn" title="Xóa" data-idRow="${ result.idNewRow }"><i class="fa-solid fa-trash"></i></button>
                </div>
            </td>
        </tr>
        `;

        $(newRowHTML).insertAfter(`#header_table_${ newRow.website.toLowerCase().replace(/\./g, '') }`);  

        $('.new-row').addClass('highlight');
    
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
    });

}