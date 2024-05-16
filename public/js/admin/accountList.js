var key = "";
const token = localStorage.getItem('jwtToken');

$(document).ready(function() {
    search();

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
        if (result.role != "super_admin") {
            $('.delete-btn').hide();
        }
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
    });
});

function showData(data) {
    if (!data.length) {
        showNotification("Không có tài khoản nào")
        return
    }

    let header_table_HTML = `
    <tr>
        <th>ID</th>
        <th>Họ và tên</th>
        <th>Tên tài khoản</th>
        <th>Role</th>
        <th>Action</th>
    </tr>
    `;

    $('table thead').append(header_table_HTML);

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

function search () {
    fetch(`http://localhost:3030/api/accounts?key=${ key }`, {
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