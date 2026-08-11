
export default async function predictKanji(req,res) {
    const response = await fetch(process.env.LAMBDA_KANJI_CLASSIFIER_URL, {
        method: "post",
        headers: {
            "contentType": "application/json",
            "x-api-key": process.env.LAMBDA_PREDICT_API_KEY,
        },
        body: JSON.stringify(req.body)
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('API error:', response.status, errorText);
        return;
    }

    const data = await response.json();
    res.status(200).json(data);
}