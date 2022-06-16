import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css"
import ApiService from './api-service.js';
const axios = require('axios').default;

const refs = {
    searchForm: document.querySelector('#search-form'),
    loadMoreBtn: document.querySelector('.load-more'),
    galleryContainer: document.querySelector('.gallery'),
    loading: document.querySelector('.loading'),
};

const apiService = new ApiService();


refs.searchForm.addEventListener('submit', onSearch);
// refs.loadMoreBtn.addEventListener('click', onLoadMore);
window.addEventListener('scroll', () => {

    const { scrollHeight, clientHeight, scrollTop } = document.documentElement;
    // console.log(scrollHeight, clientHeight, scrollTop);

    if (clientHeight + scrollTop >= scrollHeight - 5) {
        // console.log('load more');

        setTimeout(onLoadMore(), 500);
    }

});


let lightbox;
function refreshLightbox() {
    lightbox.refresh();
}

function onSearch(e) {

    e.preventDefault();

    clearGallery();

    apiService.query = e.target.elements[0].value;

    apiService.resetPage();

    apiService.axiosPhotos().then( photos => {
        refs.loading.classList.add('visually-hidden');
        console.log(photos);
        if(photos.hits.length === 0) {
            Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            return;
        }

        Notify.success(`Hooray! We found ${photos.totalHits} images.`);

        const photosEl = photos.hits.map(createPhotoEl).forEach(addPhotoToGallery);
        lightbox = new SimpleLightbox('.gallery div a', { captionsData: "alt", captionDelay: 250,});

        // return photosEl;
    });
}

function onLoadMore () {
    refs.loading.classList.remove('visually-hidden');

    apiService.axiosPhotos().then( photos => {
        if(photos.hits.length === 0) {
            refs.loading.classList.add('visually-hidden');
            Notify.info("We're sorry, but you've reached the end of search results.");
            return;
        }
        const photosEl = photos.hits.map(createPhotoEl).forEach(addPhotoToGallery);
        refreshLightbox();
        refs.loading.classList.add('visually-hidden');
        return photosEl;
    })
    .catch(err => {
        refs.loading.classList.add('visually-hidden');

        // console.log(err);
        
        if(err.response.status === 400) {
            Notify.info("We're sorry, but you've reached the end of search results.");
            return;
        }
    });
}


function createPhotoEl ({largeImageURL, webformatURL, tags, likes, views, comments, downloads}) {
    return `
        <div class="photo-card">
        <a href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
        <div class="info">
            <p class="info-item">
            <b>Likes <br> ${likes}</b>
            </p>
            <p class="info-item">
            <b>Views <br> ${views}</b>
            </p>
            <p class="info-item">
            <b>Comments <br> ${comments}</b>
            </p>
            <p class="info-item">
            <b>Downloads <br> ${downloads}</b>
            </p>
        </div>
        </div>
    `;
};

function addPhotoToGallery(photo) {
    refs.galleryContainer.insertAdjacentHTML('beforeend', photo);
    
}

function clearGallery() {
    refs.galleryContainer.innerHTML = '';
}
