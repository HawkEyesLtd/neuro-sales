import { message } from 'antd';

function extractMessage(obj) {
    if (!obj) return undefined;
    // Common shapes: { data: { message } }, { message }, { data: { msg } }, axios error shape
    if (obj?.data?.message) return obj.data.message;
    if (obj?.data?.msg) return obj.data.msg;
    if (obj?.message) return obj.message;
    if (obj?.msg) return obj.msg;
    // axios-like error: obj?.response?.data?.message
    if (obj?.response?.data?.message) return obj.response.data.message;
    if (obj?.response?.data?.msg) return obj.response.data.msg;
    if (obj?.response?.statusText) return obj.response.statusText;
    return undefined;
}

export function showSuccessFromApi(response, defaultMsg, duration = 5) {
    const msg = extractMessage(response) || defaultMsg;
    message.success(msg, duration);
}

export function showErrorFromApi(error, defaultMsg, duration = 5) {
    const msg = extractMessage(error) || defaultMsg;
    message.error(msg, duration);
}

export default { showSuccessFromApi, showErrorFromApi };
