var token = localStorage.getItem('jwtToken');

$(document).ready(function() {
    $(document).on('click', '#logout', function(event) {
        event.stopPropagation();

        if (confirm('Xác nhận đăng xuất')) {
            fetch('http://localhost:3030/api/logout', {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                    "authorization": token
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
                localStorage.removeItem('jwtToken');
        
                window.location.href = 'http://localhost:3030/login-register';
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
        }
    })
});