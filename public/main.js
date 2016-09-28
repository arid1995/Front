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
      options: { text: 'Войти' },
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
        action: '127.0.0.1/api/session',
        fields: [
          {
            label: 'Login',
            name: 'user',
            type: 'text',
          },
          {
            label: 'email',
            name: 'email',
            type: 'email',
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
        action: '127.0.0.1/api/user',
        fields: [
          {
            label: 'Login',
            name: 'user',
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

      const formData = loginForm.getFormData();
      technolibs.request('/api/login', formData);

      chat.set({
        username: formData.user,
        email: formData.email,
      })
      .render();

      chat.subscribe();

      loginPage.hidden = true;
      regButton.hidden = true;
      registerPage.hidden = true;
      chatPage.hidden = false;
    });

    registerForm.on('submit', (event) => {
      event.preventDefault();

      const formData = loginForm.getFormData();

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
