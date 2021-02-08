import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popup){
        super(popup);
        this._image = document.querySelector('.popup__image');
        this._imageCaption = document.querySelector('.popup__caption');
    }

    openPopup(name, link){
        this._image.src = link;
        this._image.alt = name;
        this._imageCaption.textContent = name;
        super.openPopup();
    }
    
}