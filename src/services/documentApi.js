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

export const downloadDocumentApi = (id) => {
    return axios.get(`/documents/${id}/download/`);
}

export const updatePrioritiesApi = (updatePriorities) => {
    return axios.patch(`/documents/bulk-update/`, {
        "updates": updatePriorities
    });
}

export const deleteDocumentApi = (id) => {
    return axios.delete(`/documents/${id}/delete/`);
}

export const editDocumentNameApi = (id, fileName) => {
    return axios.patch(`/documents/${id}/`, {
        "filename": fileName
    });
}

export const editUrlDocumentApi = (id, filename, url, url_description) => {
    return axios.patch(`/documents/${id}/`, {
        "filename": filename,
        "url_title": filename,
        "url": url,
        "url_description": url_description
    });
}
