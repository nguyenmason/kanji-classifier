import { GrLinkedin, GrMail, GrGithub } from 'react-icons/gr';
import "./Footer.css";

export default function Footer() {
    return (
        <footer className="footer">
            <p className="text">&copy; {new Date().getFullYear()} Mason Nguyen.</p>
            <div className="social-links">
                <a className="link-btn" href="https://www.linkedin.com/in/mason-nguyen-se/">
                    <GrLinkedin size={18} className="linkIcon"/>
                </a>
                <a className="link-btn" href="mailto:masonnguyen1861@gmail.com">
                    <GrMail size={18} className="linkIcon" />
                </a>
                <a className="link-btn" href="https://github.com/nguyenmason" target="_blank" rel="noreferrer">
                     <GrGithub size={18} className="linkIcon" />
                </a>
            </div>

        </footer>
    );
}