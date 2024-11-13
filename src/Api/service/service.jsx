import axios from 'axios';
import config from '../config';

const apiUrl = config.API_BASE_URL;
const company = config.COMPANY;
const apiUrlHistory = config.HISTORY;

const api = axios.create({
  baseURL: apiUrl,
});

const apiHistory = axios.create({
  baseURL: apiUrlHistory,
}); 

export const getDataDeviceByCompany = async () => {
  try {
    const response = await api.get(`/devices/type-device/${company}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching device data:", error);
    throw error;
  }
};

export const getDataDeviceByGuid = async (guid) => {
  try {
    const response = await api.get(`/devices/public/by-guid?guid=${guid}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching device data:", error);
    throw error;
  }
};

export const getDataDevice = async (type) => {
    try {
      const response = await api.get(`/devices/by-type-company?companyGuid=${company}&type=${type}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching device data:", error);
      throw error;
    }
};

// export const getDataHistory = async (page, limit, guid) => {
//     try {
//       const response = await api.get(`devices/data/${page}/${limit}/${guid}`);
//       return response.data;
//     } catch (error) {  
//       console.error("Error fetching history data:", error);
//       throw error;
//     }
// };

export const getDataHistoryType = async (page, limit, guid, startdate, enddate) => {
  try {
    const response = await apiHistory.get(`/data/log?page=${page}&limit=${limit}&guid_device=${guid}&startDate=${startdate}&endDate=${enddate}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching history data:", error);
    throw error;
  }
};

export const getDataStatistik = async () => {
  try {
    const response = await apiHistory.get(`/reports/statistics?companyGuid=${company}&startDate&endDate`);
    return response.data;
  } catch (error) {
    console.error("Error fetching history data:", error)
    throw error;
  }
};

export const getDataLaporanOfficer = async (page, limit, type) => {
  try {
    const response = await apiHistory.get(`/reports/company?companyGuid=${company}&page=${page}&limit=${limit}&type=${type}&startDate&endDate`);
    return response.data;
  } catch (error) {
    console.error("Error fetching history data:", error)
    throw error;
  }
};

export const getDataLaporanAI = async (page, limit, type) => {
  try {
    const response = await apiHistory.get(`/reports/company?companyGuid=${company}&page=${page}&limit=${limit}&type=${type}&startDate&endDate`);
    return response.data;
  } catch (error) {
    console.error("Error fetching history data:", error)
    throw error;
  }
};