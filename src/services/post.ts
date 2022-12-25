import http from "./httpService";

const apiEndPoint = 'http://localhost:4000/api';

export function getContent() {
    return http.get(apiEndPoint + '/posts');
}

export function postContent(payload: any) {
    const fd = new FormData();

    fd.append('description', payload.description);
    fd.append('status', payload.status);
    payload.media.forEach((item: any) => fd.append('files', item));

    return console.log('File Data ', fd)
}

export function updateContent(payload: any) {
    return http.post(apiEndPoint + '/post/' + payload._id, payload);
}

export function deleteContent(id: string) {
    return http.delete(apiEndPoint + '/post/' + id)
}