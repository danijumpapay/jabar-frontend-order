import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }

    const { plat } = req.body;

    if (!plat) {
        return res.status(400).json({ success: false, message: 'Plate number is required' });
    }

    const token = process.env.SAMBARA_TOKEN;
    const baseUrl = process.env.VITE_SAMBARA_BASE_URL;

    if (!token) {
        return res.status(500).json({ success: false, message: 'API Token not configured on server' });
    }

    try {
        const response = await fetch(`${baseUrl}/sambara/info-pkb?isFake=true`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ plat })
        });

        if (!response.ok) {
            const errorText = await response.text();
            return res.status(response.status).json({
                success: false,
                message: `Upstream API error: ${errorText}`
            });
        }

        const result = await response.json();
        return res.status(200).json(result);
    } catch (error) {
        console.error('Proxy Error:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}
