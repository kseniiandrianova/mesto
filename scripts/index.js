let popup = document.querySelector('.popup');
let buttonEdit = document.querySelector('.profile__edit-button');
let buttonClose = document.querySelector('.popup__button-close');
let popupContainer = document.querySelector('.popup__container');
let inputName = document.querySelector('.popup__input_name');
let inputDescription = document.querySelector('.popup__input_description');
let name = document.querySelector('.profile__name');
let description = document.querySelector('.profile__description');


function openPopup() {
    popup.classList.add('popup_opened');
    inputName.value = name.textContent; 
    inputDescription.value = description.textContent;
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function savePopup(evt) {
    evt.preventDefault(); 
    name.textContent = inputName.value; 
    description.textContent = inputDescription.value; 
    closePopup();
}

buttonClose.addEventListener('click', closePopup);
buttonEdit.addEventListener('click', openPopup);
popupContainer.addEventListener("submit", savePopup);