$(document).ready(function() {
    $('#search_form').submit(async function(event){
        event.preventDefault();
        search();
    });

    async function search() {
        $('.tbody').empty();
        var searchValue = $('#search_form input[type="text"]').val().toLowerCase();
        if (searchValue) {
            const url = 'http://localhost:3030/api/rows?key=' + encodeURIComponent(searchValue);

            var statusFetch;
            fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => {
                statusFetch = response.status;
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); 
            })
            .then(data => {
                const arr = data.data;
                const arrLength = arr.length;
                if (arrLength) {
                    var tbodyHTML = '';
                    for (let i = 0; i < arrLength; i++) {
                        tbodyHTML = `
                        <div class="tr" data-idrow ="${ arr[i].idRow }">
                            <div class="td no">${ arr[i].no }</div>
                            <div class="td web" style="overflow-x: hidden;">${ arr[i].website }</div>
                            <div class="td adsPosition">${ arr[i].adsPosition }</div>
                            <div class="td dimensions" style="overflow-y: hidden;">${ arr[i].dimensions }</div>
                            <div class="td platform">${ arr[i].platform }</div>
                            <div class="td demo">${ arr[i].demo }</div>
                            <div class="td buyingMethod">${ arr[i].buyingMethod }</div>
                            <div class="td note">${ arr[i].note ? arr[i].note : "" }</div>
                        </div>
                        `;
                        $('.tbody').append(tbodyHTML);
                    }
                    $('.tbody .tr').click(function() {
                        const idRow = $(this).data('idrow')
                        getDetailRow(idRow);
                    })
                } else {
                    alert('No data matching.')
                }

            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
        }
    }

    async function getDetailRow (idRow) {
        if (idRow) {
            const url = 'http://localhost:3030/api/row?idRow=' + encodeURIComponent(idRow);

            var statusFetch;
            fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => {
                statusFetch = response.status;
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); 
            })
            .then(data => {
                const row = data.data;
                
                var rowHTML = `
                <div class="getDetaiRow-container">
                    <center><h3>Detail row</h3><center>
                    <div class="category">
                        <div class="no">No</div>
                        <div class="website">Website</div>
                        <div class="adsPosition">Tên vị trí</div>
                        <div class="dimensions">Kích thước (px)</div>
                        <div class="platform">Nền tảng</div>
                        <div class="demo">Demo</div>
                        <div class="buyingMethod">Cách tính giá</div>
                    </div>
                    <div class="detailCategory">
                        <div class="no">
                            <textarea>${ row.no }</textarea>
                        </div>
                        <div class="website">
                            <textarea>${ row.website }</textarea>
                        </div>
                        <div class="adsPosition">
                            <textarea>${ row.adsPosition }</textarea>
                        </div> 
                        <div class="dimensions">
                            <textarea>${ row.dimensions }</textarea>
                        </div>
                        <div class="platform">
                            <textarea>${ row.platform }</textarea>
                        </div>
                        <div class="demo">
                            <textarea>${ row.demo }</textarea>
                        </div>
                        <div class="buyingMethod">
                            <textarea>${ row.buyingMethod }</textarea>
                        </div>
                    </div>
                    <div class="category">
                        <div class="linkDemo">Link Demo</div>
                        <div class="note">Note</div>
                    </div>
                    <div class="detailCategory">
                        <div class="linkDemo">
                            <textarea>${ row.linkDemo ? row.linkDemo : "" }</textarea>
                        </div>
                        <div class="note">
                            <textarea>${ row.note ? row.note : "" }</textarea>
                        </div>
                    </div>
                    <div class="category">
                        <div class="privateContent">Trang chủ</div>
                        <div class="privateContent">Xuyên trang</div>
                        <div class="privateContent">Xuyên trang chi tiết</div>
                        <div class="privateContent">Chuyên mục</div>
                        <div class="privateContent">CTR trung bình</div>
                        <div class="privateContent">Est CTR</div>
                        <div class="privateContent">Est Traffic</div>
                        <div class="privateContent">Est Impression</div>
                    </div>
                    <div class="detailCategory">
                        <div class="privateContent homepage">
                            <textarea>${ row.homepage ? row.homepage.toLocaleString() : "" }</textarea>
                        </div>
                        <div class="privateContent crossSite">
                            <textarea>${ row.crossSite ? row.crossSite.toLocaleString() : "" }</textarea>
                        </div>
                        <div class="privateContent detailCrossSite">
                            <textarea>${ row.detailCrossSite ? row.detailCrossSite.toLocaleString() : "" }</textarea>
                        </div>
                        <div class="privateContent categories">
                            <textarea>${ row.categories ? row.categories.toLocaleString() : "" }</textarea>
                        </div>
                        <div class="privateContent averageCTR">
                            <textarea>${ row.averageCTR ? row.averageCTR : "" }</textarea>
                        </div>
                        <div class="privateContent estCTR">
                            <textarea>${ row.estCTR ? row.estCTR : "" }</textarea>
                        </div>
                        <div class="privateContent estTraffic">
                            <textarea>${ row.estTraffic ? row.estTraffic : "" }</textarea>
                        </div>
                        <div class="privateContent estImpression">
                            <textarea>${ row.estImpression ? row.estImpression : "" }</textarea>
                        </div>
                    </div>
                    <div class="action">
                        <button type="button" id="saveBtn">Save</button>
                        <button type="button" id="deleteBtn">Delete</button>
                    </div>
                    <div class="Xbutton">
                        <button id="Xbutton" type="button"><i class="fa-solid fa-xmark"></i></button>
                    </div>
                </div>
                `;
            
                $('.table-container, .search, .add').addClass('blur');
                $('.getDetailRow').html(rowHTML).show();

                $('#Xbutton').click(function() {
                    $('.getDetailRow').empty().hide();
                    $('.table-container, .search, .add').removeClass('blur');
                });

                $('#saveBtn').click(function(event) {
                    event.preventDefault();
                    
                    var no = $('.detailCategory .no textarea').val();
                    var website = $('.detailCategory .website textarea').val();
                    var adsPosition = $('.detailCategory .adsPosition textarea').val();
                    var dimensions = $('.detailCategory .dimensions textarea').val();
                    var platform = $('.detailCategory .platform textarea').val();
                    var demo = $('.detailCategory .demo textarea').val();
                    var buyingMethod = $('.detailCategory .buyingMethod textarea').val();
                    var linkDemo = $('.detailCategory .linkDemo textarea').val();
                    var note = $('.detailCategory .note textarea').val();
                    var homepage = $('.detailCategory .homepage textarea').val();
                    var crossSite = $('.detailCategory .crossSite textarea').val();
                    var detailCrossSite = $('.detailCategory .detailCrossSite textarea').val();
                    var categories = $('.detailCategory .categories textarea').val();
                    var averageCTR = $('.detailCategory .averageCTR textarea').val();
                    var estCTR = $('.detailCategory .estCTR textarea').val();
                    var estTraffic = $('.detailCategory .estTraffic textarea').val();
                    var estImpression = $('.detailCategory .estImpression textarea').val();

                    var updateRow;

                    if (!no || !website || !adsPosition || !dimensions || !platform || !demo || !buyingMethod) {
                        alert('Please fill in all required information');
                    } else {
                        updateRow = {
                            idRow: idRow,
                            no: no,
                            website: website,
                            adsPosition: adsPosition,
                            dimensions: dimensions,
                            platform: platform,
                            demo: demo,
                            buyingMethod: buyingMethod,
                            linkDemo : linkDemo,
                            note: note,
                            homepage: homepage !== "" ? parseInt(homepage.replace(/\./g, '').replace(',', '.')) : null,
                            crossSite: crossSite !== "" ? parseInt(crossSite.replace(/\./g, '').replace(',', '.')) : null,
                            detailCrossSite: detailCrossSite !== "" ? parseInt(detailCrossSite.replace(/\./g, '').replace(',', '.')) : null,
                            categories: categories !== "" ? parseInt(categories.replace(/\./g, '').replace(',', '.')) : null,                            
                            averageCTR: averageCTR !== "" ? averageCTR : null,
                            estCTR: estCTR !== "" ? estCTR : null,
                            estTraffic: estTraffic !== "" ? estTraffic : null,
                            estImpression: estImpression !== "" ? estImpression : null
                        };

                        fetch('http://localhost:3030/api/row', {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(updateRow)
                        })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return response.json();
                        })
                        .then(result => {
                            var $trToUpdate = $('.tbody .tr[data-idrow="' + idRow + '"]');

                            $trToUpdate.find('.no').text(no);
                            $trToUpdate.find('.web').text(website);
                            $trToUpdate.find('.adsPosition').text(adsPosition);
                            $trToUpdate.find('.dimensions').text(dimensions);
                            $trToUpdate.find('.platform').text(platform);
                            $trToUpdate.find('.demo').text(demo);
                            $trToUpdate.find('.buyingMethod').text(buyingMethod);
                            $trToUpdate.find('.note').text(note);

                            alert(result.message);
                        })
                        .catch(error => {
                            console.error('There was a problem with your fetch operation:', error);
                        });
                    }
                });

                $('#deleteBtn').click(async function(event) {
                    event.preventDefault();

                    if (confirm('Confirm delete this row')) {
                        fetch('http://localhost:3030/api/row', {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ idRow: idRow })
                        })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return response.json();
                        })
                        .then(result => {
                            $('.tbody .tr[data-idrow="' + idRow + '"]').remove();

                            $('#Xbutton').trigger('click');
                            
                            alert('Deleted.');
                        })
                        .catch(error => {
                            console.error('There was a problem with your fetch operation:', error);
                        });
                    }
                })
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
        }
    }  
    
    $('.add').click(function() {
        var rowHTML = `
        <div class="getDetaiRow-container">
            <center><h3>New row</h3><center>
            <div class="category">
                <div class="website" style="width: 150px;">Website</div>
                <div class="adsPosition">Tên vị trí</div>
                <div class="dimensions">Kích thước (px)</div>
                <div class="platform">Nền tảng</div>
                <div class="demo">Demo</div>
                <div class="buyingMethod">Cách tính giá</div>
            </div>
            <div class="detailCategory">
                <div class="website" style="width: 150px;">
                    <textarea></textarea>
                </div>
                <div class="adsPosition">
                    <textarea></textarea>
                </div> 
                <div class="dimensions">
                    <textarea></textarea>
                </div>
                <div class="platform">
                    <textarea></textarea>
                </div>
                <div class="demo">
                    <textarea></textarea>
                </div>
                <div class="buyingMethod">
                    <textarea></textarea>
                </div>
            </div>
            <div class="category">
                <div class="linkDemo">Link Demo</div>
                <div class="note">Note</div>
            </div>
            <div class="detailCategory">
                <div class="linkDemo">
                    <textarea></textarea>
                </div>
                <div class="note">
                    <textarea></textarea>
                </div>
            </div>
            <div class="category">
                <div class="privateContent">Trang chủ</div>
                <div class="privateContent">Xuyên trang</div>
                <div class="privateContent">Xuyên trang chi tiết</div>
                <div class="privateContent">Chuyên mục</div>
                <div class="privateContent">CTR trung bình</div>
                <div class="privateContent">Est CTR</div>
                <div class="privateContent">Est Traffic</div>
                <div class="privateContent">Est Impression</div>
            </div>
            <div class="detailCategory">
                <div class="privateContent homepage">
                    <textarea></textarea>
                </div>
                <div class="privateContent crossSite">
                    <textarea></textarea>
                </div>
                <div class="privateContent detailCrossSite">
                    <textarea></textarea>
                </div>
                <div class="privateContent categories">
                    <textarea></textarea>
                </div>
                <div class="privateContent averageCTR">
                    <textarea></textarea>
                </div>
                <div class="privateContent estCTR">
                    <textarea></textarea>
                </div>
                <div class="privateContent estTraffic">
                    <textarea></textarea>
                </div>
                <div class="privateContent estImpression">
                    <textarea></textarea>
                </div>
            </div>
            <div class="action">
                <button type="button" id="saveBtn">Save</button>
            </div>
            <div class="Xbutton">
                <button id="Xbutton" type="button"><i class="fa-solid fa-xmark"></i></button>
            </div>
        </div>
        `;
    
        $('.table-container, .search, .add').addClass('blur');
        $('.getDetailRow').html(rowHTML).show();

        $('#Xbutton').click(function() {
            $('.getDetailRow').empty().hide();
            $('.table-container, .search, .add').removeClass('blur');
        });

        $('#saveBtn').click(function(event) {
            event.preventDefault();
            
            var website = $('.detailCategory .website textarea').val();
            var adsPosition = $('.detailCategory .adsPosition textarea').val();
            var dimensions = $('.detailCategory .dimensions textarea').val();
            var platform = $('.detailCategory .platform textarea').val();
            var demo = $('.detailCategory .demo textarea').val();
            var buyingMethod = $('.detailCategory .buyingMethod textarea').val();
            var linkDemo = $('.detailCategory .linkDemo textarea').val();
            var note = $('.detailCategory .note textarea').val();
            var homepage = $('.detailCategory .homepage textarea').val();
            var crossSite = $('.detailCategory .crossSite textarea').val();
            var detailCrossSite = $('.detailCategory .detailCrossSite textarea').val();
            var categories = $('.detailCategory .categories textarea').val();
            var averageCTR = $('.detailCategory .averageCTR textarea').val();
            var estCTR = $('.detailCategory .estCTR textarea').val();
            var estTraffic = $('.detailCategory .estTraffic textarea').val();
            var estImpression = $('.detailCategory .estImpression textarea').val();

            var newRow;

            if (!website || !adsPosition || !dimensions || !platform || !demo || !buyingMethod) {
                alert('Please fill in all required information');
            } else {
                newRow = {
                    website: website,
                    adsPosition: adsPosition,
                    dimensions: dimensions,
                    platform: platform,
                    demo: demo,
                    buyingMethod: buyingMethod,
                    linkDemo : linkDemo,
                    note: note,
                    homepage: homepage !== "" ? parseInt(homepage.replace(/\./g, '').replace(',', '.')) : null,
                    crossSite: crossSite !== "" ? parseInt(crossSite.replace(/\./g, '').replace(',', '.')) : null,
                    detailCrossSite: detailCrossSite !== "" ? parseInt(detailCrossSite.replace(/\./g, '').replace(',', '.')) : null,
                    categories: categories !== "" ? parseInt(categories.replace(/\./g, '').replace(',', '.')) : null,                            
                    averageCTR: averageCTR !== "" ? averageCTR : null,
                    estCTR: estCTR !== "" ? estCTR : null,
                    estTraffic: estTraffic !== "" ? estTraffic : null,
                    estImpression: estImpression !== "" ? estImpression : null
                };

                fetch('http://localhost:3030/api/row', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newRow)
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(result => {

                    alert(result.message);
                })
                .catch(error => {
                    console.error('There was a problem with your fetch operation:', error);
                });
            }
        });
    })
});
