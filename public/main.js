'use strict';

	let userData = {};

	if (typeof window === 'object') {
		let Form = window.Form;
		let Button = window.Button;
		let Input = window.Input;
		let formElForm = document.querySelector('.LG');

		let userData = {};

		let newForm = new Form({
			attrs: {
				onsubmit : 'onLogin(this); return false;'
			}
		});

		let formButton = new Button({
			text: 'hello',
			attrs: {
				name: 'name'
			}
		});

		let formEmail = new Input({
			attrs: {
				placeholder : 'Ваш email',
				type : 'email',
				name : 'email',
				value : ''
			}
		});

		let formName = new Input({
			attrs: {
				placeholder : 'Ваш name',
				type : 'text',
				name : 'user',
				value : ''
			}
		});

		Form.include(newForm, formElForm);
		Form.addObj([formEmail, formName, formButton]);
	}

function filter (str, rules = ['kek', 'кек', 'shrek', 'пек', 'шрек',
                              'dreamworks']) {
  var result = str;
  rules.forEach(function(item, i, rules) {
    var patch = "";
    for (var i = 0; i < item.length; i++) {
      patch = patch + "*"
    }
    result = result.replace(new RegExp('\s?' + item + '\s?', 'gi'), patch);
  })

  return result;
}

function onLogin (form, block) {
  userData = {
    user: form.elements['user'].value,
    email: form.elements['email'].value
  };

   jsLogin.hidden = true;
   jsChat.hidden = false;

   if (userData.user) {
     userData.user = filter(userData.user);
     jsTitle.innerHTML = jsTitle.innerHTML.replace('%username%', userData.user);
   }

   subscribe();
}

function createMessage (opts, isMy = false) {
  let message = document.createElement('div');
  let email = document.createElement('div');

  message.classList.add('chat__message');
  email.classList.add('chat__email');

  if (isMy) {
    message.classList.add('chat__message_my');
  } else {
    message.style.backgroundColor = `#${technolibs.colorHash(opts.email || '')}`;
  }
  message.innerHTML = filter(opts.message);
  email.innerHTML = opts.email;
  message.appendChild(email);


  return message;
}

function onChat (form) {
  let data = {
    message: form.elements['message'].value,
    email: userData.email
  };

  let result = technolibs.request('/api/messages', data);
  form.reset();
}

function renderChat (items) {
  jsMessages.innerHTML = '';
  items.forEach(item => {
    let message = createMessage(item, item.email === userData.email);
    jsMessages.appendChild(message);
  });
  jsMessages.scrollTop = jsMessages.scrollHeight;
}

function subscribe () {
  technolibs.onMessage(data => {
    renderChat(Object.keys(data).map(key => data[key]));
  });
}

function plur(num){
	switch(num%100){
		case 12:
		case 13:
		case 14:  return 'раз';
		default: break;
	}
	switch(num%10){
		case 2:
		case 3:
		case 4:  return 'раза';
		default: return 'раз';
	}
}

function hello(text) {
	return 'Привет, ' + text;
}

function plural(num){
	if(num == 0)
		return 'Здравствуй, дух';
	if(num == 1)
		return 'Рады приветствовать на нашем курсе!';
	var count = 15;
	if (num < count){
		return ("Кликай дальше!! Еще осталось " + (count-num) + " раз(а)");
	}
	return '01001000 01101001 00101100 00100000 01100010 01110010 01101111';
}

function hello(text) {
  return 'Привет, ' + text;
}
}
