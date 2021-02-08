import './index.css';

import { FormValidator } from '../components/FormValidator.js';
import Card from '../components/Card.js';
import { initialCards } from '../components/initial-сards.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';



import {
    popupProfile,
    popupAddCard,
    popupImg,
    buttonEdit,
    buttonAddCard,
    buttonAddClose,
    popupProfileContainer,
    popupContainerAdd,
    elementBox,
    inputName,
    inputDescription,
    inputNameCard,
    inputLink,
    profileName,
    profileDescription,
    picture,
    pictureCaption,
    cardSelector
} from '../utils/constants.js';


export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
  };


//Добавление карточек
const cardList = new Section ({
    renderer: (item) => {
    const elementCard = card.generateCard(item);
    cardList.addItem(elementCard, true);
    }
});

//Создание новой карточки
function createCard(item) {
    const card = new Card(item, cardSelector, openPopupImg);
    const elementCard = card.generateCard();
    elementBox.prepend(elementCard);
}

initialCards.forEach((item) => {
    createCard(item);
});

//Открытие картинки на весь эран
function openPopupImg (name, link) {
    const popupWithImage = new PopupWithImage(popupImg);
    popupWithImage.openPopup(name, link);
    picture.src = link;
    pictureCaption.textContent = name;
    popupWithImage.setEventListeners();
}

//Создание попапа карточки
const popupCard = new PopupWithForm(popupAddCard);
popupCard.closePopup(buttonAddClose);
popupCard.setEventListeners();

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
    popupCard.closePopup(popupAddCard);
}

//Информация о пользователе
const userInfo = new UserInfo ({name: profileName, description: profileDescription });

//Редактирование профиля
const popupEditProfile = new PopupWithForm (popupProfile,
    () => {
        inputName.value = userInfo.name;
        inputDescription.value = userInfo.description;
        userInfo.setUserInfo();
        popupEditProfile.closePopup(popupProfile);
});
popupEditProfile.closePopup(popupProfile);
popupEditProfile.setEventListeners();


//Сохраняет Изменение профиля
function savePopupProfile(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value; 
    profileDescription.textContent = inputDescription.value; 
    popupEditProfile.closePopup(popupProfile);
}

//Открытие попапа редактирования профиля
buttonEdit.addEventListener('click',() => {
    popupEditProfile.openPopup();
});

//Открытие попапа добавления карточки
buttonAddCard.addEventListener('click', () => {
    popupCard.openPopup();
} );

//Кнопка сохранения профиля
popupProfileContainer.addEventListener("submit", savePopupProfile);
//Кнопка сохрянения карточки
popupContainerAdd.addEventListener("submit", saveCard);

const formEditProfileValidator = new FormValidator(validationConfig, popupProfileContainer);
formEditProfileValidator.enableValidation();

const formCardValidator = new FormValidator(validationConfig, popupContainerAdd);
formCardValidator.enableValidation();


