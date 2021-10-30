module.exports = {
    devServer: {
        // 解决跨域  服务器代理
        proxy: {
            '/api': {
                //匹配所有以'/api开头的请求路径
                target: 'http://localhost:3000', //代理目标的基本路径
                changeOrigin: true,
                ws: true,
                pathRewrite: { '/api': '' } //路径重写
            }
        }
    }
}
