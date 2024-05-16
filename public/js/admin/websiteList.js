var key = "";
var user_role;
var skipConfirm = false;
var img = `/image/website-image/Img.png`; //ảnh mặc định cho website

const token = localStorage.getItem('jwtToken');

// hàm hoạt động khi trang vừa được load
$(document).ready(function() {
    // Nếu là super_admin thì cho cung cấp thêm nút xóa
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
        user_role = result.role;
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
    });

    search();
});

// hàm hoạt động khi có sự kiện ở window
$(document).ready(function() {
    $(document).on('input', 'input', function(event) {
        event.stopPropagation();

        $(this).removeClass('warning-border')
    });

    $(document).on('click', '.to-top-btn', function(event) {
        event.stopPropagation();

        $('html, body').animate({scrollTop: 0}, 500);
    });

    $('#search_form').submit(function(event){
        event.preventDefault();
        key = $('#search_form input[type="text"]').val().toLowerCase();
        search();
    });

    var timeout;
    $(document).on('mouseover', '.tooltip-row .name', function () {
        timeout = setTimeout(() => {
            $(this).closest('tr').find('.tooltip').fadeIn();
        }, 500);
    }).on('mouseout', '.tooltip-row .name', function () {
        clearTimeout(timeout);
        $(this).closest('tr').find('.tooltip').fadeOut();
    });

    $(document).on('click', '.update-btn', function(event) {
        event.stopPropagation();

        const idWebsite =$(this).data('idwebsite');

        fetch(`http://localhost:3030/api/website?idWebsite=${ idWebsite }`, {
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
            const data = result.data;

            let window_update_HTML = `
            <button class="Xbutton"><i class="fa-solid fa-xmark"></i></button>
            <center><h3>Chỉnh sửa thông tin website</h3></center>
            <div class="update-container">
                <div class="update-body">
                    <label for="name">Tên website</label>
                    <input type="text" id="name" value="${ data.name }">
                    <label for="url">Đường dẫn</label>
                    <input type="text" id="url" value="${ data.url }">
                    <label for="description">Mô tả</label>
                    <textarea name="" id="description" cols="30" rows="10">${ data.description || '' }</textarea>
                    <label for="idStyle" class="option_label">Option được cung cấp <span><i class="fa-solid fa-circle-info"></i><ul class="tooltip-infor-option"></ul></span></label>
                    <select name="" id="idStyle">
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                        <option value="3">Option 3</option>
                        <option value="4">Option 4</option>
                        <option value="5">Option 5</option>
                        <option value="6">Option 6</option>
                    </select>
                </div>
                <div class="vertical-line"></div>
                <div class="view-tooltip">
                    <div class="image">
                        <img src="${ data.image || img }" alt="" id="previewImage">
                        <div class="change-img">
                            <label for="input_image" class="custom-file-upload"><i class="fa-solid fa-pen"></i></label>
                            <input type="file" id="input_image" name="file" accept="image/*">
                        </div>
                    </div>
                    <div class="description-tooltip"></div>
                    <span class="view-description">${ data.description || '' }</span>
                </div>
            </div>
            <button class="save-update-row" data-idstyle="${ data.idStyle }" data-idwebsite="${ data.idWebsite }">SAVE</button>
            `;
            $("body").children().not(".window, .notification").addClass("blur");
            $('.window').empty().append(window_update_HTML);

            let infor_option_HTML = `
            <li>Option 1: Cách tính giá, Trang chủ, Roadblock Xuyên site(Độc quyền ngày), CTR trung bình(%), Est.Traffic/Tuần/slot</li>
            <li>Option 2: Cách tính giá, ĐƠN GIÁ (VNĐ), CTR trung bình (%), Est Impression, Note</li>
            <li>Option 3: Cách tính giá, TRANG CHỦ(Đã bao gồm VAT), XUYÊN TRANG(Đã bao gồm VAT), CHUYÊN MỤC (*)(Đã bao gồm VAT), Est.Traffic</li>
            <li>Option 4: Cách tính giá, Trang chủ(Đã gồm VAT), Roadblock xuyên site(Độc quyền ngày)(Chưa gồm VAT), CTR trung bình (%), Est.Traffic</li>
            <li>Option 5: Tuần(Chia sẻ 3), Tháng(Chia sẻ 3), Quý(Chia sẻ 3), Est.CTR (%), Est. Traffic</li>
            <li>Option 6: Cách tính giá, TRANG CHỦ, XUYÊN TRANG CHI TIẾT, XUYÊN TRANG, Est Traffic</li>
            `;
            $('.tooltip-infor-option').append(infor_option_HTML);
            $(`#idStyle option[value="${ data.idStyle }"]`).prop('selected', true);

            $('.window').show();
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });
    });

    $(document).on('click', '.add-new-website', function(event) {
        event.stopPropagation();

        let window_update_HTML = `
            <button class="Xbutton"><i class="fa-solid fa-xmark"></i></button>
            <center><h3>Thêm website mới</h3></center>
            <div class="update-container">
                <div class="update-body">
                    <label for="name">Tên website</label>
                    <input type="text" id="name" value="" placeholder="Abc.com">
                    <label for="url">Đường dẫn</label>
                    <input type="text" id="url" value="" placeholder="http://abc.com">
                    <label for="description">Mô tả</label>
                    <textarea name="" id="description" cols="30" rows="10"></textarea>
                    <label for="idStyle" class="option_label">Option được cung cấp <span><i class="fa-solid fa-circle-info"></i><ul class="tooltip-infor-option"></ul></span></label>
                    <select name="" id="idStyle">
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                        <option value="3">Option 3</option>
                        <option value="4">Option 4</option>
                        <option value="5">Option 5</option>
                        <option value="6">Option 6</option>
                    </select>
                </div>
                <div class="vertical-line"></div>
                <div class="view-tooltip">
                    <div class="image">
                        <img src="${ img }" alt="" id="previewImage">
                        <div class="change-img">
                            <label for="input_image" class="custom-file-upload"><i class="fa-solid fa-pen"></i></label>
                            <input type="file" id="input_image" name="file" accept="image/*">
                        </div>
                    </div>
                    <div class="description-tooltip"></div>
                    <span class="view-description"></span>
                </div>
            </div>
            <button class="save-new-website" data-idstyle="">SAVE</button>
        `;
        $("body").children().not(".window, .notification").addClass("blur");
        $('.window').empty().append(window_update_HTML);

        let infor_option_HTML = `
        <li>Option 1: Cách tính giá, Trang chủ, Roadblock Xuyên site(Độc quyền ngày), CTR trung bình(%), Est.Traffic/Tuần/slot</li>
        <li>Option 2: Cách tính giá, ĐƠN GIÁ (VNĐ), CTR trung bình (%), Est Impression, Note</li>
        <li>Option 3: Cách tính giá, TRANG CHỦ(Đã bao gồm VAT), XUYÊN TRANG(Đã bao gồm VAT), CHUYÊN MỤC (*)(Đã bao gồm VAT), Est.Traffic</li>
        <li>Option 4: Cách tính giá, Trang chủ(Đã gồm VAT), Roadblock xuyên site(Độc quyền ngày)(Chưa gồm VAT), CTR trung bình (%), Est.Traffic</li>
        <li>Option 5: Tuần(Chia sẻ 3), Tháng(Chia sẻ 3), Quý(Chia sẻ 3), Est.CTR (%), Est. Traffic</li>
        <li>Option 6: Cách tính giá, TRANG CHỦ, XUYÊN TRANG CHI TIẾT, XUYÊN TRANG, Est Traffic</li>
        `;
        $('.tooltip-infor-option').append(infor_option_HTML);

        $('.window').show();
    });
});

