var styles = [];
var key = "";
var isSearching = false;
var minPrice = 0, maxPrice = 10000000000;
$(document).ready(function() {
    fetch('http://localhost:3030/api/style', {
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
        styles = result;
        search();
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
    });
});

//click on homepage
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

    $(document).on('input', '.price', function(event) {
        var inputValue = $(this).val();

        $(this).val(formatNumber(inputValue));
    });

    $(document).on('input', '#min_price', function() {
        var minPriceInput = parseInt($(this).val().replace(/\s/g, ''), 10);
        if ($(this).val() == '') {
            minPriceInput = 0;
        }
        if (!isNaN(minPriceInput)) {
            minPrice = minPriceInput;
        }
    });

    $(document).on('input', '#max_price', function() {
        var maxPriceInput = parseInt($(this).val().replace(/\s/g, ''), 10);
        if ($(this).val() == '') {
            maxPriceInput = 10000000000;
        }
        if (!isNaN(maxPriceInput)) {
            maxPrice = maxPriceInput;
        }
    });
});

function showData(data, style, quantityPage) {
    if (!data.length) {
        return;
    }

    var headerTableHTML = `
        <tr class="header-table" id="header_table_${ style.idStyle }">
            <th class="website">Website</th>
            <th class="adsPosition">Vị trí</th>
            <th class="dimensions">Kích thước</th>
            <th class="platform">Nền tảng</th>
            <th class="demo">Demo</th>
            <th class="col1">${ style.detailCol1 }</th>
            <th class="col2">${ style.detailCol2 }</th>
            <th class="col3">${ style.detailCol3 }</th>
            <th class="col4">${ style.detailCol4 }</th>
            <th class="col5">${ style.detailCol5 }</th>
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
    var rowspanWebsite = 0, rowspanPosition = 0, rowspanPlatform = 0, rowspanDemo = 0;

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
        }
        rowspanWebsite = 0;
        
        // merge adsPosition and dimensions
        while(i + rowspanPosition < data.length && data[i + rowspanPosition].adsPosition == data[i].adsPosition && data[i + rowspanPosition].dimensions == data[i].dimensions && data[i + rowspanPosition].website == data[i].website) {
            rowspanPosition ++;
        }
        var setPositionDimensionsHTML = ``;
        if (data[i-1] && data[i-1].adsPosition == data[i].adsPosition && data[i-1].dimensions == data[i].dimensions && data[i-1].website == data[i].website) {
            setPositionDimensionsHTML =  ``;
        } else {
            setPositionDimensionsHTML = `<td class="adsPosition" rowspan="${ rowspanPosition }">${ data[i].adsPosition }</td>
                                        <td class="dimensions" rowspan="${ rowspanPosition }">${ data[i].dimensions }</td>`;
        }
        rowspanPosition = 0;

        // merge platform
        while(i + rowspanPlatform < data.length && data[i + rowspanPlatform].platform == data[i].platform && data[i + rowspanPlatform].website == data[i].website) {
            rowspanPlatform ++;
        }
        var setPlatformHTML = ``;
        if (data[i-1] && data[i-1].platform == data[i].platform && data[i-1].website == data[i].website) {
            setPlatformHTML =  ``;
        } else {
            setPlatformHTML = `<td class="platform" rowspan="${ rowspanPlatform }">${ data[i].platform }</td>`;
        }
        rowspanPlatform = 0;

        // merge demo
        while(i + rowspanDemo < data.length && data[i + rowspanDemo].linkDemo == data[i].linkDemo) {
            rowspanDemo ++;
        }
        var setDemoHTML = ``;
        if (data[i-1] && data[i-1].linkDemo == data[i].linkDemo) {
            setDemoHTML =  ``;
        } else {
            setDemoHTML = `<td class="demo" rowspan="${ rowspanDemo }"><div>${ setDemo }</div></td>`;
        }
        rowspanDemo = 0;

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
        fetch(`http://localhost:3030/api/rows-style?idStyle=${ styles[i].idStyle }&key=${ encodeURIComponent(key) }&minPrice=${ minPrice }&maxPrice=${ maxPrice }`, {
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
            var quantityPage = result.quantityPage;
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
    fetch(`http://localhost:3030/api/rows-style?idStyle=${ idStyle }&key=${ encodeURIComponent(key) }&page=${ page }&minPrice=${ minPrice }&maxPrice=${ maxPrice }`, {
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
            var data = result.data;

            var currentWebsite = "";
            var rowspanWebsite = 0, rowspanPosition = 0, rowspanPlatform = 0, rowspanDemo = 0;

            var style = styles[idStyle - 1]

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
                }
                rowspanWebsite = 0;
                
                // merge adsPosition and dimensions
                while(i + rowspanPosition < data.length && data[i + rowspanPosition].adsPosition == data[i].adsPosition && data[i + rowspanPosition].dimensions == data[i].dimensions && data[i + rowspanPosition].website == data[i].website) {
                    rowspanPosition ++;
                }
                var setPositionDimensionsHTML = ``;
                if (data[i-1] && data[i-1].adsPosition == data[i].adsPosition && data[i-1].dimensions == data[i].dimensions && data[i + rowspanPosition].website == data[i].website) {
                    setPositionDimensionsHTML =  ``;
                } else {
                    setPositionDimensionsHTML = `<td class="adsPosition" rowspan="${ rowspanPosition }">${ data[i].adsPosition }</td>
                                                <td class="dimensions" rowspan="${ rowspanPosition }">${ data[i].dimensions }</td>`;
                }
                rowspanPosition = 0;
        
                // merge platform
                while(i + rowspanPlatform < data.length && data[i + rowspanPlatform].platform == data[i].platform && data[i + rowspanPlatform].website == data[i].website) {
                    rowspanPlatform ++;
                }
                var setPlatformHTML = ``;
                if (data[i-1] && data[i-1].platform == data[i].platform && data[i-1].website == data[i].website) {
                    setPlatformHTML =  ``;
                } else {
                    setPlatformHTML = `<td class="platform" rowspan="${ rowspanPlatform }">${ data[i].platform }</td>`;
                }
                rowspanPlatform = 0;
        
                // merge demo
                while(i + rowspanDemo < data.length && data[i + rowspanDemo].linkDemo == data[i].linkDemo) {
                    rowspanDemo ++;
                }
                var setDemoHTML = ``;
                if (data[i-1] && data[i-1].linkDemo == data[i].linkDemo) {
                    setDemoHTML =  ``;
                } else {
                    setDemoHTML = `<td class="demo" rowspan="${ rowspanDemo }"><div>${ setDemo }</div></td>`;
                }
                rowspanDemo = 0;
        
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
                $(`#table_${ style.idStyle } tbody`).append(row);
            
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
