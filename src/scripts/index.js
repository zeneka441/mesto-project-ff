import { createCard, deleteCard, handleLike } from "../components/card.js";
import { openModal, closeModal } from "../components/modal.js";
import { enableValidation, clearValidation } from "../components/validation.js";
import {
  getUserInfo,
  getInitialCards,
  updateUserInfo,
  addNewCard,
} from "../components/api.js";

// Конфигурация валидации
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

// DOM узлы
const cardsContainer = document.querySelector(".places__list");

// Попап редактирования аватара
const avatarPopup = document.querySelector(".popup_type_avatar");
const avatarForm = avatarPopup.querySelector(".popup__form");
const openAvatarButton = document.querySelector(".profile__avatar-overlay");
const closeAvatarButton = avatarPopup.querySelector(".popup__close");


// Попап редактирования профиля
const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");
const closeEditButton = editPopup.querySelector(".popup__close");

// Профиль
let currentUserId;
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const avatarImg = document.querySelector(".profile__image");

Promise.all([getUserInfo(), getInitialCards()]).then(([userData, cards]) => {
  currentUserId = userData._id;

  // Устанавливаем информацию о пользователе в профиль
  profileName.textContent = userData.name;
  profileDescription.textContent = userData.about;
  avatarImg.style.backgroundImage = `url(${userData.avatar})`;

  // Рендер карточек
  cards.forEach((cardData) => {
    const cardElement = createCard(
      cardData,
      deleteCard,
      handleLike,
      cardClick,
      currentUserId
    );
    cardsContainer.append(cardElement);
  });
});

// Попап редактирования профиля
const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(
  ".popup__input_type_description"
);
const profileForm = editPopup.querySelector(".popup__form");

// Попап добавления карточки
const addButton = document.querySelector(".profile__add-button");
const addPopup = document.querySelector(".popup_type_new-card");
const closeAddButton = addPopup.querySelector(".popup__close");

const cardForm = addPopup.querySelector(".popup__form");
const cardNameInput = cardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = cardForm.querySelector(".popup__input_type_url");

// Попап с картинкой
const imagePopup = document.querySelector(".popup_type_image");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");
const closeImageButton = imagePopup.querySelector(".popup__close");

// Функция открытия попапа обновления аватара
openAvatarButton.addEventListener("click", () => {
  openModal(avatarPopup);
});

// Функция закрытия попапа обновления аватара
closeAvatarButton.addEventListener("click", () => closeModal(avatarPopup));

// Фнкция открытия попапа профиля
editButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  clearValidation(profileForm, validationConfig);

  // Удаляем ошибки валидации при открытии попапа
  nameInput.dispatchEvent(new Event("input"));
  descriptionInput.dispatchEvent(new Event("input"));
  openModal(editPopup);
});

// Функция закрытия попапа профиля
closeEditButton.addEventListener("click", () => closeModal(editPopup));

// Функция сабмита информации профиля
profileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = nameInput.value;
  const about = descriptionInput.value;
  updateUserInfo(name, about).then((updatedUser) => {
    profileName.textContent = updatedUser.name;
    profileDescription.textContent = updatedUser.about;
    closeModal(editPopup);
  });
});

// Функция открытия попапа добавления карточки
addButton.addEventListener("click", () => {
  cardForm.reset();
  clearValidation(cardForm, validationConfig);
  openModal(addPopup);
});

// Функция закрытия попапа добавления карточки
closeAddButton.addEventListener("click", () => closeModal(addPopup));

// Функция добавления новой карточки
cardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const name = cardNameInput.value;
  const link = cardLinkInput.value;

  addNewCard(name, link).then((cardData) => {
    const cardElement = createCard(
      cardData,
      deleteCard,
      handleLike,
      cardClick,
      currentUserId
    );
    cardsContainer.prepend(cardElement);

    closeModal(addPopup);
    cardForm.reset();
    clearValidation(cardForm, validationConfig);
  });
});

// Функция открытия попапа с картинкой
function cardClick(evt) {
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupCaption.textContent = evt.target.alt;
  openModal(imagePopup);
}

// Функция закрытия попапа с картинкой
closeImageButton.addEventListener("click", () => closeModal(imagePopup));

enableValidation(validationConfig);
