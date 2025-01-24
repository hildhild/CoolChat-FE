import axios from './axios';

export const getDocumentsApi = (document_type, page, size, priority, search) => {
    return axios.get(`/documents/`, {
        params: {
            page: page, 
            page_size: size,
            ...(document_type ? {document_type : document_type} : {}),
            ...(priority ? {priority : priority} : {}),
            ...(search ? {search : search} : {}),
        }
    });
}