Validator({
  form: "#form-1",
  message: ".form-message",
  rules: [
    Validator.isRequired("#userName", "Bạn chưa nhập Username"),
    Validator.isEmail("#email", "Vui lòng nhập đúng email"),
    Validator.minLength("#password", 6),
    Validator.isConfirm(
      "#password-confirm",
      function () {
        return document.querySelector("#form-1 #password").value;
      },
      "Mật khẩu nhập lại không chính xác"
    ),
  ],
});
