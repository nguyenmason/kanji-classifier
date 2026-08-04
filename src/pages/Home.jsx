import './Home.css';
import Banner from '../components/Banner';
import Footer from '../components/Footer';

export default function Home() {
    return (
        <>
            <Banner currentPage='home' />
            <div class="body">
                <div style={{height: 1000}}>
                    <h1>Hello World!</h1>
                </div>
            </div>
            <Footer />
        </>
    );
}