const axios = require('axios').default;
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default class ApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }



    async axiosPhotos() {
        // console.log(this);
        const API_KEY = '28032528-2733f4db32465b2bae0fa9703';
        try{
            const getApi = await axios
            .get(`https://pixabay.com/api/`, {
                params: {
                    key: API_KEY,
                    q: this.searchQuery.trim(),
                    image_type: 'photo',
                    orientation: 'horizontal',
                    safesearch: true,
                    per_page: 40,
                    page: this.page,
                }
            });
            console.log(getApi);

            const dataApi = await getApi.data;
            this.incrementPage();
            console.log(dataApi);
            return dataApi;
            
        }catch(err){
            console.log(err);
            if(err.response.status === 400){
                Notify.info("We're sorry, but you've reached the end of search results.");
                return;
            }
        }
        // return axios
        // .get(`https://pixabay.com/api/`, {
        //     params: {
        //         key: API_KEY,
        //         q: this.searchQuery.trim(),
        //         image_type: 'photo',
        //         orientation: 'horizontal',
        //         safesearch: true,
        //         per_page: 40,
        //         page: this.page,
        //     }
        // })
        // .then(res => {
        //     this.incrementPage()
        //     if(this.searchQuery.trim() === '') {
        //         Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        //         return;
        //     }
        //     console.log(res)
        //     console.log(res.data);
        //     return res.data;
        // })
    }


    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query () {
        return this.searchQuery;
    }

    set query (value) {
        this.searchQuery = value;
    }
}