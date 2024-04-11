var noCur = 1;
$(document).ready(function() {
    showData();

    $('#search_form').submit(async function(event){
        event.preventDefault();
        search();
    });

});

async function showData () {
    fetch('http://localhost:3030/api/style', {
        method: 'GET',
        headers: {
            "Content-Type" : "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(result => {
        for (let i = 0; i < result.length; i++) {
            const style = result[i]

            const headerSheet = `
            <div class="sheet" id="sheet${ style.idStyle }">
                <div class="header-sheet">
                    <div class="website">Website</div>
                    <div class="adsPosition">Vị trí</div>
                    <div class="dimensions">Kích thước (px)</div>
                    <div class="platform">Nền tảng</div>
                    <div class="demo">Demo</div>
                    <div class="col1">${ style.detailCol1 }</div>
                    <div class="col2">${ style.detailCol2 }</div>
                    <div class="col3">${ style.detailCol3 }</div>
                    <div class="col4">${ style.detailCol4 }</div>
                    <div class="col5">${ style.detailCol5 }</div>
                </div>
            </div>
            `;
        
            $('.sheets-container').append(headerSheet);
        
            fetch(`http://localhost:3030/api/rows-style?idStyle=${ style.idStyle }`, {
                method: 'GET',
                headers: {
                    "Content-Type" : "application/json"
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(result2 => {
                var curWeb = '';
                for (let j = 0; j < result2.length; j++) {
                    if (result2[j].website != curWeb) {
                        curWeb = result2[j].website;
                        var headerWeb = `
                        <div class="headerWeb" data-link="https://${ curWeb.toLowerCase() }">${ curWeb.toUpperCase() }</div>
                        `;
                        $(`#sheet${ style.idStyle }`).append(headerWeb);
                    }

                    var setDemo = ``;
        
                    if (result2[j].demo) {
                        const demos = result2[j].demo.split('\n');
                        const links = result2[j].linkDemo.split('\n');
        
                        for (let k = 0; k < demos.length; k++) {
                            setDemo += `
                                <div class="linkdemo" data-link="${ links[k] }">${ demos[k] }</div>
                            `;
                        }
                    }

                    
                    const bodySheet = `
                        <div class="row-sheet">
                            <div class="website" data-link="https://${ result2[j].website.toLowerCase() }">${ result2[j].website }</div>
                            <div class="adsPosition">${ result2[j].adsPosition }</div>
                            <div class="dimensions">${ result2[j].dimensions }</div>
                            <div class="platform">${ result2[j].platform }</div>
                            <div class="demo">${ setDemo }</div>
                            <div class="col1">${ result2[j][style.col1] ? formatNumber(result2[j][style.col1]) : "" }</div>
                            <div class="col2">${ result2[j][style.col2] ? formatNumber(result2[j][style.col2]) : "" }</div>
                            <div class="col3">${ result2[j][style.col3] ? formatNumber(result2[j][style.col3]) : "" }</div>
                            <div class="col4">${ result2[j][style.col4] ? formatNumber(result2[j][style.col4]) : "" }</div>
                            <div class="col5">${ result2[j][style.col5] ? formatNumber(result2[j][style.col5]) : "" }</div>
                        </div>
                    `;
                    $(`#sheet${ style.idStyle }`).append(bodySheet);
                }

              
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
        }
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
    });

    $(document).on('click', '.headerWeb, .row-sheet .website, .linkdemo', function() {
        const link = $(this).data('link');
        if (link) {
            window.open(link, '_blank');
        }
    });
    
}

function formatNumber (num) {
    if (typeof(num) == "number") {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return num;
}

function search () {
    var searchValue = $('#search_form input[type="text"]').val().toLowerCase();
    $('.headerWeb').hide();
    $('.row-sheet').hide();
    $('.headerWeb').filter(function() {
        return $(this).text().toLowerCase().includes(searchValue); 
    }).show();
    $('.row-sheet .website').filter(function() {
        return $(this).text().toLowerCase().includes(searchValue); 
    }).closest('.row-sheet').show();
}

