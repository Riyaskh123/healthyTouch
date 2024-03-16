import axios from "axios";

//export const baseURL = `http://${window.location.hostname}:3005/`;
export const baseURL = `http://192.168.1.32:3005/`;

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

  const ADSInstance = axios.create({
    baseURL: `${baseURL}api/ads`,
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

export async function getAds() {
  try {
    const response = await ADSInstance.get(``);
    return response.data;
  } catch (error) {
    throw error;
  }
}