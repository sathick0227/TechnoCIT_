const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
    app.use(
        createProxyMiddleware('/letsunite/api/Auth/Authentication',
            {
                target: 'http://31.220.82.50:8080',
                changeOrigin: true
            })
    )
    app.use(
        createProxyMiddleware('/letsunite/api/Auth/Register',
            {
                target: 'http://31.220.82.50:8080',
                changeOrigin: true
            })
    )
    app.use(
        createProxyMiddleware('/letsunite/api/Event/GetEvents',
            {
                target: 'http://31.220.82.50:8080',
                changeOrigin: true
            })
    )
    app.use(
        createProxyMiddleware('/letsunite/api/Sport/GetAllSports',
            {
                target: 'http://31.220.82.50:8080',
                changeOrigin: true
            })
    )
    app.use(
        createProxyMiddleware('/letsunite/api/Event/AddEvent',
            {
                target: 'http://31.220.82.50:8080',
                changeOrigin: true
            })
    )
    app.use(
        createProxyMiddleware('/letsunite/api/Event/UpdateEvent',
            {
                target: 'http://31.220.82.50:8080',
                changeOrigin: true
            })
    )
    app.use(
        createProxyMiddleware('/letsunite/api/Event/DeleteEvent/',
            {
                target: 'http://31.220.82.50:8080',
                changeOrigin: true
            })
    )
    app.use(
        createProxyMiddleware('/letsunite/api/Event/GetEventById/',
            {
                target: 'http://31.220.82.50:8080',
                changeOrigin: true
            })
    )
    app.use(
        createProxyMiddleware('/letsunite/api/Venue/GetVenueList',
            {
                target: 'http://31.220.82.50:8080',
                changeOrigin: true
            })
    )
}   