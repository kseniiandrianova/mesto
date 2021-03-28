import './index.css';

import { FormValidator } from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithFormDelete from '../components/PopupWithFormDelete.js';

let userId;


import {
    popupProfile,
    popupAddCard,
    popupImg,
    popupAvatar,
    popupCardDelete,
    buttonEdit,
    buttonAddCard,
    buttonAddClose,
    buttonEditAvatar,
    buttonYes,
    buttonDeleteCard,
    popupProfileContainer,
    popupContainerAdd,
    popupAvatarContainer,
    popupDeleteContainer,
    elementBox,
    inputName,
    inputDescription,
    inputNameCard,
    inputLink,
    inputAvLink,
    profileName,
    profileDescription,
    profileAvatar,
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



  export const api = new Api({
    url:"https://mesto.nomoreparties.co/v1/cohort-20/",
    headers: {
        'Content-Type': 'application/json',
        authorization: '7096c540-753a-4606-97be-c9a6e54dbbb4',
    }
});


Promise.all([
    api.getInitalCards(),
    api.getProfileInfo()
])
   .then(([cardData, userData] ) => {
       console.log([cardData, userData])
       userId = userData._id;
       sectionList(cardData);
       //inputName.value = userData.name;
       //inputDescription.value = userData.about;
       //inputAvLink.value = userData.avatar;
       userInfo.setUserInfo(userData)
       //userInfo.setUserAvatar(userData.avatar)
   })
    .catch((err) => {
        console.log(err)
    })


const popupDeleteCard = new PopupWithFormDelete(popupCardDelete);
popupDeleteCard.setEventListeners();


const popupWithImage = new PopupWithImage(popupImg);


popupWithImage.setEventListeners();



//Добавление карточек
function sectionList (result) {
    const cardList = new Section ({
        items: result,
        renderer: (item) => {
        const card = createCard(item)
        cardList.addItem(card);
        }, 
    }, '.elements');

    cardList.renderItems();
    
}

//Создание новой карточки
function createCard(item) {
    const card = new Card(item, userId, cardSelector, openPopupImg, openPopupDelete, api);
    return card.generateCard();
}


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
popupCard.setEventListeners();

function prependCard (card) {
    elementBox.prepend(card)
}


//Добавление новой карточки
function saveCard(evt) {
    evt.preventDefault();
    textLoader(popupAddCard, true, 'Создание...');
    const cardData = {
        name: inputNameCard.value,
        link: inputLink.value
    };
    api
    .addCard(cardData.name, cardData.link)
    .then((item) => {
        //const card = new Card(item, userId, cardSelector, openPopupImg, 
        //   openPopupDelete, api);
        const elementCard = createCard(item);
        prependCard(elementCard);
        //cardList.addItemPrepend(elementCard);
        popupCard.closePopup(popupAddCard);
    })
    .catch((err) => {
        console.log(err)
    })
    .finally(() => {
        textLoader(popupAddCard, false, 'Создать');
        
    })
    
    popupContainerAdd.reset();
    const popupAddSaveButton = popupContainerAdd.querySelector('.popup__button_disabled');
    
}


function openPopupDelete(_card) {
    popupDeleteCard.openPopup(_card);
    
}


//Информация о пользователе
const userInfo = new UserInfo (".profile__name", ".profile__description", ".profile__pic");


//Редактирование профиля
const popupEditProfile = new PopupWithForm (popupProfile,
    () => {
        inputName.value = userInfo.name;
        inputDescription.value = userInfo.description;
        userInfo.setUserInfo();
        popupEditProfile.closePopup(popupProfile);
    }
    );

popupEditProfile.setEventListeners();

//Редактирование аватара
const popupAvatarProfile = new PopupWithForm(popupAvatar,
    () => {
        inputAvLink.value = userInfo.avatar;
        userInfo.setUserAvatar();
        popupAvatarProfile.closePopup(popupAvatar);

    }
);
popupAvatarProfile.setEventListeners();


//Сохраняет Изменение профиля
function savePopupProfile(evt) {
    evt.preventDefault();
    textLoader(popupProfile, true, 'Сохранение...');
    const userData = {
        name: inputName.value,
        description: inputDescription.value
    }

    api
    .saveProfileInfo(userData)
    .then((res) => {
        userInfo.setUserInfo(res);
        popupEditProfile.closePopup(popupProfile);
    })
    .catch((err) => {
        console.log(err)
    })
    .finally(()=> {
       
        textLoader(popupProfile, false, 'Сохранить');
    })
}

//Сохранение аватара
function savePopupAvatar (evt) {
    evt.preventDefault();
    textLoader(popupAvatar, true, 'Сохранение...');
    const userData = {
            avatar: inputAvLink.value
    }

    api
    .saveAvatar(userData)
    .then((res) => {
        userInfo.setUserInfo(res);
        popupAvatarProfile.closePopup(popupAvatar);
    })
    .catch((err) => {
        console.log(err)
    })
    .finally(()=> {
        
        textLoader(popupProfile, false, 'Сохранить');
    })
}

function textLoader(popupForm, status, textLoad) {  
    if (status) {
      popupForm.querySelector('.popup__button-save').textContent = textLoad;   
    }
    else {
      popupForm.querySelector('.popup__button-save').textContent = textLoad;
    }  
  }


//Открытие попапа редактирования профиля
buttonEdit.addEventListener('click',() => {
    popupEditProfile.openPopup();
});

//Открытие попапа добавления карточки
buttonAddCard.addEventListener('click', () => {
    popupCard.openPopup();
} );

//Открытие попапа аватар
buttonEditAvatar.addEventListener('click', () => {
    popupAvatarProfile.openPopup();
} );



//Кнопка сохранения профиля
popupProfileContainer.addEventListener("submit", savePopupProfile);
//Кнопка сохрянения карточки
popupContainerAdd.addEventListener("submit", saveCard);
//Кнопка сохранения аватара
popupAvatarContainer.addEventListener("submit", savePopupAvatar);

//popupDeleteContainer.addEventListener("submit", cardDelete);


const formEditProfileValidator = new FormValidator(validationConfig, popupProfileContainer);
formEditProfileValidator.enableValidation();

const formCardValidator = new FormValidator(validationConfig, popupContainerAdd);
formCardValidator.enableValidation();

const formAvatarProfileValidator = new FormValidator(validationConfig, popupAvatarContainer);
formAvatarProfileValidator.enableValidation();

