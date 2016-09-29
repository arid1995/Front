(function () {
  if (typeof window === 'object') {
    // import
    const Chat = window.Chat;
    const Form = window.Form;
    const Button = window.Button;

    const loginPage = document.querySelector('.js-login');
    const registerPage = document.querySelector('.js-register');
    const chatPage = document.querySelector('.js-chat');
    const registerButton = document.querySelector('.js-reg-button');

    const regButton = new Button({
      text: 'Sign up',
    });

    regButton.on('click', (event) => {
      event.preventDefault();

      loginPage.hidden = true;
      chatPage.hidden = true;
      registerPage.hidden = false;
      registerButton.hidden = true;
    });

    const loginForm = new Form({
      el: document.createElement('div'),
      data: {
        title: 'Login',
        fields: [
          {
            label: 'Login',
            name: 'login',
            type: 'text',
          },
          {
            label: 'password',
            name: 'password',
            type: 'password',
          },
        ],
        controls: [
          {
            text: 'Войти',
            attrs: {
              type: 'submit',
            },
          },
        ],
      },
    });

    const registerForm = new Form({
      el: document.createElement('div'),
      data: {
        title: 'Sign up',
        fields: [
          {
            label: 'Login',
            name: 'login',
            type: 'text',
          },
          {
            label: 'email',
            name: 'email',
            type: 'email',
          },
          {
            label: 'Password',
            name: 'password',
            type: 'password',
          },
          {
            label: 'Confirm password',
            name: 'confirm_password',
            type: 'password',
          },
        ],
        controls: [
          {
            text: 'Sign up',
            attrs: {
              type: 'submit',
            },
          },
        ],
      },
    });

    const chat = new Chat({
      el: document.createElement('div'),
    });

    loginForm.on('submit', (event) => {
      event.preventDefault();

      if (loginForm.validate()) return;

      const formData = loginForm.getFormData();
      const response = request('http://127.0.0.1:8080/api/session', formData, 'POST');
      if (response === 'fail') return;

      const responseObj = JSON.parse(response);

      alert(responseObj.toString());
      chat.set({
        username: formData.login,
        email: formData.password,
      }).render();

      chat.subscribe();

      loginPage.hidden = true;
      regButton.hidden = true;
      registerPage.hidden = true;
      chatPage.hidden = false;
    });

    registerForm.on('submit', (event) => {
      event.preventDefault();
      if (registerForm.validate()) return;

      const formData = registerForm.getFormData();

      if (request('http://127.0.0.1:8080/api/user', formData, 'POST') === 'fail') return;

      loginPage.hidden = false;
      chatPage.hidden = true;
      registerPage.hidden = true;
      registerButton.hidden = false;
    });


    loginPage.appendChild(loginForm.el);
    chatPage.appendChild(chat.el);
    registerPage.appendChild(registerForm.el);
    registerButton.appendChild(regButton.el);

    loginPage.hidden = false;
  }
})();
