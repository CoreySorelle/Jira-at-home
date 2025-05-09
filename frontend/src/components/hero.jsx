import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../App.css';

const images = ['hero.webp', 'hero-2.webp', 'hero-3.webp'];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadedImage, setLoadedImage] = useState(images[0]);
  const [fade, setFade] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentImageIndex + 1) % images.length;
      const img = new Image();
      img.src = images[nextIndex];

      img.onload = () => {
        setFade(true);
        setTimeout(() => {
          setCurrentImageIndex(nextIndex);
          setLoadedImage(images[nextIndex]);
          setFade(false);
        }, 500); // match CSS fade duration
      };
    }, 10000);

    return () => clearInterval(interval);
  }, [currentImageIndex]);

  const handleClick = () => {
    navigate("/register");  
  };

  return (
    <div className="hero-container">
      <div
        className={`hero-bg ${fade ? 'fade-out' : 'fade-in'}`}
        style={{ backgroundImage: `url(${loadedImage})` }}
      />
      <div className="overlay" />
      <div className="hero-content">
        <p>Me: Mom, can we get Jira?</p>
        <p>Mom: we have Jira at home</p>
        <h1>Jira-at-Home</h1>
        <p>Organize your personal tasks with the simplicity and power of a Kanban board, inspired by Jira.</p>
        <button className="hero-button" onClick={handleClick}>Sign Up</button>
      </div>
    </div>
  );
};

export default Hero;
