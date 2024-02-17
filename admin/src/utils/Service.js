import axios from "axios";

// const baseURL = `http://${window.location.hostname}:3005/`;
const baseURL = `http://192.168.1.17:3005/`;

console.log(window.location.hostname);



  const apiInstance = axios.create({
    baseURL: `${baseURL}api/`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  



// export async function addUser(data) {
//   try {
//     const response = await userInstance.post(`user`,data);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// }

// export async function getAllOffers(data) {
//   try {
//     const response = await apiInstance.get(`offer`);
//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// }

export async function getAllAds() {
  
    const response = await apiInstance.get(`ads`);
    console.log(response.data);
    return response.data;
  
}