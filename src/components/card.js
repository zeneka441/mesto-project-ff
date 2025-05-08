export function createCard(cardData, deleteCard, handleLike, cardClick, currentUserId) {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const likeButton = cardElement.querySelector(".card__like-button");
    const likeCount = cardElement.querySelector(".card__like-counter");
    likeCount.textContent = Array.isArray(cardData.likes) ? cardData.likes.length : 0;

  
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    likeCount.textContent = cardData.likes.length;
  
    // Проверяем, является ли текущий пользователь владельцем карточки
    if (cardData.owner && cardData.owner._id === currentUserId) {
      deleteButton.addEventListener("click", deleteCard);
    } else {
      deleteButton.remove();
    }
    likeButton.addEventListener("click", (evt) => handleLike(evt, likeCount));
    cardImage.addEventListener("click", cardClick);
  
    return cardElement;
  }
  
  export function deleteCard(evt) {
    const cardElement = evt.target.closest(".card");
    cardElement.remove();
  }
  
  export function handleLike(evt) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
  