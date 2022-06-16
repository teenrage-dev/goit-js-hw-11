import './css/styles.css';
import ApiService from './api-service.js';
const axios = require('axios').default;


const refs = {
    searchForm: document.querySelector('#search-form'),
    loadMoreBtn: document.querySelector('.load-more'),
    galleryContainer: document.querySelector('.gallery'),
};

const apiService = new ApiService();


refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);



function onSearch(e) {
    e.preventDefault();

    apiService.query = e.target.elements[0].value;
    apiService.resetPage();
    apiService.axiosPhotos().then( photos => photos.map(createPhotoEl).forEach(addPhotoToGallery));
}

function onLoadMore () {
    apiService.axiosPhotos();
}


function createPhotoEl ({webformatURL, tags, likes, views, comments, downloads}) {
    return `
        <div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
            <p class="info-item">
            <b>Likes ${likes}</b>
            </p>
            <p class="info-item">
            <b>Views ${views}</b>
            </p>
            <p class="info-item">
            <b>Comments ${comments}</b>
            </p>
            <p class="info-item">
            <b>Downloads ${downloads}</b>
            </p>
        </div>
        </div>
    `;
};

function addPhotoToGallery(photo) {
    refs.galleryContainer.insertAdjacentHTML('beforeend', photo);
}









// const refs = {
//     input: document.querySelector('#search-box'),
//     countryList: document.querySelector('.country-list'),
//     countryInfo: document.querySelector('.country-info'),
// };


// const DEBOUNCE_DELAY = 300;

// refs.input.addEventListener('input', debounce(countryName, DEBOUNCE_DELAY));



// function countryName(e){
//     const countryToFind = e.target.value;
//     console.log(e);

//     fetchCountries(countryToFind.trim())
//         .then(c => {
//             console.log(c.status);
//                 if (Number(c.status) === 404) {
//                     Notify.failure("Oops, there is no country with that name");
//                 }

//                 refs.countryList.innerHTML = '';
//                 refs.countryInfo.innerHTML = '';

//                 if (c.length === 1) {
//                     c.map(el => addCountryToList(createCountryEl(el)));
//                 }

//                 else if (c.length > 1 && c.length <= 10) {
//                     c.map(el => {
//                         const li = document.createElement('li');

//                         li.innerHTML = el.name.common;
//                         refs.countryList.append(li);
//                         li.insertAdjacentHTML('afterbegin', `<img src="${el.flags.svg}">`);
//                     });
                    
//                 } else {
//                     refs.countryInfo.innerHTML = '';
//                     if(c.status === undefined){
//                         Notify.info("Too many matches found. Please enter a more specific name.");
//                     }
//                 }
                

//         })

// }

// function createCountryEl(country) {
//     return `
//         <div class="country-card">
//             <div class="wrapper">
//                 <img src="${country.flags.svg}" alt="${country.name.official} flag">
//                 <h2>${country.name.official}</h2>
//             </div>
//                 <p>Capital: ${country.capital}</p>
//                 <p>Population: ${country.population}</p>
//                 <p>Languages: ${Object.values(country.languages)}</p>
//         </div>`;
// };

// function addCountryToList(country) {
//     refs.countryInfo.insertAdjacentHTML('beforeend', country);
// }





