import { validationConfig, FormValidator } from './FormValidator.js';
import Card from './Card.js';


const popupProfile = document.querySelector('.popup_user');
const popupAddCard = document.querySelector('.popup_cards');
const popupImg = document.querySelector('.popup_pictures');

const buttonEdit = document.querySelector('.profile__edit-button');
const buttonClose = document.querySelector('.popup__button-close');
const buttonAddCard = document.querySelector('.profile__add-button');
const buttonAddClose = document.querySelector('.popup__button-add-close');
const buttonCloseImg = document.querySelector('.popup__close-picture');

const popupProfileContainer = document.querySelector('.popup__container');
const popupContainerAdd = document.querySelector('.popup__add-container');
const elementBox = document.querySelector('.elements');

const inputName = document.querySelector('.popup__input_name');
const inputDescription = document.querySelector('.popup__input_description');
const inputNameCard = document.querySelector('.popup__input_name-card');
const inputLink = document.querySelector('.popup__input_link');

const name = document.querySelector('.profile__name');
const description = document.querySelector('.profile__description');

const picture = document.querySelector('.popup__image');
const pictureCaption = document.querySelector('.popup__caption');

const elementTemplate = document.querySelector('#template-element').content;


const initialCards = [
    {
        name: 'Архыз',
        link: './images/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: './images/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: './images/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: './images/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: './images/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: './images/baikal.jpg'
    }
];


function createCard(item) {
    
    const card = new Card(item, '#template-element', openPopupImg);
    const elementCard = card.generateCard();
    elementBox.prepend(elementCard);
    return elementCard;
}

initialCards.forEach((item) => {
    const elementCard = createCard(item);
    elementBox.prepend(elementCard);
});

//Добавление новой карточки
function saveCard(evt) {
    evt.preventDefault();
    const cardData = {
        name: inputNameCard.value,
        link: inputLink.value
    };
    const elementCard = createCard(cardData);
    popupContainerAdd.reset();
    const popupAddSaveButton = popupContainerAdd.querySelector('.popup__button-save');
    closePopup(popupAddCard);
}

function openPopupImg (name, link) {
    openPopup(popupImg);
    picture.src = link;
    pictureCaption.textContent = name;

}

//Открытие попапа профиля
function openPopupProfile() {
    openPopup(popupProfile);
    inputName.value = name.textContent; 
    inputDescription.value = description.textContent;
}

//Закрытие по оверлею
function closeOverlay(evt) {
    if (evt.target !== evt.currentTarget) {
        return;
    }
    closePopup(evt.target);
}
  
//Закрытие попапа нажатием Escape
function closeEsc(evt) {
   if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
    }
}

//Открытие попапа
function openPopup(popup) {
    popup.classList.add('popup_opened');
    popup.addEventListener('mousedown', closeOverlay);
    document.addEventListener('keydown', closeEsc);
    
}

//Закрытие попапа
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    popup.removeEventListener('mousedown', closeOverlay);
    document.removeEventListener('keydown', closeEsc);
}

//Изменение профиля
function savePopupProfile(evt) {
    evt.preventDefault(); 
    name.textContent = inputName.value; 
    description.textContent = inputDescription.value; 
    closePopup(popupProfile);
}


buttonEdit.addEventListener('click', () => openPopup(popupProfile));
buttonAddCard.addEventListener('click', () => openPopup(popupAddCard));
buttonClose.addEventListener('click', () => closePopup(popupProfile));
buttonAddClose.addEventListener('click', () => closePopup(popupAddCard));
buttonCloseImg.addEventListener('click', () => closePopup(popupImg));
popupProfileContainer.addEventListener("submit", savePopupProfile);
popupContainerAdd.addEventListener("submit", saveCard);

const formEditProfilValidator = new FormValidator(validationConfig, popupProfileContainer);
formEditProfilValidator.enableValidation();

const formCardValidator = new FormValidator(validationConfig, popupContainerAdd);
formCardValidator.enableValidation();