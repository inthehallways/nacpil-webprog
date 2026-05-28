const HOST = `${import.meta.env.VITE_API_URL || ''}`
    .replace(/^VITE_API_URL\s*=\s*/, '')
    .replace(/\/+$/, '');

export default {
    HOST,
};
