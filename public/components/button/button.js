(function () {
  class Button {
    constructor(options) {
      this.text = options.text;
      this.attrs = options.attrs;

      this.el = document.createElement('button');
      this.render();
    }

    setAttrs(attrs = []) {
      attrs.forEach((name) => {
        this.el.setAttribute(name, attrs[name]);
      });
    }

    render() {
      this.el.innerHTML = this.text;
      this.el.classList.add('button');
      this.setAttrs(this.attrs);

      return this;
    }

    toString() {
      return this.el.outerHTML;
    }

    on(type, callback) {
      this.el.addEventListener(type, callback);
    }
  }

  // export
  window.Button = Button;
})();
