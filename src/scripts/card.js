// @todo: Функция создания карточки
//устанавливаем данные карточки и обработчик клика по корзинке удаления

function createCard(data, onDelete, onLike, openImage) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card');
  const newCard = cardElement.cloneNode(true);

  const newCardImage = newCard.querySelector('.card__image');
  newCardImage.src = data.link;
  newCardImage.alt = data.name;

  newCard.querySelector('.card__title').textContent = data.name;

  const cardDeleteButton = newCard.querySelector('.card__delete-button');
  cardDeleteButton.addEventListener('click', function () {
      onDelete(newCard);
  });

  const cardLikeButton = newCard.querySelector('.card__like-button');
  cardLikeButton.addEventListener('click', function () {
    onLike(cardLikeButton);
  });

  newCardImage.addEventListener('click', function (e) {
    openImage(data.link, data.name);
    e.preventDefault();
  });

return newCard;
};

// @todo: Функция удаления карточки
function handleDeleteCard(cardElement) {
  cardElement.remove();
};

// Функция лайка карточки
function handleLikeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
};

export { createCard, handleDeleteCard, handleLikeCard };
