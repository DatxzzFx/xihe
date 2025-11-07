// File: /api/download.js
// Ini adalah Vercel Serverless Function

const axios = require('axios');

// Ini adalah handler default yang akan dieksekusi Vercel
export default async function handler(req, res) {
    
    // 1. Hanya izinkan metode POST
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    // 2. Ambil URL dari body request
    const { url } = req.body;

    if (!url || !url.includes('http')) {
        return res.status(400).json({ message: 'Url is required and must be valid' });
    }

    // 3. Jalankan logika scraping Anda
    try {
        const { data } = await axios.post('https://auto-download-all-in-one.p.rapidapi.com/v1/social/autolink', {
            url: url
        }, {
            headers: {
                'accept-encoding': 'gzip',
                'cache-control': 'no-cache',
                'content-type': 'application/json; charset=utf-8',
                'referer': 'https://auto-download-all-in-one.p.rapidapi.com/',
                'user-agent': 'Xihe/5.0',
                'x-rapidapi-host': 'auto-download-all-in-one.p.rapidapi.com',
                
                // PENTING: Gunakan Environment Variable Vercel
                'x-rapidapi-key': process.env.RAPIDAPI_KEY 
            }
        });
        
        // 4. Kirim kembali hasil sukses ke frontend
        return res.status(200).json(data);

    } catch (error) {
        // 5. Tangani error
        console.error(error.response ? error.response.data : error.message);
        const errorMessage = error.response?.data?.message || error.message || 'Internal Server Error';
        return res.status(500).json({ message: errorMessage });
    }
                                    }
          
