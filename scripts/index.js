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

initialCards.forEach(item => elementBox.prepend(createCard(item)));

function createCard(item) {
    
    const elementCard = elementTemplate.cloneNode(true);
    const buttonLike = elementCard.querySelector('.element__like');
    const buttonDelete = elementCard.querySelector('.element__button-delete');
    const pictureBox = elementCard.querySelector('.element__image');

    buttonLike.addEventListener('click', (likeCard));
    buttonDelete.addEventListener('click', (deleteCard));
    pictureBox.addEventListener('click', (openPopupImg));

    elementCard.querySelector('.element__image').src = item.link;
    elementCard.querySelector('.element__title').textContent = item.name;

    function openPopupImg() {
        openPopup(popupImg);
        picture.src = item.link;
        pictureCaption.textContent = item.name;
    }
    return elementCard;
}

function likeCard(evt) {
    evt.preventDefault();
    evt.target.classList.toggle('element__like_active');
}

function saveCard(evt) {
    evt.preventDefault();
    const cardData = {
        name: inputNameCard.value,
        link: inputLink.value
    };
    const elementCard = createCard(cardData);
    popupContainerAdd.reset();
    setButtonState (buttonAddCard, false, validationConfig);
    elementBox.prepend(elementCard);
    closePopup(popupAddCard);
}

function deleteCard(evt) {
    evt.preventDefault();
    evt.target.closest('.element').remove();
}

function openPopupProfile(){
    openPopup(popupProfile);
    inputName.value = name.textContent; 
    inputDescription.value = description.textContent;
}

function closeOverlay(evt) {
    if (evt.target !== evt.currentTarget) {
        return;
    }
    closePopup(evt.target);
}
  

function closeEsc(evt) {
   if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
    }
}


function openPopup(popup) {
    popup.classList.add('popup_opened');
    popup.addEventListener('mousedown', closeOverlay);
    document.addEventListener('keydown', closeEsc);
    
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    popup.removeEventListener('mousedown', closeOverlay);
    document.removeEventListener('keydown', closeEsc);
}

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