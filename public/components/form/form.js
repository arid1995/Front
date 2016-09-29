(function () {
  // import
  const Button = window.Button;

  class Form {

    /**
     * Конструктор класса Form
    */
    constructor(options = { data: {}, attrs: {} }) {
      this.data = options.data;
      this.attrs = options.attrs;
      this.el = options.el;

      this.render();
    }

    render() {
      this._updateHtml();
      this._installControls();
    }

    /**
     * Вернуть поля формы
     * @return {string}
     */
    _getFields() {
      const { fields = [] } = this.data;

      return fields.map(field =>
        `<input type="${field.type}" name="${field.name}" placeholder="${field.label}">`
      ).join(' ');
    }

    /**
     * Получить атрибуты компонента
     */
    setAttrs(attrs = {}) {
      Object.keys(attrs).forEach(key => this.el.setAttribute(key, attrs[key]));
    }

    /**
     * Обновить html компонента
     */
    _updateHtml() {
      this.el.innerHTML = `
        <form method="POST">
          <h1>${this.data.title}</h1>
          <div>
            ${this._getFields()}
          </div>
          <div class="js-controls">
          </div>
        <form>
      `;
      this.setAttrs(this.attrs);
    }

    /**
     * Вставить управляющие элементы в форму
     */
    _installControls() {
      const { controls = [] } = this.data;

      controls.forEach((data) => {
        const control = new Button({ text: data.text }).render();
        this.el.querySelector('.js-controls').appendChild(control.el);
      });
    }

    /**
     * Подписка на событие
     * @param {string} type - имя события
     * @param {function} callback - коллбек
     */
    on(type, callback) {
      this.el.addEventListener(type, callback);
    }

    /**
     * Взять данные формы
     * @return {object}
     */
    getFormData() {
      const form = this.el.querySelector('form');
      const elements = form.elements;
      const fields = {};

      Object.keys(elements).forEach((element) => {
        const name = elements[element].name;
        const value = elements[element].value;

        if (!name) {
          return;
        }

        fields[name] = value;
      });

      return fields;
    }

    validate() {
      const fields = this.getFormData();
      let status = 0;

      Object.keys(fields).forEach((value) => {
        if (fields[value] === '') {
          alert(`Field ${value} must not be empty`);
          status = 1;
        }
      });
      return status;
    }
  }

  // export
  window.Form = Form;
})();
