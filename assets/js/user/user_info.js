$(function () {
    let form = layui.form

    /* 自定义验证规则 */
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在0-6个字符之间'
            }
        }
    })

    initUserInfo()

    /* 初始化用户信息 */
    function initUserInfo() {
        $.get('/my/userinfo', function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            }
            /* 表单渲染信息 */
            form.val('formUserInfo', res.data)
        })
    }

    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    })

    /* 更新用户信息 */
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message);
                }
                window.parent.getUserInfo()
            }
        })
    })
})