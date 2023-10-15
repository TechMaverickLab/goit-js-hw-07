import { galleryItems } from './gallery-items.js';

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

const lightbox = new SimpleLightbox('.gallery__link', {
    captionDelay: 250,
    captions: true,
    captionSelector: 'self',
    captionType: 'attr',
    captionsData: 'alt',
    captionPosition: 'bottom',
});
