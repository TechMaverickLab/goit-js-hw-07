/* global document */
/* global window */
/* global basicLightbox */

import galleryItems from './gallery-items.js';

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

	const instance = basicLightbox.create(`
        <img src="${largeImageURL}" width="800" height="600">
    `, {
		onShow: () => {
			window.addEventListener('keydown', onEscKeyPress);
		},
		onClose: () => {
			window.removeEventListener('keydown', onEscKeyPress);
		}
	});

	instance.show();

	function onEscKeyPress(event) {
		if (event.key === 'Escape') {
			instance.close();
		}
	}
}
