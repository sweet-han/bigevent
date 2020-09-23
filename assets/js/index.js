$(function(){
    function getUserInfo (){
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            // headers:{
            //     Authorization:localStorage.getItem('token')
            // },
            success: function(res){
                if(res.status != 0){
                    return layui.layer.msg('获取用户信息失败')
                }
                // 渲染头像
                renderAvater(res.data);
            },
            // 无论请求成功还是失败，都会调用complete
            // 验证用户是否登陆
            // complete: function(res){
            //     if(res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！'){
            //         // 清空token
            //         localStorage.removeItem('token');
            //         // 跳转到登陆页
            //         location.href = '/login.html';
            //     }
            // }
        })
    }
    getUserInfo();

    // 渲染头像函数
    function renderAvater(data){ 
        // 先显示昵称，后显示用户名
        var name = data.nickname || data.username || '';
        $('#welcome').html('欢迎&nbsp;&nbsp;'+name);
        // 显示上传的头像，还是默认头像
        if(data.user_pic){
            $('.layui-nav-img').attr('src',data.user_pic).show();
            $('.text-avatar').hide();
        }else {
            $('.layui-nav-img').hide();
            $('.text-avatar').html(name[0].toUpperCase()).show();
        }
    }

    // 推出登陆
    var layer = layui.layer
    $('#logout').on('click',function(){
        layer.confirm('确认退出?', {icon: 3, title:'提示'}, function(index){
        // 1.删除token值
        localStorage.removeItem('token');
        // 2.跳转到登陆页
        location.href = '/login.html';
        // 关闭对应的弹框的索引
        layer.close(index);
        });
    })
})