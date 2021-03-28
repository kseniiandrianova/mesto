export default class Card {
    constructor (items, userId, cardSelector, openPopupImg, openPopupDelete, api) {
        this._name = items.name;
        this._link = items.link;
        this._openPopupDelete = openPopupDelete;
        this._cardSelector = cardSelector;
        this._openPopupImg = openPopupImg;
        
        this._likes = items.likes;
        this._owner = items.owner;
        this._id = items._id;
        this._userId = userId;
        this._api = api;
       
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
        this._likeButton = this._element.querySelector('.element__like');
        this._element.querySelector('.element__counter').textContent = this._likes.length;
        


        if (this._owner._id !== this._userId) {
                this._element.querySelector('.element__button-delete').remove();
                
        }
      
       

        
          if (this._likes.some(item => item._id === this._userId)){
                this._element.querySelector('.element__like').classList.add('element__like_active');
            } 
           
        return this._element;

    }

    _likeCard(evt, cardId) {
        if(this._checkLikes()) {
            this._api
            .deleteLike(cardId)
            .then((res) => {
                this._likes = res.likes;
                this._element.querySelector('.element__counter').textContent = res.likes.length;
                evt.target.classList.remove('element__like_active');
                
            })
            .catch((err) => {
                console.log(err)
            })
        } else {
            this._api
            .addLike(cardId)
            .then((res) => {
                    this._likes = res.likes;
                    this._element.querySelector('.element__counter').textContent = res.likes.length;
                    evt.target.classList.add('element__like_active')
                    
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    _checkLikes() {
        return this._likes.some((item) => {
            return item._id === this._userId
        })
    }

   
    removeCard() {
        this._element.remove();
        console.log(this._element);
    }
    
    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', (evt) => {
            this._likeCard(evt, this._id)
    });

        this._element.querySelector('.element__button-delete').addEventListener('click', () => {
            this._openPopupDelete(this);
        });
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._openPopupImg(this._name, this._link);
        });
        
    
    }
}