$(function () {
    let form = layui.form

    //自定义校验规则
    form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samePass: function (value) {
            //value形参为确认密码框的值
            let pwd = $('[name=oldPwd]').val()
            if (pwd === value) {
                return '新旧密码不能一致！'
            }
        },
        repass: function (value) {
            //value形参为确认密码框的值
            let pwd = $('input[name=newPwd]').val()
            if (pwd !== value) {
                return '两次输入的密码不一致!'
            }
        }
    });

    /* 修改密码 */
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message)
                /* 重置表单 */
                $('.layui-form')[0].reset()
            }
        })
    })
})