
window.onload = function() {
  var submit = document.getElementById("submit");
  submit.addEventListener('click', test);
}

function test() {
  var name_regex = /^[a-zA-Z][a-zA-Z0-9]{5,17}$/;
  var studentid_regex = /^[1-9][0-9]{7}$/;
  var phone_regex = /^[1-9][0-9]{10}$/;
  var email_regex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  var name = document.getElementById("name");
  var id = document.getElementById("id");
  var phone = document.getElementById("phone");
  var email = document.getElementById("email");
  if(!name_regex.test(name.value)) {
    alert("用户名格式错误。用户名6~18位英文字母、数字或下划线，必须以英文字母开头");
  }
  if(!studentid_regex.test(id.value)) {
    alert("学号格式错误。学号8位数字，不能以0开头");
  }
  if(!phone_regex.test(phone.value)) {
    alert("电话格式错误。电话11位数字，不能以0开头");
  }
  if(!email_regex.test(email.value)) {
    alert("邮箱格式错误");
  }
}

//172.18.33.148