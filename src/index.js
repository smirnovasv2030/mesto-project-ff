import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, handleDeleteCard, handleLikeCard } from './scripts/card.js';
import { openPopup, closePopup, handleEscClose } from './scripts/modal.js';

const cardsContainer = document.querySelector('.places__list');
const modalWindows = document.querySelectorAll('.popup');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');

const formElement = document.forms.edit_profile;
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;
const profileInfo = document.querySelector('.profile__info');
const profileTitle = profileInfo.querySelector('.profile__title');
const profileDescription = profileInfo.querySelector('.profile__description');

// @todo: функция вставки карточки на страницу
function renderCard(card, cardsContainer) {
  cardsContainer.append(card);
  };

// @todo: Вывести карточки на страницу, используем цикл forEach
initialCards.forEach(initialCard => {
  const card = createCard(initialCard, handleDeleteCard, handleLikeCard, openImagePopup);
  renderCard(card, cardsContainer);
  });

profileEditButton.addEventListener('click', function (e) {
  const popupTypeEdit = document.querySelector('.popup_type_edit');
  openPopup(popupTypeEdit);
  e.preventDefault();
  profileInfoForm();
});

profileAddButton.addEventListener('click', function (e) {
  const popupTypeNewCard = document.querySelector('.popup_type_new-card');
  openPopup(popupTypeNewCard);
  e.preventDefault();
});

modalWindows.forEach((popup) => {
  popup.addEventListener('click',
    (event) => {
      if(event.target.classList.contains('popup__close') || event.target.classList.contains('popup')) {
        closePopup(popup);
      }
    });
  });

//редактирование профиля
function profileInfoForm() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
};

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
};

formElement.addEventListener('submit', handleFormSubmit);

//добавление новой карточки в начало
const formNewPlace = document.forms.new_place;
const placeNameInput = formNewPlace.elements.place_name;
const linkInput = formNewPlace.elements.link;

formNewPlace.addEventListener('submit', function (event) {
  event.preventDefault();
  const newCardData = {
    name: placeNameInput.value,
    link: linkInput.value
  };
  const card = createCard(newCardData, handleDeleteCard, handleLikeCard, openImagePopup);
  cardsContainer.prepend(card);

  closePopup(document.querySelector('.popup_is-opened'));
  formNewPlace.reset();
});

// Функция открытия модального окна с изображением
function openImagePopup(link, name) {
  popupImage.src = link;
  popupCaption.textContent = name;
  openPopup(popupTypeImage);
};
