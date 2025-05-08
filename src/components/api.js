const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-37",
  headers: {
    authorization: "eee1b086-5810-4855-8676-142447443068",
    "Content-Type": "application/json",
  },
};

// Функция для загрузки данных профиля
export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });
};

// Функция для загрузки карточек
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });
};

// Функция обновления данных профиля
export const updateUserInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ name, about }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });
};

// Функция добавления новой карточки
export const addNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({ name, link }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });
};