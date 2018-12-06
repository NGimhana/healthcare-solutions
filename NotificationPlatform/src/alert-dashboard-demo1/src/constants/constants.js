import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'http://172.22.0.1:8290/epicalert/1.0.0',
    headers :{Authorization: 'Bearer ' + '218246de-e0ff-3944-83aa-dcdb21105827'},
});

export const axiosInstanceEPIC = axios.create({
    baseURL: 'https://open-ic.epic.com/FHIR/api/FHIR/DSTU2',
});