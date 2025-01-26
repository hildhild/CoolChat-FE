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

export const addDocumentFileApi = (files) => {
    const formData = new FormData();
    // formData.append("files", files);
    files.forEach((file, index) => {
        formData.append(`files[${index}]`, file); 
    });
    return axios.post(`/documents/upload/file/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
    });
}

export const addDocumentTextApi = (content) => {
    return axios.post(`/documents/upload/text/`, {
        "text_content": content
    });
}

export const addDocumentUrlApi = (url, title, des) => {
    return axios.post(`/documents/upload/url/`, {
        "url": url,
        "title": title,
        "description": des
    });
}
