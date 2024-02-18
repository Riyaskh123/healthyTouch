import axios from "axios";

// const baseURL = `http://${window.location.hostname}:3005/`;
const baseURL = `http://192.168.1.17:3005/`;

console.log(window.location.hostname);

 const machineInstance = axios.create({
    baseURL: `${baseURL}machine`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const userInstance = axios.create({
    baseURL: `${baseURL}api/user`,
    headers: {
      "Content-Type": "application/json",
    },
  });

export async function machineStart() {
    try {
      const response = await machineInstance.get(`start`);
      return response.data;
    } catch (error) {
      throw error;
    }
}

export async function addUser(data) {
  try {
    const response = await userInstance.post(``,data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function Timeout(data) {
  try {
    const response = await userInstance.patch(``,data);
    return response.data;
  } catch (error) {
    throw error;
  }
}