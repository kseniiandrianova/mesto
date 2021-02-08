export default class Popup {
    constructor(popup) {
        this._popup = popup;
        this._handleEscClose = this._handleEscClose.bind(this);
        this._closeOverlay = this._closeOverlay.bind(this);
        this._closeButtonEdit = document.querySelector('.popup__button-close');
        this._closeButtonAdd = document.querySelector('.popup__button-add-close');
        this._closeButtonImg = document.querySelector('.popup__close-picture');
    }

    openPopup() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
        this._popup.addEventListener('click', this._closeOverlay);
        
    }

    closePopup() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
        this._popup.removeEventListener('click', this._closeOverlay);
    }
    

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.closePopup(document.querySelector('popup_opened'));
        }
    }

    _closeOverlay(evt) {
        if (evt.target !== evt.currentTarget) {
            return;
        }
        this.closePopup(evt.target);
        
    }

    setEventListeners() {
        this._closeButtonEdit.addEventListener('click', this.closePopup.bind(this));
        this._closeButtonAdd.addEventListener('click', this.closePopup.bind(this));
        this._closeButtonImg.addEventListener('click', this.closePopup.bind(this));

    }
}