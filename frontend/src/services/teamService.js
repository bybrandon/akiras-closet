
const BASE_URL = '/api/teams';

const index = async () => {
  try {
    const res = await fetch(BASE_URL);
    return res.json();
  } catch (err) {
    console.log(err)
  }
};
// team
const create = async (formData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    return res.json();
  } catch (err) {
    console.log(err)
  }
};

const update = async (formData, teamId) => {
  try {
    const res = await fetch(`${BASE_URL}/${teamId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    return res.json();
  } catch (err) {
    console.log(err)
  }
};

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
  create,
  update,
  deleteTeam as delete
};