// Подключение стилей
import "./pages/index.css";

// Импорт картинок
import logo from "./images/logo.svg";

// Установка картинок через JS
const logoImg = document.querySelector(".logo");
if (logoImg) logoImg.src = logo;

// Импорт скриптов
import "./scripts/index.js";