$(document).ready(function() {
    $('.td.demo, .td.web').click(function() {
        var link = $(this).data('link');
        if (link) {
            window.open(link, '_blank');
        } else {
            alert('Link is not available!');
        }
    });

    $('#search_form').submit(function(event){
        event.preventDefault();
        search();
    });

    function search() {
        var searchValue = $('#search_form input[type="text"]').val().toLowerCase();
        $('.tbody .tr').hide();
        $('.tbody .header-web').hide();
        $('.tbody .tr .web[name*="' + searchValue + '"]').closest('.tr').show();
        $('.tbody .header-web:contains("' + searchValue + '")').show();
    }

    $('.td.detail').click(function(){
        var sheet = $(this).data('sheet');
        getDetail(sheet);
    });

    function getDetail(sheet) {

        var detailHTML = `
        <div class="detail-content">
            <div><center><strong>Detail</strong><center></div>
            <div class="">Website: ${ sheet.website }</div>
            <div class="ads-position">Tên vị trí: ${sheet.adsPosition }</div>
            <div class="plat-form">Nền tảng: ${sheet.platform }</div>
            <div class="buying-method">Cách tính giá: ${sheet.buyingMethod.replace(/[\u0000-\u001F]+/g, " - ") }</div>
            <hr>
            <div class="infor" style="display: flex;">
                <div class="price">
                    <h5>Đơn giá:</h5>
                    <div>Trang chủ: ${ sheet.homepage ? sheet.homepage.toLocaleString() : "" }</div>
                    <div>Xuyên trang: ${ sheet.crossSite ? sheet.crossSite.toLocaleString() : "" }</div>
                    <div>Xuyên trang chi tiết: ${ sheet.detailCrossSite ? sheet.detailCrossSite.toLocaleString() : "" }</div>
                    <div>Chuyên mục: ${ sheet.categories ? sheet.categories.toLocaleString() : "" }</div>
                </div>
                <div class="performance" style="margin-left: 100px;">
                    <h5>Hiệu suất:</h5>
                    <div>CTR Trung bình: ${ sheet.averageCTR ? sheet.averageCTR : "-" }</div>
                    <div>Est Traffic: ${ sheet.estTraffic ? sheet.estTraffic : "-" }</div>
                    <div>Est Impression: ${ sheet.estImpression ? sheet.estImpression : "-" }</div>
                    <div>Est CTR: ${ sheet.estCTR ? sheet.estCTR : "-" }</div>
                </div>
            </div>
        </div>
        <div class="Xbutton">
            <button id="Xbutton" type="button"><i class="fa-solid fa-xmark"></i></button>
        </div>
    `;
        $('.getDetail').html(detailHTML).show();

        $('#Xbutton').click(function() {
            $('.getDetail').empty().hide();
        });
    }

    $('.deleteBtn').click(async function() {
        if (confirm('Confirm to delete this line')) {
            const idRow = $(this).data('idrow');
            const data = {
                idRow: idRow
            }
            
            fetch('http://localhost:3030/api/delete-row', {
                method: 'DELETE',
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                return response.json(); 
            })
            .then(data => {
                if (data.message == 'Deleted.') {
                    $(this).closest('.tr').remove();
                }
                
                alert(data.message);
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
        }
    });
});
