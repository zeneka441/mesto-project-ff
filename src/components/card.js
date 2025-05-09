import { deleteCardFromServer, addLike, removeLike } from "./api";

export function createCard(cardData, handleDelete, handleLike, cardClick, currentUserId) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCount = cardElement.querySelector(".card__like-counter");
  likeCount.textContent = Array.isArray(cardData.likes)
    ? cardData.likes.length : 0;

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCount.textContent = cardData.likes.length;

  // Проверяем, лайкал ли пользователь
  if (cardData.likes.some((user) => user._id === currentUserId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  // Проверяем, является ли текущий пользователь владельцем карточки
  if (cardData.owner && cardData.owner._id === currentUserId) {
    deleteButton.addEventListener("click", () =>
      handleDelete(cardData._id, cardElement)
    );
  } else {
    deleteButton.remove();
  }

  likeButton.addEventListener("click", () =>
    handleLike(cardData._id, likeButton, likeCount)
  );
  cardImage.addEventListener("click", cardClick);

  return cardElement;
}

export function deleteCard(cardId, cardElement) {
  deleteCardFromServer(cardId).then(() => {
    cardElement.remove();
  })
  .catch((err) => {
    console.error("Ошибка при удалении карточки:", err);
  });
}

export function handleLike(cardId, likeButton, likeCountElement) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");

  const action = isLiked ? removeLike : addLike;

  action(cardId).then((updatedCard) => {
    likeCountElement.textContent = updatedCard.likes.length;
    likeButton.classList.toggle("card__like-button_is-active", !isLiked);
  })
  .catch((err) => {
    console.error("Ошибка при изменении лайка:", err);
  });
}
