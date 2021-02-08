export class FormValidator {
    constructor (config, form) {
      this._config = config;
      this._form = form;
      this._inputSelector = config.inputSelector;
      this._submitButtonSelector = config.submitButtonSelector;
      this._inactiveButtonClass = config.inactiveButtonClass;
      this._inputErrorClass = config.inputErrorClass;
      

    }

    _showError(input) {
      const error = this._form.querySelector(`#${input.id}-error`);
      input.classList.add(this._inputErrorClass);
      error.textContent = input.validationMessage; 
      
    }

    _hideError(input) {
      const error = this._form.querySelector(`#${input.id}-error`);
      input.classList.remove(this._inputErrorClass);
      error.textContent = '';
      
    }

    _checkInputValidity(input) {
      if (!input.validity.valid) {
        this._showError(input);
      } else {
        this._hideError(input);
      }
    }

    _setButtonState (button, isActive) {
      if (isActive) {
        button.classList.remove(this._inactiveButtonClass);
        button.disabled = false;
      } else {
        button.classList.add(this._inactiveButtonClass);
        button.disabled = true;
      }
    }

    _setEventListeners () {
      const inputsList = Array.from(this._form.querySelectorAll(this._inputSelector));
      this._buttonElement = this._form.querySelector(this._submitButtonSelector);
    
      inputsList.forEach((input) => {
        input.addEventListener('input', () => {
          this._checkInputValidity(input);
          this._setButtonState(this._buttonElement, this._form.checkValidity());
        });
      });
    };

    enableValidation() {
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
         });
        this._setEventListeners();
    }
  }