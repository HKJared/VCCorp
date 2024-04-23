window.showData = (data = [], style) => {
    if (!data.length) {
        return 
    }

    var headerTableHTML = `
    <div class="header-table" id="header_table_${ style.idStyle }">
        <div class="website">Website</div>
        <div class="adsPosition">Vị trí</div>
        <div class="dimensions">Kích thước</div>
        <div class="platform">Nền tảng</div>
        <div class="demo">Demo</div>
        <div class="col1">${ style.detailCol1 }</div>
        <div class="col2">${ style.detailCol2 }</div>
        <div class="col3">${ style.detailCol3 }</div>
        <div class="col4">${ style.detailCol4 }</div>
        <div class="col5">${ style.detailCol5 }</div>
        <div class="action"></div>
    </div>
    `;

    $(`#table_${ style.idStyle }`).append(headerTableHTML);

    var row = ``;
    var currentWebsite = ``;

    for (let i = 0; i < data.length; i++) {
        if (data.website != currentWebsite) {
            var headerWebsiteHTML = `
            <div class="header-website" id="header_table_${ data[i].website }" data-link="${ data[i].url }" title="${ data[i].url }">${ data[i].website.toUpperCase() }</div>
            `;
            $(`#table_${ style.idStyle }`).append(headerWebsiteHTML);
        }

        var demos = data[i].demo.split('\n');
        var links = data[i].linkDemo.split('\n');
        var setDemo = ``;

        for (let j = 0; j < demos.length; j++) {
            setDemo += `
                <div class="linkdemo" data-link="${ links[j] }">${ demos[j] }</div>
            `;
        }

        row = `
        <div class="row-table">
            <div class="website" data-link="${ data[i].url }" title="${ data[i].url }">${ data[i].website }</div>
            <div class="adsPosition">${ data[i].adsPosition }</div>
            <div class="dimensions">${ data[i].dimensions }</div>
            <div class="platform">${ data[i].platform }</div>
            <div class="demo">${ setDemo }</div>
            <div class="col1">${ data[style.col1] }</div>
            <div class="col2">${ data[style.col2] }</div>
            <div class="col3">${ data[style.col3] }</div>
            <div class="col4">${ data[style.col4] }</div>
            <div class="col5">${ data[style.col5] }</div>
            <div class="action">
                <button class="updateBtn"><i class="fa-solid fa-pen"></i></button>
                <button class="deleteBtn" data-idRow="${ data.idRow }"><i class="fa-solid fa-circle-minus"></i></button>
            </div>
        </div>
        `;

        $(`#table_${ style.idStyle }`).append(row);
    }
}

window.showNotification = (message) => {
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

