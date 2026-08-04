import { useState } from "react";
import "./Banner.css";
import { useNavigate } from "react-router-dom";

export default function Banner({ currentPage = "home" }) {
  const [projectsOpen, setProjectsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <header className="banner">
        <span className="banner-name" onClick={() => navigate("/")}>
          Kanji Classifier
        </span>

        <nav className="banner-nav">
          
        </nav>
      </header>
    </>
  );
}