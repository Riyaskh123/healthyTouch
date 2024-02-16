import axios from "axios";

const baseURL = `http://${window.location.hostname}:3005/`;
console.log(window.location.hostname);

 const machineInstance = axios.create({
    baseURL: `${baseURL}machine`,
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