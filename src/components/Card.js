export default class Card {
    constructor (items , cardSelector, openPopupImg) {
        this._name = items.name;
        this._link = items.link;
        this._cardSelector = cardSelector;
        this._openPopupImg = openPopupImg;
    }

    _getTemlate() {
        const elementCard = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);
        return elementCard;
    }

    generateCard() {
        this._element = this._getTemlate();
        this._setEventListeners();
        this._elCardImg = this._element.querySelector('.element__image');
        this._elCardImg.src = this._link;
        this._elCardImg.alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;

        return this._element;

    }

    _likeCard() {
        this._element.querySelector('.element__like').classList.toggle('element__like_active');
    }

    _deleteCard() {
        this._element.remove();
    }


    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', () => {
            this._likeCard();
        });
        this._element.querySelector('.element__button-delete').addEventListener('click', () => {
            this._deleteCard();
        });
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._openPopupImg(this._name, this._link);
        });
    
    }
}