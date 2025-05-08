export function createCard(cardData, deleteCard, handleLike, cardClick) {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const likeButton = cardElement.querySelector(".card__like-button");
    const likeCount = cardElement.querySelector(".card__like-counter");
  
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    likeCount.textContent = cardData.likes.length;
  
    deleteButton.addEventListener("click", deleteCard);
    // likeButton.addEventListener("click", (evt) => handleLike(evt, likeCount));
    likeButton.addEventListener("click", handleLike);
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
  