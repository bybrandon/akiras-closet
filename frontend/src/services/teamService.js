import sendRequest from "./sendRequest";
const BASE_URL = '/api/teams';

export async function index() {
  return sendRequest(BASE_URL);
}

export async function show(teamId) {
  return sendRequest(`${BASE_URL}/${teamId}`);
}

export async function create(formData) {
  return sendRequest(BASE_URL, 'POST', formData);
}

export async function update(formData) {
  return sendRequest(BASE_URL, 'PUT', formData);
}

export async function removeHero(heroId) {
  return sendRequest(`${BASE_URL}/heroes/${heroId}`, 'DELETE');
}
