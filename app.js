/** 
  * Html code::
  * 1. Add class (jsMenuOptions)
  * 2. Array: 
  *  [
  *     {"name": "Deletar",  "color": "red",  "href": "#trash"},
  *     {"name": "Publicar", "color": "blue", "href": "https://www.w3schools.com/jsref/jsref_forin.asp"}
  *     ...
  *  ]
  *
  **/

let more_options = function (element) {
    this.option = element;
    this.init();
}

more_options.prototype.init = function() {
    this.optionsContainer = document.createElement('article');
    this.optionsBox = document.createElement('section');
    this.optionsBox.setAttribute('id', 'options');
    this.optionsBox.append(this.optionsContainer);
    this.optionsJSON = JSON.parse(this.option.getAttribute('options'));
    this.optionsJSON.push({
        name: 'cancelar', 
        type: 'span', 
        color: 'red', 
        action: 'hide'
    });

    this.addEvents();
}

more_options.prototype.optionsCreate = function() {
    this.optionsJSON.forEach(index => {
        if (index.href){
            this.optionBtn = document.createElement('a');
            this.optionBtn.href = index.href;
        }else{
            this.optionBtn = document.createElement('span');
        }

        this.optionBtn.classList.add('option-btn');
        this.optionBtn.innerHTML = index.name;

        if (index.hasOwnProperty('color')){
            this.optionBtn.classList.add('tx-' + index.color);
        }

        if (index.action && index.action in this && typeof this[index.action] == 'function'){
            this.optionBtn.addEventListener('click', this[index.action].bind(this));
        }

        this.optionItem = document.createElement('div');
        this.optionItem.classList.add('option-item');
        this.optionItem.append(this.optionBtn);

        this.optionsContainer.append(this.optionItem);
    });
}

more_options.prototype.addEvents = function() {
    this.option.addEventListener('click', this.show.bind(this));
    this.optionsCreate();
}

more_options.prototype.show = function() {
    document.body.append(this.optionsBox);
}

more_options.prototype.hide = function() {
    document.body.removeChild(this.optionsBox);
}

Array.from(document.querySelectorAll('.jsMenuOptions'), function (option) {
    new more_options(option);
});