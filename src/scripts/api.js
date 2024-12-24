// Задаем токен и идентификатор группы
const token = '054917ed-dd3b-4ccc-9749-da464256edd2';
const cohortId = 'wff-cohort-29';
const config = {
  baseUrl: `https://nomoreparties.co/v1/${cohortId}`,
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  }
}

// Функция для получения информации о пользователе
export function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(res => {
    if (!res.ok) {
      throw new Error('Ошибка получения информации о пользователе');
    }
    return res.json();
  });
}

// Функция для загрузки карточек
export function loadCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(res => {
    if (!res.ok) {
      throw new Error('Ошибка загрузки карточек');
    }
    return res.json();
  });
}

// Функция для обновления аватара
export function updateAvatar(avatarUrl) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ avatar: avatarUrl })
  })
  .then(res => {
    if (!res.ok) {
      throw new Error('Ошибка при обновлении аватара: ' + res.statusText);
    }
    return res.json();
  });
}

// Функция для обновления информации о пользователе
export function updateUserInfo(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ name, about })
  })
  .then(res => {
    if (!res.ok) {
      throw new Error('Ошибка при обновлении информации о пользователе');
    }
    return res.json();
  });
}

//Функция для добавления карточки
export function addCard(newCardData) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(newCardData)
  })
  .then(res => {
    if (!res.ok) {
      throw new Error('Ошибка при добавлении карточки');
    }
    return res.json();
  });
}

// Функция для удаления карточки
export function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(res => {
    if (!res.ok) {
      throw new Error('Ошибка при удалении карточки');
    }
    return res.json();
  });
}

// Функция для отправки PUT/DELETE-запросов для лайков
export function likeCard(method, cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: method,
    headers: config.headers,
  })
  .then(res => {
    if (!res.ok) {
      throw new Error('Ошибка при лайке карточки');
    }
    return res.json();
  });
}
