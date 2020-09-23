$(function(){
    // 绑定事件，切换登陆注册页面
    $('#link_reg').on('click',function(){
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link_login').on('click',function(){
        $('.reg-box').hide();
        $('.login-box').show();
    });
    // 从layui中获取form对象
    var form  = layui.form;
    // 通过form.verify()方法自定义校验规则
    form.verify({
        // 自定义一个叫做pwd 校验规则
        pwd:[/^[\S]{6,12}$/,'密码必须6到12位之间并且不能出现空格'],
        repwd:function(value){ // 以上两种方式都可以定义校验规则。函数的方式能定义更复杂的逻辑
            // value就是确认密码input框中的值
            // 获取输入密码框中的值
            var password = $('.reg-box [name=password').val();
            if(password !== value){
                return '两次密码输入不一致';
            }
        }
    });

    // 引入提示框对象
    var layer = layui.layer;
    // 注册 监听表单事件
    $('#form_reg').on('submit',function(e){
        // 阻止表单默认提交行为
        e.preventDefault();
        // 发送post请求
        var data = {username:$('.reg-box [name=username]').val(),password:$('.reg-box [name=password]').val()};
        $.post('/api/reguser',data,
        function(res){
            if(res.status != 0){
               return layer.msg(res.message);
            }
            layer.msg('注册成功，请登陆');
            // 注册成功后，自动跳转到登陆页面
            $('#link_login').click();
        })
    });

    // 登陆 监听
    $('#form_login').on('submit',function(e){
        e.preventDefault();
        console.log(111);
        $.ajax({
            type:'POST',
            url:'/api/login',
            data:{
                username:$('.login-box [name=username]').val(),password:$('.login-box [name=password]').val()
            },
            success:function(res){
                if(res.status !=0 ){
                    return layer.msg(res.message);
                }
                layer.msg('成功登陆', {icon: 6});
                // 把token存到本地
                localStorage.setItem('token',res.token);
                // 跳转到首页
                location.href = '/index.html';
            }
        })
    })
})