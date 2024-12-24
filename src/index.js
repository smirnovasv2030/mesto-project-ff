import { data } from 'jquery';
import './pages/index.css';
import { getUserInfo, loadCards, updateAvatar, updateUserInfo, addCard } from './scripts/api.js';
import { createCard, handleDeleteCard } from './scripts/card.js';
import { openPopup, closePopup, handleEscClose } from './scripts/modal.js';
import { enableValidation, showError, hideError, clearValidation, hasInvalidInput, toggleButtonState, areInputsEmpty } from './scripts/validation.js';
import { deleteCard, likeCard } from './scripts/api.js';

const cardsContainer = document.querySelector('.places__list');
const modalWindows = document.querySelectorAll('.popup');
const popupTypeEditAvatar = document.querySelector('.popup_type_edit_avatar');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const profileAvatarEditButton = document.querySelector('.profile__image');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');

const formEditProfile = document.forms.edit_profile;
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;
const profileInfo = document.querySelector('.profile__info');
const profileTitle = profileInfo.querySelector('.profile__title');
const profileDescription = profileInfo.querySelector('.profile__description');

const formEditAvatar = document.forms.edit_avatar;
const linkAvatarInput = formEditAvatar.elements.link_avatar;
const editAvatarButton = formEditAvatar.querySelector('.popup__button');
const formAvatarElement = popupTypeEditAvatar.querySelector('.popup__form');

const formNewPlace = document.forms.new_place;
const placeNameInput = formNewPlace.elements.place_name;
const linkInput = formNewPlace.elements.link;
const formNewPlacebutton = formNewPlace.querySelector('.popup__button');

let currentUserId;

// Функция для загрузки данных пользователя, аватара и карточек параллельно
function loadUserData() {
  return Promise.all([getUserInfo(), loadCards()])
    .then(([userData, initialCards]) => {
      currentUserId = userData._id;
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      profileAvatarEditButton.style.backgroundImage = `url("${userData.avatar}")`;
      initialCards.forEach(cardData => {
        renderCard(cardData);
      });
    })
    .catch(error => console.error('Error:', error));
}
loadUserData();

// Функция для рендеринга карточек
function renderCard(card) {
  const cardElement = createCard(card, handleDeleteCard, likeCard, openImagePopup, currentUserId);
  cardsContainer.append(cardElement);
}

//слушатели для открытия попапов
profileAvatarEditButton.addEventListener('click', function (e) {
  openPopup(popupTypeEditAvatar);
  clearValidation(popupTypeEditAvatar, {
    inputSelector: '.popup__input',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });
});

profileEditButton.addEventListener('click', function (e) {
  openPopup(popupTypeEdit);
  profileInfoForm();
  clearValidation(popupTypeEdit, {
    inputSelector: '.popup__input',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });
});

profileAddButton.addEventListener('click', function (e) {
  openPopup(popupTypeNewCard);
  clearValidation(popupTypeNewCard, {
    inputSelector: '.popup__input',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });
});

modalWindows.forEach((popup) => {
  popup.addEventListener('click',
    (event) => {
      if(event.target.classList.contains('popup__close') || event.target.classList.contains('popup')) {
        closePopup(popup);
    }
  });
});

// Функция для обновления аватара
function updateAvatarHandler() {
  setButtonLoadingState(editAvatarButton, true);
  const avatarUrl = linkAvatarInput.value;

  updateAvatar(avatarUrl)
  .then(data => {
    profileAvatarEditButton.style.backgroundImage = `url("${data.avatar}")`;
    closePopup(popupTypeEditAvatar);
    formEditAvatar.reset();
      toggleButtonState(formEditAvatar.querySelectorAll('.popup__input'), editAvatarButton, 'popup__button_disabled');
  })
  .catch(error => console.error('Ошибка при обновлении аватара:', error))
  .finally(() => setButtonLoadingState(editAvatarButton, false));
}

toggleButtonState(formEditAvatar.querySelectorAll('.popup__input'), editAvatarButton, 'popup__button_disabled');

// Отправка формы
formAvatarElement.addEventListener('submit', function(event) {
  event.preventDefault();
  updateAvatarHandler();
});

//редактирование профиля
function profileInfoForm() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
};

const formEditProfileButton = formEditProfile.querySelector('.popup__button');
function handleFormEditProfileSubmit(evt) {
  evt.preventDefault();
  setButtonLoadingState(formEditProfileButton, true);
  updateUserInfo(nameInput.value, jobInput.value)
  .then(data => {
    profileTitle.textContent = data.name;
    profileDescription.textContent = data.about;
    closePopup(popupTypeEdit);
  })
  .catch(error => console.error('Ошибка:', error))
  .finally(() => setButtonLoadingState(formEditProfileButton, false));
}

formEditProfile.addEventListener('submit', handleFormEditProfileSubmit);

//добавление новой карточки в начало
formNewPlace.addEventListener('submit', function (event) {
  event.preventDefault();

  setButtonLoadingState(formNewPlacebutton, true);
  const newCardData = {
    name: placeNameInput.value,
    link: linkInput.value
  };
  addCard(newCardData)
  .then(newCardData => {
  const card = createCard(newCardData, handleDeleteCard, likeCard, openImagePopup, currentUserId);
  cardsContainer.prepend(card);
  closePopup(popupTypeNewCard);
  formNewPlace.reset();
  toggleButtonState(formNewPlace.querySelectorAll('.popup__input'), formNewPlacebutton, 'popup__button_disabled');
  })
  .catch(error => console.error('Ошибка:', error))
  .finally(() => setButtonLoadingState(formNewPlacebutton, false));
});
toggleButtonState(formNewPlace.querySelectorAll('.popup__input'), formNewPlacebutton, 'popup__button_disabled');

// Функция открытия модального окна с изображением
function openImagePopup(link, name) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openPopup(popupTypeImage);
};

// Включение валидации
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

// Функция для изменения текста кнопки на "Сохранение..."
function setButtonLoadingState(buttonElement, isLoading) {
  if (isLoading) {
    buttonElement.textContent = 'Сохранение...';
    buttonElement.disabled = true;
  } else {
    buttonElement.textContent = 'Сохранить';
    buttonElement.disabled = false;
  }
}
