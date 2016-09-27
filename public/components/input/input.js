(function () {
	'use strict';

	class Input {
		constructor (options) {
			this.el = document.createElement('input');
			this.el.classList.add('input');
			this.setAttrs(options.attrs);
		}

		setAttrs (attrs) {
			Object.keys(attrs).forEach(name => {
				this.el.setAttribute(name, attrs[name]);
			})
		}

		static include (inp, el) {
			el.appendChild(inp.el);
		}
	}

	window.Input = Input;

})();
