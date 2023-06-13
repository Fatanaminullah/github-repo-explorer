import axios from "axios";

const baseUrl = 'https://api.github.com';

export const fetcher = axios.create({
    baseURL: baseUrl,
    headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
    },
});