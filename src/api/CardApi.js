import axios from 'axios';

//const baseURL = 'http://localhost:3000/cards/';
const baseURL = 'https://pokemoncardgeneratorv2be.onrender.com/cards/';

export function showAllCards() {
  const URL = baseURL;
  const response = axios.get(`${URL}`);
  return response;
}

export function showCardById(id) {
  const URL = `${baseURL}/${id}`;
  const response = axios.get(URL);
  return response;
}

export function createCard(card) {
  const URL = baseURL;
  const response = axios.post(URL, card);
  return response;
}

export function editByIdAndUpdateCard(id, updatedCard) {
  const URL = `${baseURL}/${id}`;
  const response = axios.put(URL, updatedCard);
  return response;
}

export function deleteCardById(id) {
  const URL = `${baseURL}/${id}`;
  const response = axios.delete(URL);
  return response;
}
