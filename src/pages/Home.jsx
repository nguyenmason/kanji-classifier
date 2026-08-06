import './Home.css';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import Canvas from '../components/Canvas';

export default function Home() {
    return (
        <>
            <Banner currentPage='home' />
            <main>
                <Canvas/>
            </main>
            <Footer />
        </>
    );
}