import { deleteCard, likeCard } from '../scripts/api.js';
const currentUserId = "a56bc57fe516685c99a6e3b0";

//Функция создания карточки
function createCard(data, onDelete, onLike, openImage) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card');
  const newCard = cardElement.cloneNode(true);

  const newCardImage = newCard.querySelector('.card__image');
  newCardImage.src = data.link;
  newCardImage.alt = data.name;
  newCard.querySelector('.card__title').textContent = data.name;

  // Убираем иконку удаления, если карточка не создана текущим пользователем

  const cardDeleteButton = newCard.querySelector('.card__delete-button');
  if (currentUserId === data.owner._id) {
    cardDeleteButton.style.display = 'block';
    cardDeleteButton.addEventListener('click', function () {
      onDelete(newCard, data._id);
    });
  } else {
    cardDeleteButton.style.display = "none";
  }

  // Указываем количество лайков
  const likesCount = newCard.querySelector('.likes');
  likesCount.textContent = data.likes.length;
  const cardLikeButton = newCard.querySelector('.card__like-button');
  likesCount.textContent = data.likes.length;

  // Проверяем, поставлен ли лайк текущим пользователем
  const isLiked = data.likes.some(element => element._id === currentUserId);
  if (isLiked) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }

  // Обработчик клика на кнопку лайка
  cardLikeButton.addEventListener('click', function () {
    const isActive = cardLikeButton.classList.toggle('card__like-button_is-active');
    likesCount.textContent = isActive ? parseInt(likesCount.textContent) + 1 : parseInt(likesCount.textContent) - 1;
    if (isActive) {
      data.likes.push(currentUserId);
      handleLikeCard('PUT', data._id);
    } else {
      data.likes = data.likes.filter(like => like._id !== currentUserId);
      handleLikeCard('DELETE', data._id);
    }
  });

  newCardImage.addEventListener('click', function (e) {
    openImage(data.link, data.name);
  });

  return newCard;
};

function handleDeleteCard(cardElement, cardId) {
  deleteCard(cardId).then(() => {
    cardElement.remove();
  });
}

function handleLikeCard(method, cardId) {
  likeCard(method, cardId);
}

export { createCard, handleDeleteCard, handleLikeCard };
