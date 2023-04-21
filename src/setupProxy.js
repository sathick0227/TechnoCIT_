const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
    app.use(
        createProxyMiddleware('/api/Auth/Authentication',
            {
                target: 'http://31.220.82.50:202',
                changeOrigin: true
            })
    )
    app.use(
        createProxyMiddleware('/api/Auth/Register',
            {
                target: 'http://31.220.82.50:202',
                changeOrigin: true
            })
    )
    
}