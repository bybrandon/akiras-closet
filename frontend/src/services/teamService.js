import sendRequest from "./sendRequest";
const BASE_URL = '/api/teams';

// const index = async () => {
//   try {
//     const res = await fetch(BASE_URL);
//     return res.json();
//   } catch (err) {
//     console.log(err)
//   }
// };

async function index() {
  return sendRequest(BASE_URL);
}

// const show = async (teamId) => {
//   try {
//     const res = await fetch(`${BASE_URL}/${teamId}`);
//     return res.json();
//   } catch (err) {
//     console.log(err);
//   }
// };

async function show(formData, teamId) {
  sendRequest(BASE_URL, 'GET', formData, teamId)
}

// team
async function create(formData) {
  sendRequest(BASE_URL, 'POST', formData);
}

// const update = async (formData, teamId) => {
//   try {
//     const res = await fetch(`${BASE_URL}/${teamId}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(formData)
//     });
//     return res.json();
//   } catch (err) {
//     console.log(err)
//   }
// };

async function update(formData) {
  sendRequest(BASE_URL, 'PUT', formData);
}

const deleteTeam = async (teamId) => {
  try {
    const res = await fetch(`${BASE_URL}/${teamId}`, { method: 'DELETE' });
    return res.json();
  } catch (err) {
    console.log(err)
  }
};

export {
  index,
  show,
  create,
  update,
  deleteTeam as delete
};