import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor (popup, handleFormSubmit) {
        super(popup)
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = document.querySelector('.popup__form');
        this._inputList = document.querySelector('.popup__input');
    }
//Собирает данные полей форм
    _getInputValues() {
        this._inputValues = {};
        this._inputList.forEach((input)=> {
            this._inputValues[input.name] = input.value;
        });

        return this._inputList;
    }



//Закрытие и сбрасывание формы
    closePopup() {
        super.closePopup();
        this._popupForm.reset();
        
    }
//Перезаписывает родительский метод  
    setEventListeners(){
        super.setEventListeners();
        this._inputValues = document.querySelector('.popup__button').addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
        this.closePopup();
    }
    
}