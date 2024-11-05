// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardContainer = document.querySelector('.places__list');

initialCards.forEach(function (element) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardDescription = cardElement.querySelector('.card__description');

  cardElement.querySelector('.card__image').src = element.link;
  cardElement.querySelectorAll('.card__description').textContent = element.name;
  cardElement.querySelector('.card__delete-button').textContent = element.button;
  cardDescription.querySelector('.card__title').textContent = element.name;

  cardContainer.append(cardElement);

  const cardDelete = cardElement.querySelector('.card__delete-button');

  cardDelete.addEventListener('click', function () {
  cardElement.remove();
})
});

