export default async function predictKanji(base64Image) {
    try {
            const response = await fetch('/api/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image: base64Image })
            });

            if (!response.ok) {
            const errorData = await response.json();
            console.error('Prediction failed:', response.status, errorData);
            return;
            }

            const data = await response.json();
            return data;

        } catch (err) {
            console.error('Network error:', err);
        }
}