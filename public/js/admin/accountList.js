var key = "";
const token = localStorage.getItem('jwtToken');

$(document).ready(function() {
    search(1); //ban đầu lấy dữ liệu với điều kiện mặc định

    fetch(`http://localhost:3030/api/authentication?token=${ token }`, {
        method: "GET",
        headers: {
            "Content-Type" : "application/json",
            "authorization" : token
        }
    })
    .then(response => {
        return response.json().then(data => {
            if (!response.ok) {
                showNotification(data.message);
                throw new Error('Network response was not ok');
            }
            return data;
        });
    })
    .then(result => {
        if (result.role == "super_admin") {
            var btnAddAccount = `<div class="add-new-account" title="Thêm tài khoản Data Admin"><i class="fa-solid fa-user-plus"></i></div>`;
            $('.nav-container').after(btnAddAccount);
        }
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
    });
});

// sự kiện ở màn hình chính
$(document).ready(function() {
    $('#search_form').submit(function(event){
        event.preventDefault();
        key = $('#search_form input[type="text"]').val().toLowerCase();
        search(1);
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

        search(numPageClick);
        $('html, body').animate({
            scrollTop: $(this).closest("table").offset().top - 50
        }, 'slow');
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

        search(currentPage - 1);
    });

    $(document).on('click', '.next', function (event) {
        event.stopPropagation();

        var quantityPage = parseInt($(this).closest("table").find(".quantity-page").text());
        var currentPage = parseInt($(this).siblings(".active-page-button").text());
        if (quantityPage == 1 || currentPage == quantityPage) {
            return
        }

        if (currentPage == quantityPage - 1 && quantityPage > 2) {
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

        search(currentPage + 1);
    });
});

// sự kiện ở cửa sổ
$(document).ready(function() {

});

function showData(data, quantityPage) {
    $('table tbody').empty();
    $('table tfoot').empty();
    if (!data.length) {
        showNotification("Không có tài khoản nào");
        return
    }

    var footTableHTML = `
        <tr>    
            <td colspan="5">
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

    $(`table tfoot`).append(footTableHTML);

    for (let i = 0; i < data.length; i++) {
        let row_table_HTML = `
        <tr class="tooltip-row" id="row_${ data[i].id_account }">
            <td class="id">${ data[i].id_account }</td>
            <td class="fullname">${ data[i].fullname }</td>
            <td class="user-name">${ data[i].user_name }</td>
            <td class="role">${ data[i].role }</td>
            <td class="action">
                <div class="action-container">
                    <button type="button" class="update-btn" title="Chỉnh sửa" data-idWebsite="${ data[i].id_account }"><i class="fa-solid fa-pen"></i></button>
                    <button type="button" class="delete-btn" title="Xóa" data-idWebsite="${ data[i].id_account }"><i class="fa-solid fa-trash"></i></button>
                </div>
            </td>
        </tr>
        `;

        $('table tbody').append(row_table_HTML);
    }
}

function search(page) {
    fetch(`http://localhost:3030/api/accounts?key=${ key }&page=${ page }`, {
        method: "GET",
        headers: {
            "Content-Type" : "application/json",
            "authorization" : token
        }
    })
    .then(response => {
        return response.json().then(data => {
            if (!response.ok) {
                showNotification(data.message);
                throw new Error('Network response was not ok');
            }
            return data;
        });
    })
    .then(result => {
        showData(result.data, result.quantityPage);
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