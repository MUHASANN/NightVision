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

export const getDataDeviceByCompany = async (type) => {
  try {
    const response = await api.get(`devices/by-type-company?companyGuid=${company}&type=${type}`);
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

export const getDataDevice = async () => {
    try {
      const response = await api.get('/devices/camera');
      return response.data;
    } catch (error) {
      console.error("Error fetching device data:", error);
      throw error;
    }
};

export const getDataHistory = async (page, limit, guid) => {
    try {
      const response = await api.get(`devices/data/${page}/${limit}/${guid}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching history data:", error);
      throw error;
    }
};

export const getDataHistoryCamera = async (page, limit, guid) => {
  try {
    const response = await apiHistory.get(`/data/log?page=${page}&limit=${limit}&guid_device=${guid}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching history data:", error);
    throw error;
  }
};