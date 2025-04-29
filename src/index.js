// Подключение стилей
import './vendor/normalize.css';
import './vendor/fonts.css';
import './blocks/page/page.css'; // и т.д. стили блоков
import './pages/index.css'; // общая стилизация страницы


// Импорт картинок
import logo from './images/logo.svg';
import avatar from './images/avatar.jpg';

// Установка картинок через JS
const logoImg = document.querySelector('.logo');
if (logoImg) logoImg.src = logo;

const avatarImg = document.querySelector('.profile__image');
if (avatarImg) avatarImg.style.backgroundImage = `url(${avatar})`;

// Импорт скриптов
import './scripts/index.js';
import './scripts/cards.js';