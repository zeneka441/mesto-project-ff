import { initialCards } from "./cards.js";
import { createCard, deleteCard, handleLike } from "../components/card.js";
import { openModal, closeModal } from "../components/modal.js";

// DOM узлы
// Карточки
const cardsContainer = document.querySelector(".places__list");

// Попап редактирования профиля
const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");
const closeEditButton = editPopup.querySelector(".popup__close");

// Профиль
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

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

// Функция создания карточки
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, deleteCard, handleLike, cardClick);
  cardsContainer.append(cardElement);
});

// Фнкция открытия попапа профиля
editButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openModal(editPopup);
});

// Функция закрытия попапа профиля
closeEditButton.addEventListener("click", () => closeModal(editPopup));

// Функция сабмита информации профиля
profileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(editPopup);
});

// Функция открытия попапа добавления карточки
addButton.addEventListener("click", () => openModal(addPopup));

// Функция закрытия попапа добавления карточки
closeAddButton.addEventListener("click", () => closeModal(addPopup));

// Функция сабмита новой карточки
cardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const newCard = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };

  const cardElement = createCard(newCard, deleteCard, handleLike, cardClick);
  cardsContainer.prepend(cardElement);

  closeModal(addPopup);
  cardForm.reset();
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

// Закрытие попапа по клику на Esc
document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) closeModal(openedPopup);
  }
});

// Закрытие попапа по клику на оверлей
document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target === popup) {
      closeModal(popup);
    }
  });
});
