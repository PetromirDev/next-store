const dev = process.env.NODE_ENV !== 'production';

export const server_url = dev ? 'http://localhost:3000/api' : 'https://next-store-zeta.vercel.app/api';