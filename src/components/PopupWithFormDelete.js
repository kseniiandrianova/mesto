import Popup from './Popup.js';
import {api} from '../pages/index.js';

export default class PopupWithFormDelete extends Popup {
    constructor (popup) {
        super(popup)
        this._popupForm = document.querySelector('.popup__form');
        this._card = null;
        
        
    }

    openPopup (_card) {
        super.openPopup();
        this._card = _card;    
    }


//Закрытие и сбрасывание формы
    closePopup() {
        super.closePopup();
        this._popupForm.reset();
        
    }

   


//Перезаписывает родительский метод
    setEventListeners(){
        super.setEventListeners();
        this._popup.querySelector('.popup__button-save').addEventListener('click', 
        (evt) => {
            console.log(evt);
            evt.preventDefault();
            if(this._card) {
                api
                .deleteCard(this._card._id)
                .then(() => {
                    this._card.removeCard();
                    this._card = null;
                    this.closePopup();
                })
                .catch((err) => {
                    console.log(err)
                })
            }
            
        });
    }

}