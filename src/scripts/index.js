import { initialCards } from "./cards.js";

// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// DOM узлы
const cardsContainer = document.querySelector(".places__list");

// Функция создания карточки
function createCard(initialCards, deleteCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  cardImage.src = initialCards.link;
  cardImage.alt = initialCards.name;
  cardTitle.textContent = initialCards.name;
  
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteCard);
  return cardElement;
}

// Функция удаления карточки
function deleteCard(evt) {
  const eventTarget = evt.target;
  const cardElement = eventTarget.closest('.card');
  cardElement.remove();
}
//_____________________

// Вывести карточки на страницу
initialCards.forEach((initialCards) => {
  const cardElement = createCard(initialCards, deleteCard);
  cardsContainer.append(cardElement);
});

//___________________________________________
// РЕДАКТИРОВАНИЕ ПРОФИЛЯ

// Функция открытия попапа редактирования профиля и заполнения полей формы
const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(
  ".popup__input_type_description"
);

editButton.addEventListener("click", function () {
  editPopup.classList.add("popup_is-opened");
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
});

// Функция закрытия попапа редактирования профиля
const closeEditButton = editPopup.querySelector(".popup__close");
closeEditButton.addEventListener("click", function () {
  editPopup.classList.remove("popup_is-opened");
});

// Функция закрытия попапа редактирования профиля кликом на оверлей
editPopup.addEventListener("click", function (event) {
  if (event.target === editPopup) {
    editPopup.classList.remove("popup_is-opened");
  }
});

// Функция закрытия попапа редактирования профиля кнопкой Esc
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    editPopup.classList.remove("popup_is-opened");
  }
});

editButton.addEventListener("click", function () {
  // Открываем попап
  editPopup.classList.add("popup_is-opened");

  // Заполняем поля формы текущими данными
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
});

// ____________________________________________
// Функция сохранения изменений профиля

// Находим форму в DOM
const formElement = document.querySelector(".popup__form");
// Находим поля формы в DOM

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  editPopup.classList.remove("popup_is-opened");
}

// Прикрепляем обработчик к форме:
formElement.addEventListener("submit", handleFormSubmit);

// ____________________________________________

// Функция открытия формы добавления карточки
const addButton = document.querySelector(".profile__add-button");
const addPopup = document.querySelector(".popup_type_new-card");

addButton.addEventListener("click", function () {
  addPopup.classList.add("popup_is-opened");
});

// Функция закрытия попапа редактирования профиля
const closeAddButton = addPopup.querySelector(".popup__close");
closeAddButton.addEventListener("click", function () {
  addPopup.classList.remove("popup_is-opened");
});

// ____________________________________________
// Функция добавления новой

const cardForm = addPopup.querySelector(".popup__form");
const cardNameInput = addPopup.querySelector(".popup__input_type_card-name");
const cardLinkInput = addPopup.querySelector(".popup__input_type_url");

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const newCard = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };

  const cardElement = createCard(newCard, deleteCard);
  cardsContainer.prepend(cardElement);

  addPopup.classList.remove("popup_is-opened");
  cardForm.reset();
}

// Прикрепляем обработчик к форме:
cardForm.addEventListener("submit", handleAddCardSubmit);

// ____________________________________________
// Функция лайка карточки

// ____________________________________________
