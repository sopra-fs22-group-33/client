import axios from "axios";
import { getDomain } from "helpers/getDomain";

export const api = axios.create({
  baseURL: getDomain(),
  headers: { "Content-Type": "application/json" },
});

export async function doLogout() {
  try {
    const requestBody = JSON.stringify({ isOnline: false });
    await api.put("/users/" + sessionStorage.getItem("id"), requestBody, {
      headers: { token: sessionStorage.getItem("token") },
    });
  } catch (e) {
    alert(`Something went wrong during logout: \n${handleError(e)}`);
  } finally {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("id");
  }
}

export async function doChangeTeam() {
  window.history.push("/users/teams");
}

export const handleError = (error) => {
  const response = error.response;

  // catch 4xx and 5xx status codes
  if (response && !!`${response.status}`.match(/^[4|5]\d{2}$/)) {
    let info = `\nrequest to: ${response.request.responseURL}`;

    if (response.data.status) {
      info += `\nstatus code: ${response.data.status}`;
      info += `\nerror: ${response.data.error}`;
      info += `\nerror message: ${response.data.message}`;
    } else {
      info += `\nstatus code: ${response.status}`;
      info += `\nerror message:\n${response.data}`;
    }

    console.log(
      "The request was made and answered but was unsuccessful.",
      error.response
    );
    return info;
  } else {
    if (error.message.match(/Network Error/)) {
      alert("The server cannot be reached.\nDid you start it?");
    }

    console.log("Something else happened.", error);
    return error.message;
  }
};

export async function fetchTeamCalendar() {
  try {
    const response = await api.get(
      `/teams/${sessionStorage.getItem("teamId")}/calendars`
    );
    return response.data;
  } catch (e) {
    alert(
      `Something went wrong during fetching the team calendar:\n${handleError(
        e
      )}`
    );
  }
}

export async function fetchFixedUserCalendar(userId) {
  try {
    const response = await api.get(`/users/${userId}/calendars`);
    return response.data;
  } catch (e) {
    alert(
      `Something went wrong during fetching the user calendar:\n${handleError(
        e
      )}`
    );
  }
}

export async function fetchEditableUserCalendar(userId) {
  try {
    const response = await api.get(`/users/${userId}/preferences`);
    return response.data;
  } catch (e) {
    alert(
      `Something went wrong while fetching the user preferences:\n${handleError(
        e
      )}`
    );
  }
}

export async function fetchGames(userId) {
  try {
    const response = await api.get(`/users/${userId}/games`);
    return response.data;
  } catch (e) {
    alert(`Something went wrong while fetching the games:\n${handleError(e)}`);
  }
}

export const getToken = (response) => {
  if (!response.headers.hasOwnProperty("token")) {
    throw Error(
      `token is not in response headers or cannot be read:\n${response.headers}`
    );
  }
  return response.headers.token;
};

export const getTeamIsAdmin = (memberships) => {
  const membership = memberships.filter(
    (membership) =>
      membership.user &&
      membership.user.id &&
      membership.user.id.toString() === sessionStorage.getItem("id") &&
      membership.isAdmin
  )[0];
  return membership ? membership.isAdmin : null;
};
