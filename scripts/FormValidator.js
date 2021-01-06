export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error'
  };
  
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
      input.classList.add(this._config.inputErrorClass);
      error.textContent = input.validationMessage; 
      
    }

    _hideError(input) {
      const error = this._form.querySelector(`#${input.id}-error`);
      input.classList.remove(this._config.inputErrorClass);
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
        button.classList.remove(this._config.inactiveButtonClass);
        button.disabled = false;
      } else {
        button.classList.add(this._config.inactiveButtonClass);
        button.disabled = true;
      }
    }

    _setEventListeners () {
      const inputsList = this._form.querySelectorAll(this._config.inputSelector);
      const submitButton = this._form.querySelector(this._config.submitButtonSelector);
    
      inputsList.forEach((input) => {
        input.addEventListener('input', () => {
          this._checkInputValidity(input);
          this._setButtonState(submitButton, this._form.checkValidity());
        });
      });
    };

    enableValidation() {
      const forms = document.querySelectorAll(this._config.formSelector);
      forms.forEach(() => {
        this._setEventListeners();
        this._form.addEventListener('submit', (evt) => {
          evt.preventDefault();
        });
        const submitButton = this._form.querySelector(this._config.submitButtonSelector);
        this._setButtonState(submitButton, this._form.checkValidity());
      });
    }
  }