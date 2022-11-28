function Validator(options) {
  const selectorRules = {};

  function Validate(inputElement, opt) {
    const errMsg = opt.test(inputElement.value);
    const errElement = inputElement.parentElement.querySelector(options.message);

    if (errMsg) {
      errElement.innerText = errMsg;
      inputElement.parentElement.classList.add("invalid");
    } else {
      errElement.innerText = "";
      inputElement.parentElement.classList.remove("invalid");
    }
  }

  const formElement = document.querySelector(options.form);

  if (formElement) {
    options.rules.map((opt) => {
      if (Array.isArray(selectorRule)) {
        selectorRules[opt.rules].push(opt.test);
      } else {
        selectorRules[opt.selector] = [opt.test];
      }

      const inputElement = formElement.querySelector(opt.selector);
      if (inputElement) {
        inputElement.onblur = function () {
          Validate(inputElement, opt);
        };

        inputElement.oninput = () => {
          const errElement = inputElement.parentElement.querySelector(options.message);
          errElement.innerText = "";
          inputElement.parentElement.classList.remove("invalid");
        };
      }
    });
  }
}

Validator.isRequired = function (selector, message) {
  return {
    selector,
    test: function (value) {
      return value.trim() ? undefined : message || "Vui lòng nhập đủ thông tin!";
    },
  };
};

Validator.isEmail = function (selector, message) {
  return {
    selector,
    test: function (value) {
      const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value) ? undefined : message || "Bạn chưa nhập đúng email";
    },
  };
};

Validator.minLength = function (selector, min, message) {
  return {
    selector,
    test: function (value) {
      return value.length >= min ? undefined : message || `Vui lòng nhập tối hiểu ${min} ký tự`;
    },
  };
};

Validator.isConfirm = function (selector, getConfirmValue, message) {
  return {
    selector,
    test: function (value) {
      return value === getConfirmValue() ? undefined : message || "Giá trị nhập vào không chính xác";
    },
  };
};
