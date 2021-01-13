import { FormValidator } from './FormValidator.js';
import Card from './Card.js';
import { initialCards } from './initial-сards.js';


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

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const picture = document.querySelector('.popup__image');
const pictureCaption = document.querySelector('.popup__caption');

const cardSelector = '#template-element';

export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  };

function createCard(item) {
    
    const card = new Card(item, cardSelector, openPopupImg);
    const elementCard = card.generateCard();
    elementBox.prepend(elementCard);
}

initialCards.forEach((item) => {
    createCard(item);
});

//Добавление новой карточки
function saveCard(evt) {
    evt.preventDefault();
    const cardData = {
        name: inputNameCard.value,
        link: inputLink.value
    };
    createCard(cardData);
    popupContainerAdd.reset();
    const popupAddSaveButton = popupContainerAdd.querySelector('.popup__button_disabled');
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
    inputName.value = profileName.textContent; 
    inputDescription.value = profileDescription.textContent;
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
    profileName.textContent = inputName.value; 
    profileDescription.textContent = inputDescription.value; 
    closePopup(popupProfile);
}


buttonEdit.addEventListener('click', () => openPopupProfile(popupProfile));
buttonAddCard.addEventListener('click', () => openPopup(popupAddCard));
buttonClose.addEventListener('click', () => closePopup(popupProfile));
buttonAddClose.addEventListener('click', () => closePopup(popupAddCard));
buttonCloseImg.addEventListener('click', () => closePopup(popupImg));
popupProfileContainer.addEventListener("submit", savePopupProfile);
popupContainerAdd.addEventListener("submit", saveCard);

const formEditProfileValidator = new FormValidator(validationConfig, popupProfileContainer);
formEditProfileValidator.enableValidation();

const formCardValidator = new FormValidator(validationConfig, popupContainerAdd);
formCardValidator.enableValidation();