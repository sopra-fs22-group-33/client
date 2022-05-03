import axios from "axios";
import { getDomain } from "helpers/getDomain";

export const api = axios.create({
  baseURL: getDomain(),
  headers: { "Content-Type": "application/json" },
});

export async function doLogout() {
  try {
    const requestBody = JSON.stringify({ isOnline: false });
    await api.put("/users/" + localStorage.getItem("id"), requestBody, {
      headers: { token: localStorage.getItem("token") },
    });
  } catch (e) {
    alert(`Something went wrong during logout: \n${handleError(e)}`);
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
  }
}

export async function doChangeTeam() {
  window.history.push("/users/teams")
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

export const getToken = (response) => {
  if (!response.headers.hasOwnProperty("token")) {
    throw Error(`token is not in response headers or cannot be read:\n${response.headers}`)
  }
  return response.headers.token
}
