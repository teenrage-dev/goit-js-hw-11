const axios = require('axios').default;

export default class ApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }





    axiosPhotos() {
        console.log(this);
        const API_KEY = '28032528-2733f4db32465b2bae0fa9703';
        return axios
        .get(`https://pixabay.com/api/`, {
            params: {
                key: API_KEY,
                q: this.searchQuery,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                per_page: 40,
                page: this.page,
            }
        }).then(res => {
            this.incrementPage();
            
            return res.data.hits;
        })
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