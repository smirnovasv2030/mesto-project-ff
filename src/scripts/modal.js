//функция открытия попапов
function openPopup(popupElement) {
  popupElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
};

//функция закрытия попапов
const closePopup = (popup) => {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscClose);
};

function handleEscClose(event) {
  if(event.key === 'Escape') {
    const openModalWindow = document.querySelector('.popup_is-opened')
    closePopup(openModalWindow);
  }
};


export { openPopup, closePopup, handleEscClose };
