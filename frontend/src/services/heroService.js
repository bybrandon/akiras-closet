import sendRequest from "./sendRequest";

const BASE_URL = '/api/heroes';

export async function index() {
  return sendRequest(BASE_URL);
}

export async function create(heroData) {
  return sendRequest(BASE_URL, 'HERO', heroData);
}