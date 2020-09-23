$(function(){
    // 每次发送ajax时都会先调用 ajsxPrefilter这个函数
    // 在这个函数中能获得Ajax提供的配置对象
    $.ajaxPrefilter(function(options){
        // 在 发送Ajax请求时拼接根路径
        options.url = 'http://ajax.frontend.itheima.net' + options.url
    })
})