"use strict";
const burger = document.querySelector(".burger"),
   header = document.querySelector(".header"),
   body = document.querySelector("body");

window.addEventListener("load", () => {
   function qs(element) {
      let newEl = document.querySelector(element);
      if (newEl) return newEl;
   }
   function qa(element) {
      let newEl = document.querySelectorAll(element);
      if (newEl) return newEl;
   }

   // ! Burger
   if (burger) {
      body.addEventListener("click", burgerToggle);
      function burgerToggle(e) {
         if (e.target.closest(".burger")) {
            if (burger.classList.contains("active")) {
               burger.classList.remove("active");
               header.classList.remove("active");
               body.classList.remove("lock");
            } else {
               burger.classList.add("active");
               header.classList.add("active");
               body.classList.add("lock");
               window.addEventListener("scroll", closeBurger); // Закрывает бургер при скролле в том случае, когда для Body не задан класс 'lock'
            }
         } else if (!e.target.closest(".burger") && !e.target.closest(".menu")) {
            burger.classList.remove("active");
            header.classList.remove("active");
            body.classList.remove("lock");
            window.removeEventListener("scroll", closeBurger);
         }
      }
      function closeBurger() {
         //Необязательная дополнительная проверка
         if (burger.classList.contains("active")) {
            burger.classList.remove("active");
            menu.classList.remove("active");
            header.classList.remove("active");
            body.classList.remove("lock");
            window.removeEventListener("scroll", closeBurger);
         }
      }
   }

   // ! Spoiler.html
   if (qa(".spoiler")) {
      // ? Если нужно открыть только первый спойлер на странице. Можно прогнать циклом для остальных
      if (qs(".spoiler").classList.contains("opened")) {
         let spoilerWrapper = qa(".spoiler__wrapper")[0];
         spoilerWrapper.style.height = spoilerWrapper.scrollHeight + "px";
      }

      body.addEventListener("click", toggleSpoiler);

      function toggleSpoiler(e) {
         if (e.target.closest(".spoiler__preview")) {
            e.target.closest(".spoiler").classList.toggle("opened");
            let spoilerWrapper = e.target.closest(".spoiler__preview").nextElementSibling;
            if (!e.target.closest(".spoiler").classList.contains("opened")) {
               spoilerWrapper.style.height = null;
            } else {
               spoilerWrapper.style.height = spoilerWrapper.scrollHeight + "px";
            }
         }
      }
   }

   // ! Dropdown 
   const dropdowns = document.querySelectorAll('.dropdown');

   dropdowns.forEach(dropdown => {
      const select = dropdown.querySelector('.dropdown__select');
      const caret = dropdown.querySelector('.dropdown__caret');
      const menu = dropdown.querySelector('.dropdown__menu');
      const options = dropdown.querySelectorAll('.dropdown__item');
      const selected = dropdown.querySelector('.dropdown__selected');

      select.addEventListener('click', () => {
         caret.classList.toggle('caret-rotate');
         menu.classList.toggle('menu-open');
      })
      options.forEach(option => {
         option.addEventListener('click', () => {
            selected.innerText = option.innerText;
            caret.classList.remove('caret-rotate');
            menu.classList.remove('menu-open');
            options.forEach(option => {
               option.classList.remove('dropdown-active');
            })
            option.classList.add('dropdown-active');
         })
      })
   })
});


// ! Accordeon

const previewElements = document.querySelectorAll(".accord__preview");

previewElements.forEach(function (preview) {
   preview.addEventListener("click", toggleAccordion);
});

function toggleAccordion(e) {
   const currentColumn = e.currentTarget.closest(".accord__column");
   const columnText = currentColumn.querySelector(".accord__column-block-text");

   if (currentColumn.classList.contains("opened")) {
      // Если текущий аккордеон уже открыт, закрываем его
      currentColumn.classList.remove("opened");
      columnText.style.height = "0";
   } else {
      // Если текущий аккордеон закрыт, закрываем все остальные и открываем текущий
      const openedColumns = document.querySelectorAll(".accord__column.opened");
      openedColumns.forEach(function (column) {
         column.classList.remove("opened");
         const text = column.querySelector(".accord__column-block-text");
         text.style.height = "0";
      });

      currentColumn.classList.add("opened");
      columnText.style.height = columnText.scrollHeight + "px";
   }
}

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
const buttons = document.querySelectorAll('.pag-btn');

buttons.forEach(button => {
   button.addEventListener('click', () => {
      buttons.forEach(btn => {
         btn.classList.remove('active');
      });
      button.classList.add('active');
   });
});

// Выбор первой кнопки по умолчанию
buttons[0].classList.add('active');


// ! Preloader 
window.addEventListener('DOMContentLoaded', function () {
   var preloaderContainer = document.getElementById('preloader-container');
   var preloader = document.getElementById('preloader');
   var start = null;

   function step(timestamp) {
      if (!start) start = timestamp;
      var progress = timestamp - start;
      preloader.style.transform = 'rotate(' + (progress / 3) + 'deg)';

      if (progress < 1500) {
         window.requestAnimationFrame(step);
      } else {
         preloader.style.opacity = '0';
         setTimeout(function () {
            preloaderContainer.style.display = 'none';
         }, 500 - 1500); // Задержка минус продолжительность анимации
      }
   }

   window.requestAnimationFrame(step);
});

