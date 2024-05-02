var key = "";
var img = `<img src="image/website-image/Img.png" alt="" srcset="">`;

$(document).ready(function() {
    search();

    $(document).on('click', '.to-top-btn', function(event) {
        event.stopPropagation();

        $('html, body').animate({scrollTop: 0}, 500);
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

        let window_update_HTML = `
        <button class="Xbutton"><i class="fa-solid fa-xmark"></i></button>
        <center><h3>Chỉnh sửa thông tin website</h3></center>
        <div class="update-container">
            <div class="update-body">
                <label for="name">Tên website</label>
                <input type="text" id="name">
                <label for="url">Đường dẫn</label>
                <input type="text" id="url">
                <label for="description">Mô tả</label>
                <textarea name="" id="description" cols="30" rows="10"></textarea>
                <label for="idStyle">Option được cung cấp</label>
                <select name="" id="idStyle">
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
            </div>
            <div class="vertical-line"></div>
            <div class="view-tooltip">
                <div class="image">
                    <img src="image/website-image/Img.png" alt="">
                </div>
                <div class="description-tooltip"></div>
                <span class="view-description">Mô tả</span>
            </div>
        </div>
        <button class="save-update-row" data-idstyle="" data-idrow="">SAVE</button>
        `;
        $("body").children().not(".window, .notification").addClass("blur");
        $('.window').empty().append(window_update_HTML);
        $('.window').show();
    });
});

$(document).ready(function() {
    $(document).on('input', '#description', function() {
        let descriptionValue = $(this).val();
        $('.view-description').text(descriptionValue);
    });
})

function showData(data) {
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
        let row_table_HTML = `
        <tr class="tooltip-row" id="row_${ data[i].idWebsite }">
            <td class="id">${ data[i].idWebsite }</td>
            <td class="name">${ data[i].name }</td>
            <td class="url">${ data[i].url }</td>
            <td class="description">${ data[i].description || "" }</td>
            <td class="action">
                <div class="action-container">
                    <button type="button" class="update-btn" title="Chỉnh sửa" data-idWebsite="${ data[i].idWebsite }"><i class="fa-solid fa-pen"></i></button>
                    <button type="button" class="delete-btn" title="Xóa" data-idWebsite="${ data[i].idWebsite }"><i class="fa-solid fa-trash"></i></button>
                </div>
            </td>
            <td class="tooltip">
                ${  data[i].image ?  `<img src="${ data[i].image }">` : img }
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
        showData(result);
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