/*const axios = require("axios").default;

const api = axios.default.create({
  baseURL: process.env.REACT_APP_API_PATH,
});

api.interceptors.request.use((config) => {
  config.params = config.params || {};
  config.params["key"] = process.env.REACT_APP_API_KEY;
  config.params["token"] = process.env.REACT_APP_API_TOKEN;
  return config;
});

function getIdBoard() {
  // console.log('Board Id: ',localStorage.getItem("idBoard"))
  return localStorage.getItem("idBoard") || "0";
}

export const SERVER_API_PATH = process.env.REACT_APP_SERVER_API_PATH;

export async function getBoards(fields = "") {
  const { data } = await api.get("/members/me/boards/", {
    params: { fields: fields },
  });
  return data;
}

export async function getCards(fields = "", idBoard = getIdBoard(), startDate, endDate) {
  if (idBoard === "0") {
    return;
  }
  const { data } = await api.get(`/boards/${idBoard}/cards`, {
    params: {
      since: startDate,
      before: endDate,
    },
  });
  return data;
}

export async function getLists(fields = "", idBoard = getIdBoard(), startDate, endDate) {
  if (idBoard === "0") {
    return;
  }
  const { data } = await api.get(`/boards/${idBoard}/lists`, {
    params: { 
      fields: fields, 
      since: startDate,
      before: endDate,
    },
  });
  return data;
}

export async function getMembers(fields = "",idBoard = getIdBoard()) {
  if (idBoard === "0") {
    return;
  }
  const { data } = await api.get(`/boards/${idBoard}/members`, {
    params: { fields: fields },
  });
  return data;
}

export async function getActions(fields = "", idBoard = getIdBoard()) {
  if (idBoard === "0") {
    return;
  }
  // const response = await fetch(`${API_PATH}/boards/${idBoard}/actions/?${getFields(fields)}key=${yourKey}&token=${yourToken}&limit=1000&before=2020-05-14T23:59:59.999Z&since=2020-05-14T00:00:00.001Z&filter=updateCard,createCard,moveCardToBoard`, {
  
  const { data } = await api.get(`/boards/${idBoard}/actions/`, {
    params: {
      fields: fields,
      limit: 1000,
      before: '2020-05-14T23:59:59.999Z',
      filter: 'deleteCard'
    },
  });
  return data;
}

export async function getLabels(fields = "", idBoard = getIdBoard()) {
  if (idBoard === "0") {
    return;
  }
  const {data} = await api.get(`/boards/${idBoard}/labels`,{params:{fields: fields}})
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
*/
