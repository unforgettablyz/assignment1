import { axiosInstance } from '../api/axiosInstance.js';

// Must match PURPOSE_CATEGORIES in backend appointmentController.js
export const PURPOSE_CATEGORIES = ['Academic', 'Career', 'Personal', 'Other'];

export const appointmentService = {
  getMyAppointments: async () => {
    const res = await axiosInstance.get('/appointments');
    return res.data;
  },
  createAppointment: async (data) => {
    const res = await axiosInstance.post('/appointments', data);
    return res.data;
  },
  getAdminAppointments: async (status) => {
    const res = await axiosInstance.get('/admin-appointments', {
      params: status ? { status } : {},
    });
    return res.data;
  },
};
