const validationConfig = {
    formSelector: '.popup__add-container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error'
  };
  
  
  function showError(form, input, config) {
    const error = form.querySelector(`#${input.id}-error`);
    input.classList.add(config.inputErrorClass);
    error.textContent = input.validationMessage; 
    
  }
  
  
  function hideError(form, input, config) {
    const error = form.querySelector(`#${input.id}-error`);
    input.classList.remove(config.inputErrorClass);
    error.textContent = '';
    
  }
  
  
  function checkInputValidity(form, input, config) {
    if (!input.validity.valid) {
      showError(form, input, config);
    } else {
      hideError(form, input, config);
    }
  }
  
  function setButtonState (button, isActive, config) {
    if (isActive) {
      button.classList.remove(config.inactiveButtonClass);
      button.disabled = false;
    } else {
      button.classList.add(config.inactiveButtonClass);
      button.disabled = true;
    }
  }
  
  function setEventListeners (form, config) {
    const inputsList = form.querySelectorAll(config.inputSelector);
    const submitButton = form.querySelector(config.submitButtonSelector);
  
    inputsList.forEach((input) => {
      input.addEventListener('input', () => {
        checkInputValidity(form, input, config);
        setButtonState(submitButton, form.checkValidity(), config);
      });
    });
  };
  
  function enableValidation(config) {
    const forms = document.querySelectorAll(config.formSelector);
    forms.forEach((form) => {
      setEventListeners(form, config);
      form.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      const submitButton = form.querySelector(config.submitButtonSelector);
      setButtonState(submitButton, form.checkValidity(), config);
    });
  }
  
  enableValidation(validationConfig);