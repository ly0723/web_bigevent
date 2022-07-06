$(function () {
    //点击去注册的链接
    $('#linkReg').on('click', () => {
        $('.loginBox').hide()
        $('.regBox').show()
    })

    //点击去登录的链接
    $('#linkLogin').on('click', () => {
        $('.loginBox').show()
        $('.regBox').hide()
    })

    //从layui中获取form对象
    let form = layui.form
    let layer = layui.layer

    //自定义校验规则
    form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repass: function (value) {
            //value形参为确认密码框的值
            let pwd = $('.regBox [name=password]').val()
            if (pwd !== value) {
                return '两次输入的密码不一致!'
            }
        }
    });

    //注册表单提交发起请求
    $('#formReg').on('submit', function (e) {
        e.preventDefault()
        let data = {
            username: $('#formReg [name=username]').val(),
            password: $('#formReg [name=password]').val()
        }
        $.post('/api/reguser', data, function (res) {
            if (res.status != 0) {
                return layer.msg(res.message, {
                    icon: 5
                });
            }
            layer.msg(res.message, {
                icon: 6
            })
            $('#linkLogin').click()
        })
    })

    //登录表单提交发起请求
    $('#formLogin').submit(function (e) {
        //阻止默认行为
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message, {
                        icon: 5
                    });
                }
                layer.msg(res.message, {
                    icon: 6
                })
                //存储用户的身份验证信息
                localStorage.setItem('token', res.token)
                //跳转到首页
                setTimeout(() => {
                    location.href = '/index.html'
                }, 1000)
            }
        })
    })
})