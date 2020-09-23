$(function(){
    // 每次发送ajax时都会先调用 ajsxPrefilter这个函数
    // 在这个函数中能获得Ajax提供的配置对象
    $.ajaxPrefilter(function(options){
        // 在 发送Ajax请求时拼接根路径
        options.url = 'http://ajax.frontend.itheima.net' + options.url
        
        // 给请求有权限的添加header头
        if(options.url.indexOf('/my') != -1){
            options.headers = {
                Authorization:localStorage.getItem('token')
            }
        }
        // 无论请求成功还是失败，都会调用complete
        // 验证用户是否登陆
        options.complete = function(res){
            if(res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！'){
                // 清空token
                localStorage.removeItem('token');
                // 跳转到登陆页
                location.href = '/login.html';
            }
        }
    });
    
})