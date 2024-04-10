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
                        <div class="tr">
                            <div class="td no">${ arr[i].no }</div>
                            <div class="td web">${ arr[i].website }</div>
                            <div class="td adsPosition">${ arr[i].adsPosition }</div>
                            <div class="td dimensions">${ arr[i].dimensions }</div>
                            <div class="td platform">${ arr[i].platform }</div>
                            <div class="td demo">${ arr[i].demo }</div>
                            <div class="td buyingMethod">${ arr[i].buyingMethod }</div>
                            <div class="td note">${ arr[i].note ? arr[i].note : "" }</div>
                        </div>
                        `;
                        $('.tbody').append(tbodyHTML);
                    }
                } else {
                    alert('No data matching.')
                }

            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
        }
    }
});
