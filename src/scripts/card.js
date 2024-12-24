import { deleteCard, likeCard } from '../scripts/api.js';

//Функция создания карточки
function createCard(data, onDelete, onLike, openImage, currentUserId) {
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
    const isActive = cardLikeButton.classList.contains("card__like-button_is-active");
    const method = isActive ? 'DELETE' : 'PUT';

    likeCard(method, data._id)
      .then(data => {
        cardLikeButton.classList.toggle('card__like-button_is-active');
        likesCount.textContent = data.likes.length;
      })
      .catch(error => console.error('Ошибка при обработке лайка:', error));
  });

  newCardImage.addEventListener('click', function (e) {
    openImage(data.link, data.name);
  });

  return newCard;
};

function handleDeleteCard(cardElement, cardId) {
  deleteCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch(error => console.error('Ошибка при удалении карточки:', error));
}

export { createCard, handleDeleteCard };
