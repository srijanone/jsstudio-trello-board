const axios = require("axios").default;

const api = axios.default.create({
  baseURL: 'http://localhost:8089',
});

function getIdBoard() {
  // console.log('Board Id: ',localStorage.getItem("idBoard"))
  return localStorage.getItem("idBoard") || "0";
}

export const SERVER_API_PATH = process.env.REACT_APP_SERVER_API_PATH;

export async function getBoards(fields = "") {
  const { data } = await api.post("/api/boards", { fields: fields });
  return data;
}

export async function getCards(fields = "", idBoard = getIdBoard(), startDate, endDate) {
  if (idBoard === "0") {
    return;
  }
  const { data } = await api.post(`/api/cards/${idBoard}`, {
    startDate: startDate,
    endDate: endDate,
    fields: fields
  }
  );
  return data;
}

export async function getLists(fields = "", idBoard = getIdBoard(), startDate, endDate) {
  if (idBoard === "0") {
    return;
  }
  const { data } = await api.post(`/api/lists/${idBoard}`, {
    params: {
      fields: fields,
      since: startDate,
      before: endDate,
    },
  });
  return data;
}

export async function getMembers(fields = "", idBoard = getIdBoard()) {
  if (idBoard === "0") {
    return;
  }
  const { data } = await api.post(`/api/members/${idBoard}`, { fields: fields })
  return data;
}

export async function getActions(fields = "", idBoard = getIdBoard()) {
  if (idBoard === "0") {
    return;
  }
    const { data } = await api.post(`/api/actions/${idBoard}`, {  fields: fields,
      limit: 1000,
      before: '2020-05-14T23:59:59.999Z',
      filter: 'deleteCard' })
    return data;
}

export async function getLabels(fields = "", idBoard = getIdBoard()) {
  if (idBoard === "0") {
    return;
  }
  const { data } = await api.post(`/api/labels/${idBoard}`, { fields: fields })
  return data;
}

export async function getRank() {
  const response = await fetch(`${SERVER_API_PATH}/ranking`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}
