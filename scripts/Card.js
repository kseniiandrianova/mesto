export default class Card {
    constructor (items, cardSelector, openPopupImg) {
        this._name = items.name;
        this._link = items.link;
        this._cardSelector = cardSelector;
        this._openPopupImg = openPopupImg;
    }

    _getTemlate() {
        const elementCard = document
        .querySelector('#template-element')
        .content
        .querySelector('.element')
        .cloneNode(true);
        return elementCard;
    }

    generateCard() {
        this._element = this._getTemlate();
        this._setEventListeners();
        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__image').alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;

        return this._element;

    }

    _likeCard() {
        this._element.querySelector('.element__like').classList.toggle('element__like_active');
    }

    _deleteCard() {
        this._element.closest('.element').remove();
    }

    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', () => {
            this._likeCard();
        });
        this._element.querySelector('.element__button-delete').addEventListener('click', () => {
            this._deleteCard();
        });
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._openPopupImg(this.name, this._link)
        });
    }
}