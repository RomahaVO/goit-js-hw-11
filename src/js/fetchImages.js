import axios from 'axios';

const galleryEl = {
    imgPage: 1,
    query: '',
};

const ENDPOINT = 'https://pixabay.com/api/';
const API_KEY = '33561476-20a78efec667bb0e7bc12460b';

async function fetchImages(){
    const response = await axios.get(`${ENDPOINT}?key=${API_KEY}&q=${galleryEl.query}&image_type=photo$orientation=horizontal&safesearch=true&per_page=40&page=${galleryEl.imgPage}`);
    galleryEl.imgPage+= 1;
    return response.data.hits;
};

export default { galleryEl, fetchImages };