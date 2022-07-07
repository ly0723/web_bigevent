$(function () {
  getUserInfo();
});

//! 获取用户信息
function getUserInfo() {
  //发请求
  $.ajax({
    method: "GET",
    url: "/my/userinfo",
    /*  headers: {
             Authorization: localStorage.getItem('token') || ''
         }, */
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg(res.message);
      }
      renderAvatar(res.data);
    },
  });
}

//! 渲染用户头像
function renderAvatar(data) {
  //获取用户名
  var name = data.nickname || data.username;
  //填充名字
  $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
  //获取头像信息
  if (data.user_pic !== null) {
    $(".layui-nav-img").attr("src", data.user_pic).show();
    $(".textAvatar").hide();
  } else {
    let first = name[0].toUpperCase();
    $(".layui-nav-img").hide();
    $(".textAvatar").html(first).show();
  }
}

//! 实现退出功能
$("#btnLoginOut").on("click", function () {
  //弹出提示框
  layer.confirm(
    "是否退出登录?",
    {
      icon: 3,
      title: "提示",
    },
    function (index) {
      //do something
      //1.清空本地存储数据
      localStorage.removeItem("token");
      //2.跳转至的登录页面
      location.href = "/login.html";

      layer.close(index);
    }
  );
});
