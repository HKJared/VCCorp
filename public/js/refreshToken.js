(function(window, $) {
    const REFRESH_INTERVAL = 15 * 60 * 1000; // 15 minutes

    function getRefreshToken() {
        return localStorage.getItem('refreshToken');
    }

    function setAccessToken(token) {
        localStorage.setItem('jwtToken', token);
    }

    function refreshAccessToken(callback) {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
            showNotification('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại')
            return;
        }

        fetch('http://localhost:3030/api/token', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body:JSON.stringify({ refreshToken: refreshToken })
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
            setAccessToken(result.accessToken);
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });
    }

    function startTokenRefresh() {
        setInterval(function() {
            refreshAccessToken();
        }, REFRESH_INTERVAL);
    }

    // Start the token refresh interval when the script is loaded
    $(document).ready(function() {
        startTokenRefresh();
    });

    // Expose the function to be used in other scripts if needed
    window.refreshAccessToken = refreshAccessToken;
})(window, jQuery);
