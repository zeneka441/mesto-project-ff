import './pages/index.css';


// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы
const cardsContainer = document.querySelector('.places__list');

//_____________________

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
initialCards.forEach(initialCards => {
  const cardElement = createCard(initialCards, deleteCard);
  cardsContainer.append(cardElement);
});