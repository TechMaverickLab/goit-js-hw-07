/* global basicLightbox */
/* global document */
/* global window */

import { galleryItems } from './gallery-items.js';

// Створення і рендер розмітки на підставі масиву даних
function createGalleryMarkup(items) {
	return items.map(({ preview, original, description }) => {
		return `
        <li class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img
              class="gallery__image"
              src="${preview}"
              data-source="${original}"
              alt="${description}"
            />
          </a>
        </li>
        `;
	}).join('');
}

const galleryMarkup = createGalleryMarkup(galleryItems);
const galleryList = document.querySelector('.gallery');
galleryList.innerHTML = galleryMarkup;

// Реалізація делегування на ul.gallery
galleryList.addEventListener('click', onGalleryClick);

function onGalleryClick(event) {
	event.preventDefault();
    
	if (event.target.nodeName !== 'IMG') {
		return;
	}

	const largeImageURL = event.target.dataset.source;

	// Відкриття модального вікна
	const instance = basicLightbox.create(`
        <img src="${largeImageURL}" width="800" height="600">
    `);

	instance.show();

	// Закриття на клавішу Escape
	window.addEventListener('keydown', (e) => {
		if (e.key === 'Escape') {
			instance.close();
			window.removeEventListener('keydown', this);
		}
	});
}