// hàm hoạt động khi có sự kiện ở mini window
$(document).ready(function() {
    $(document).on('click', '.Xbutton', function(event) {
        event.stopPropagation();

        if (!skipConfirm) {
            if (!confirm("Bạn muốn tắt cửa sổ này khi chưa lưu thay đổi ?")) {
                return
            }
        }
    
        $('.window').empty().hide();
        $("body").children().removeClass("blur");
    });

    // show mô tả sang bên phải
    $(document).on('input', '#description', function() {
        let descriptionValue = $(this).val();
        $('.view-description').text(descriptionValue);
    });

    // upload ảnh
    $(document).on('change', '#input_image', function() {
        var file = this.files[0];
            if (file) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    $('#previewImage').attr('src', e.target.result).show();
                }
                reader.readAsDataURL(file);
            }
    });

    //save update
    $(document).on('click', '.save-update-row', function() {
        const idWebsite = $(this).data('idwebsite');
        const name = $('#name').val();
        const url = $('#url').val();
        const description = $('#description').val();
        const idStyle = $('#idStyle').val();
        const fileImage = $('#input_image').prop('files')[0];

        const dataUpdate = {
            idWebsite: idWebsite,
            name: name,
            url: url,
            description: description
        }

        if (checkWebsiteProperties(dataUpdate)) {
            showNotification('Hãy điền đầy đủ thông tin');

            return
        }

        if (!isValidURL(url)) {
            showNotification('Đường dẫn không hợp lệ');
            $('#url').addClass('warning-border');

            return
        }
        
        const formData = new FormData();
        formData.append('name', name);
        formData.append('url', url);
        formData.append('description', description);
        formData.append('idStyle', idStyle);
        formData.append('file_image', fileImage);

        updateWebsite(dataUpdate, formData);
    });

    $(document).on('click', '.save-new-website', function() {
        const name = $('#name').val();
        const url = $('#url').val();
        const description = $('#description').val();
        const idStyle = $('#idStyle').val();
        const image = $('#previewImage').attr('src');
        const fileImage = $('#input_image').prop('files')[0];

        const newWebsite = {
            idStyle: idStyle,
            name: name,
            url: url,
            description: description
        }

        if (isWebsiteInfoIncomplete(newWebsite)) {
            showNotification('Hãy điền đầy đủ thông tin');

            return
        }

        if (!isValidURL(url)) {
            showNotification('Đường dẫn không hợp lệ');
            $('#url').addClass('warning-border');

            return
        }

        if (image == img) {
            showNotification('Vui lòng chọn một ảnh');

            return
        }
        
        const formData = new FormData();
        formData.append('name', name);
        formData.append('url', url);
        formData.append('description', description);
        formData.append('idStyle', idStyle);
        formData.append('file_image', fileImage);

        creatNewWebsite(newWebsite, formData);
    });
})

