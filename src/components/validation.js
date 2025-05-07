export const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  formList.forEach((formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button');

    const showInputError = (inputElement, errorMessage) => {
      const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.add('popup__input_type_error');
      errorElement.textContent = errorMessage;
      errorElement.classList.add('popup__input-error_active');
    };

    const hideInputError = (inputElement) => {
      const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.remove('popup__input_type_error');
      errorElement.classList.remove('popup__input-error_active');
      errorElement.textContent = '';
    };

    const checkInputValidity = (inputElement) => {
      if (!inputElement.validity.valid) {
        let errorMessage = inputElement.validationMessage;
    
        if (inputElement.validity.valueMissing) {
          errorMessage = "Вы пропустили это поле.";
        }
        else if (inputElement.validity.patternMismatch) {
          errorMessage = "Разрешены только латинские и кириллические буквы, знаки дефиса и пробелы.";
        }
    
        showInputError(inputElement, errorMessage);
      } else {
        hideInputError(inputElement);
      }
    };
    

    const hasInvalidInput = () => {
      return inputList.some((inputElement) => !inputElement.validity.valid);
    };

    const toggleButtonState = () => {
      if (hasInvalidInput()) {
        buttonElement.disabled = true;
        buttonElement.classList.add('button_inactive');
      } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove('button_inactive');
      }
    };

    toggleButtonState();

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(inputElement);
        toggleButtonState();
      });
    });

    // formElement.addEventListener('submit', (evt) => {
    //   evt.preventDefault();
    // });
  });
};
