import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
})

export const submitObservation = (formData) =>
  api.post('/observations', formData).then(r => r.data)

export const getObservations = () =>
  api.get('/observations').then(r => r.data)

export const getMapPoints = () =>
  api.get('/map/points').then(r => r.data)