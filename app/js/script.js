"use strict";
const burger = document.querySelector(".burger"),
   header = document.querySelector(".header"),
   body = document.querySelector("body");


// ! Nav-item 
const navItems = document.querySelectorAll('.nav-item');

navItems.forEach(navItem => {
   navItem.addEventListener('click', () => {
      navItems.forEach(item => {
         item.classList.remove('current');
      });
      navItem.classList.add('current');
   });
});

navItems[2].classList.add('current');

// ! Pagination 

// Получаем все элементы с классом ".dashboard__item-main"
const itemMainElements = document.querySelectorAll('.dashboard__item-main');

// Функция для обработки события при нажатии на элемент ".dashboard__item-main"
function handleItemClick(event) {
   // Удаляем класс актив у всех элементов
   itemMainElements.forEach(element => {
      element.classList.remove('current');
   });

   // Добавляем класс актив только к текущему элементу
   const currentItem = event.currentTarget;
   currentItem.classList.add('current');
}

// Добавляем обработчик события к каждому элементу ".dashboard__item-main"
itemMainElements.forEach(element => {
   element.addEventListener('click', handleItemClick);
});

// ! Меняем тему 
// Находим кнопку по классу
const swipeButton = document.querySelector('.dashboard__swipe');

// Добавляем обработчик события на клик по кнопке
swipeButton.addEventListener('click', function () {
   // Проверяем, есть ли уже класс darken на body
   if (body.classList.contains('darken')) {
      // Если класс есть, убираем его
      body.classList.remove('darken');
   } else {
      // Если класса нет, добавляем его
      body.classList.add('darken');
   }
});
