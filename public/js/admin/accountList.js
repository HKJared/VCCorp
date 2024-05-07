var key = "";
const token = localStorage.getItem('jwtToken');

$(document).ready(function() {
    search();

    fetch(`http://localhost:3030/api/authentication?token=${ token }`, {
        method: "GET",
        headers: {
            "Content-Type" : "application/json"
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
        console.log(result.role)
        if (result.role == 1) {
            $('.add-new-account').append('<i class="fa-solid fa-user-plus"></i>').css('display', 'flex');;
        }
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
    });
});

function showData(data) {
    if (!data.length) {
        showNotification("Không có website")
        return
    }

    let header_table_HTML = `
    <tr>
        <th>ID</th>
        <th>Họ và tên</th>
        <th>Tên tài khoản</th>
        <th>Password</th>
        <th></th>
        <th>Action</th>
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
    fetch(`http://localhost:3030/api/accounts?key=${ key }`, {
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