function showData(data) {
    $('table thead').empty();
    $('table tbody').empty();
    $('table tfoot').empty();
    if (!data.length) {
        showNotification("Không có website")
        return
    }

    let header_table_HTML = `
    <tr>
        <th>ID</th>
        <th>Tên Website</th>
        <th>Đường dẫn</th>
        <th>Mô tả</th>
        <th>Action</th>
        <th></th>
    </tr>
    `;

    $('table thead').append(header_table_HTML);

    for (let i = 0; i < data.length; i++) {
        let deleteBtnHTML = (user_role == 'super_admin' ? `<button type="button" class="delete-btn" title="Xóa" data-idWebsite="${ data[i].idWebsite }"><i class="fa-solid fa-trash"></i></button>` : '');
        let row_table_HTML = `
        <tr class="tooltip-row" id="row_${ data[i].idWebsite }">
            <td class="id">${ data[i].idWebsite }</td>
            <td class="name">${ data[i].name }</td>
            <td class="url"><a href="${ data[i].url }" target="_blank">${ data[i].url }</a></td>
            <td class="description">${ data[i].description || "" }</td>
            <td class="action">
                <div class="action-container">
                    <button type="button" class="update-btn" title="Chỉnh sửa" data-idWebsite="${ data[i].idWebsite }"><i class="fa-solid fa-pen"></i></button>
                    ${ deleteBtnHTML }
                </div>
            </td>
            <td class="tooltip">
                <div>
                    <img src="${  data[i].image ?  data[i].image : img }" alt="" srcset="">
                    <span>${ data[i].description || "" }</span>
                </div>
            </td>
        </tr>
        `;

        $('table tbody').append(row_table_HTML);
    }
}

function search () {
    fetch(`http://localhost:3030/api/websites?key=${ key }`, {
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
        showData(result.data);
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

function creatNewWebsite (newWebsite, formData) {
    fetch(`http://localhost:3030/api/website`, {
        method: "POST",
        headers: {
            "authorization" : token
        },
        body: formData
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
        showNotification(result.message);

        skipConfirm = true;
        $('.Xbutton').click();
        skipConfirm = false;
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
    });
}

function updateWebsite (dataUpdate, formData) {
    fetch(`http://localhost:3030/api/website?idWebsite=${ dataUpdate.idWebsite }`, {
        method: "PUT",
        headers: {
            "authorization" : token
        },
        body: formData
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
        showNotification(result.message);

        skipConfirm = true;
        $('.Xbutton').click();
        skipConfirm = false;
    
        const $row = $(`#row_${dataUpdate.idWebsite}`);
        if ($row.length) {
            $row.find('.name').text(dataUpdate.name);
            $row.find('.url a').attr('href', dataUpdate.url).text(dataUpdate.url);
            $row.find('.description').text(dataUpdate.description);

            // Update any other fields if necessary, such as image source, etc.
            const $img = $row.find('.tooltip img');
            if ($img.length && result.image) {
                $img.attr('src', result.image);
            }
        }

        $row.addClass('highlight-yellow');

        var newPosition = $row.offset().top - 100;

        $('html, body').animate({ scrollTop: newPosition }, 1000, function() {
            setTimeout(function() {
                $row.removeClass('highlight-yellow');
            }, 2000); 
        });
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
    });
}

function isWebsiteInfoIncomplete(obj) {
    let result = false;
    for (let key in obj) {
        if (obj[key] === null || obj[key] === '') {
            result = true;
            $(`#${ key }`).addClass('warning-border')
        }
    }
    return result;
}

function isValidURL(url) {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
}