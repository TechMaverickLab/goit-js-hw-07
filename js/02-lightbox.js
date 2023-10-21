/* global document, SimpleLightbox */

import galleryItems from './gallery-items.js';

function createGalleryMarkup(items) {
	return items
		.map(({ preview, original, description }) => {
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
		})
		.join('');
}

const galleryMarkup = createGalleryMarkup(galleryItems);
const galleryList = document.querySelector('.gallery');
galleryList.innerHTML = galleryMarkup;

try {
	new SimpleLightbox('.gallery__link', {
		captionDelay: 250,
		captionType: 'attr',
		captionsData: 'alt',
		captionPosition: 'bottom',
	});
	
} catch (error) {
	console.error('Error initializing SimpleLightbox:', error);
}