// Функция для включения валидации всех форм
function enableValidation({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }) {
  const forms = document.querySelectorAll(formSelector);

  forms.forEach(form => {
    const buttonElement = form.querySelector(submitButtonSelector);
    const inputElements = form.querySelectorAll(inputSelector);

    // Проверяем состояние кнопки при вводе
    inputElements.forEach(input => {
      input.addEventListener('input', () => {
        toggleButtonState(inputElements, buttonElement, inactiveButtonClass);
        if (!input.validity.valid) {
          showError(input, inputErrorClass, errorClass);
        } else {
          hideError(input, inputErrorClass, errorClass);
        }
      });
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const inputs = form.querySelectorAll(inputSelector);

      inputs.forEach(input => {
        if (!input.validity.valid) {
          showError(input, inputErrorClass, errorClass);
        } else {
          hideError(input, inputErrorClass, errorClass);
        }
      });
    });
  });
}

// Отображение ошибки
function showError(input, inputErrorClass, errorClass) {
  const errorElement = input.nextElementSibling;
  input.classList.add(inputErrorClass);
  const customMessage = input.dataset.errorMessage || input.validationMessage;
  errorElement.textContent = customMessage;
  errorElement.classList.add(errorClass);
}

// Скрытие ошибки
function hideError(input, inputErrorClass, errorClass) {
  const errorElement = input.nextElementSibling;
  input.classList.remove(inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
}

// Очистка ошибок при открытии форм
function clearValidation(form, { inputSelector, inputErrorClass, errorClass }) {
  const inputs = form.querySelectorAll(inputSelector);
  inputs.forEach(input => {
    hideError(input, inputErrorClass, errorClass);
  });
}

// Проверка на наличие незаполненных полей
function hasInvalidInput(inputList) {
  return Array.from(inputList).some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// Функция для переключения состояния кнопки
function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList) || areInputsEmpty(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

// Функция для проверки, когда инпуты пустые
function areInputsEmpty(inputList) {
  return Array.from(inputList).every((inputElement) => {
    return inputElement.value === ''; // Пусто ли поле
  });
}

export { enableValidation, showError, hideError, clearValidation, hasInvalidInput, toggleButtonState, areInputsEmpty }


