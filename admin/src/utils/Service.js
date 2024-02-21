import axios from 'axios';

// const baseURL = `http://${window.location.hostname}:3005/`;
//const baseURL = `http://192.168.1.17:3005/`;
const baseURL = `http://localhost:3005/`;
console.log(window.location.hostname);

const apiInstance = axios.create({
  baseURL: `${baseURL}api/`,
  headers: {
    'Content-Type': 'application/json',
  }
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


////Advertisement
export async function getAllAds() {
  const response = await apiInstance.get(`ads`);
  console.log(response.data);
  return response.data;
}

export async function createAds(data) {
 
  const response = await apiInstance.post(`ads`,data);
  console.log(response.data);
  return response.data;
}

export async function deleteAd(data) {
console.log("hehehhee")
console.log(data)
  const response = await apiInstance.delete(`ads/${data}`);
  console.log(response.data);
  return response.data;
}



//////OFFer
export async function getAllOffer() {
  const response = await apiInstance.get(`offer`);
  console.log(response.data);
  return response.data;
}

export async function deleteOffer(data) {
 
    const response = await apiInstance.delete(`offer/${data}`);
    console.log(response.data);
    return response.data;
  }

export async function createOffer(data) {
  const response = await apiInstance.post(`offer`,data);
  console.log(response.data);
  return response.data;
}

///users
export async function getAllUsers() {
  const response = await apiInstance.get(`user`);
  console.log(response.data);
  return response.data;
}

///admin

export async function adminLogin(data) {
  const response = await apiInstance.post(`adminLogin`,data);
  console.log(response.data);
  return response.data;
}

//daily Limit

export async function createDailyLimit(data) {
  const response = await apiInstance.post(`addDailyLimit`,data);
  console.log(response.data);
  return response.data;
}