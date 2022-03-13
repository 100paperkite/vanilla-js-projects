const $ = (selector) => document.querySelector(selector);

class App {
  constructor() {
    this.initEventListeners();
  }
  initEventListeners() {
    const $username = $('#username');
    const $email = $('#email');
    const $password = $('#password');
    const $passwordConfirm = $('#confirm-password');

    $('form').addEventListener('submit', (e) => {
      e.preventDefault();

      if ($passwordConfirm && $passwordConfirm.value !== $password.value) {
        $passwordConfirm.setCustomValidity('비밀번호가 같지 않습니다.');
      } else {
        $passwordConfirm.setCustomValidity('');
      }

      [$username, $email, $password, $passwordConfirm].forEach((element) => {
        if (element.checkValidity()) {
          this.showSuccess(element);
        } else {
          this.showErrorMessage(element);
        }
      });
    });
  }

  showSuccess(element) {
    const $errorMessage = element.parentNode.querySelector('small');
    element.parentNode.classList.remove('invalid');
    element.parentNode.classList.add('valid');
    $errorMessage.innerText = '';
  }
  showErrorMessage(element) {
    const $errorMessage = element.parentNode.querySelector('small');
    element.parentNode.classList.remove('valid');
    element.parentNode.classList.add('invalid');
    $errorMessage.innerText = element.validationMessage;
  }
}

new App();
