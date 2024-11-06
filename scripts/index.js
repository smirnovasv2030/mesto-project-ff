const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');
const cardElement = cardTemplate.querySelector('.card');

// @todo: Функция создания карточки
//устанавливаем данные карточки и обработчик клика по корзинке удаления
function createCard(data, onDelete) {

  const newCard = cardElement.cloneNode(true);

  const newCardImage = newCard.querySelector('.card__image');
  newCardImage.src = data.link;
  newCardImage.alt = data.name;

  newCard.querySelector('.card__title').textContent = data.name;

  const cardDeleteButton = newCard.querySelector('.card__delete-button');
  cardDeleteButton.addEventListener('click', function () {
      onDelete(newCard);
  });

return newCard;
};

// @todo: Функция удаления карточки
function handleDeleteCard(cardElement) {
      cardElement.remove();
};

// @todo: функция вставки карточки на страницу
function renderCard(card, cardsContainer) {
  cardsContainer.append(card);//функционал вставки элемента карточки на страницу
};


// @todo: Вывести карточки на страницу, используем цикл forEach
initialCards.forEach(initialCard => {
  const card = createCard(initialCard, handleDeleteCard);
  renderCard(card, cardsContainer);
});
