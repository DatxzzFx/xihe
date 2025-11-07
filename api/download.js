// File: /api/download.js
// Vercel Serverless Function - Menggunakan ESM (import/export)

import axios from 'axios'; 

// 🚨 PERINGATAN KEAMANAN KRITIS: Kunci API di bawah ini akan terlihat publik.
// Kami menempatkannya di sini sesuai permintaan Anda untuk debugging/pengujian cepat.
const RAPIDAPI_KEY = '1dda0d29d3mshc5f2aacec619c44p16f219jsn99a62a516f98';

export default async function handler(req, res) {
    
    // Hanya izinkan metode POST
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
    
    const { url } = req.body;

    if (!url || !url.includes('http')) {
        return res.status(400).json({ message: 'URL is required and must be valid.' });
    }

    try {
        const rapidApiUrl = 'https://auto-download-all-in-one.p.rapidapi.com/v1/social/autolink';

        const response = await axios.post(rapidApiUrl, {
            url: url
        }, {
            headers: {
                // Header yang Anda sediakan
                'accept-encoding': 'gzip',
                'cache-control': 'no-cache',
                'content-type': 'application/json; charset=utf-8',
                'referer': 'https://auto-download-all-in-one.p.rapidapi.com/', // Diperbaiki: Menggunakan string untuk key
                'user-agent': 'Xihe/5.0',
                'x-rapidapi-host': 'auto-download-all-in-one.p.rapidapi.com',
                'x-rapidapi-key': RAPIDAPI_KEY // Kunci API yang terekspos
            }
        });
        
        // Mengembalikan data sukses
        return res.status(200).json(response.data);

    } catch (error) {
        // Log detail error
        const responseError = error.response ? error.response.data : {};
        console.error('API Call Failed:', error.message);
        
        // Mengembalikan error yang ramah
        const userMessage = responseError.message || 
                            'Gagal memproses link. Pastikan URL Weibo valid dan coba lagi.';
        
        return res.status(500).json({ 
            message: userMessage 
        });
    }
}
