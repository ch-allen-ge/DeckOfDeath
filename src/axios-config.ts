import axios from "axios";

const client = axios.create({
    baseURL: 'https://tyche-84788637e4fc.herokuapp.com',
    withCredentials: true
});

const dodGet = async (url: string) => {
    try {
        const response = await client.get(url);
        return response;
    } catch (e) {
        throw e;
    }
};

const dodPost = async (url: string, payload?: any) => {
    try {
        const response = await client.post(url, payload);
        return response;
    } catch (e) {
        throw e;
    }
};

const dodPatch = async (url: string, payload?: any) => {
    try {
        const response = await client.patch(url, payload);
        return response;
    } catch (e) {
        throw e;
    }
};

const dodDelete = async (url: string, payload?: any) => {
    try {
        const response = await client.delete(url, payload);
        return response;
    } catch (e) {
        throw e;
    }
};

export {
    dodGet,
    dodPost,
    dodPatch,
    dodDelete
}