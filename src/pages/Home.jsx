import './Home.css';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import Canvas from '../components/Canvas';
import { useEffect, useState, useRef } from 'react';
import predictKanji from '../helpers/predict';

export default function Home() {
    const resultsRef = useRef(null);
    const [canvasResponse, setCanvasResponse] = useState({});

    useEffect(() => {
        const results = resultsRef.current;
        results.textContent = JSON.stringify(canvasResponse.predictions);
        console.log(canvasResponse);

    }, [canvasResponse]);

    async function handleSubmit(base64Image) {
        const response = await predictKanji(base64Image);
        setCanvasResponse(JSON.parse(response.body));
    }

    return (
        <>
            <Banner currentPage='home' />
            <main>
                <div id="canvas">
                    <Canvas handleSubmit={handleSubmit} />
                </div>
                <div id="results">
                    <h1> Results </h1>
                    <h2 ref={resultsRef}></h2>
                </div>
            </main>
            <Footer />
        </>
    );
}