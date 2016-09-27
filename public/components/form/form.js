(function () {
	'use strict';

	class Form {
		constructor (options) {
      this.elem;
			this.el = document.createElement('form');
			this.el.classList.add('form');
			this.setAttrs(options.attrs);
		}

		setAttrs (attrs) {
			Object.keys(attrs).forEach(name => {
				this.el.setAttribute(name, attrs[name]);
			})
		}

    static addObj (attrs){
      for (var i = 0; i < attrs.length; i++){
        this.elem.appendChild(attrs[i].el);
      }
    }

		static include (frm, el) {
			this.elem = el.appendChild(frm.el);
		}
	}

	window.Form = Form;

})();
