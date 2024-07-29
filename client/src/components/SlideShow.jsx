import React from 'react';
import { Slide,Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import banner_bg1 from "../assets/banner_bg1.jpg";
import banner_bg2 from "../assets/banner_bg2.jpg";
import banner_bg3 from "../assets/banner_bg3.jpg";

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize: 'cover',
  height: '100vh'
};

const Slideshow = () => {
  const slideImages = [
    { url: banner_bg1 },
    { url: banner_bg2 },
    { url: banner_bg3 }
  ];

  return (
    <div className="slide-container">
      <Fade arrows={false} pauseOnHover={false}>
        {slideImages.map((slideImage, index) => (
          <div key={index}>
            <div style={{ ...divStyle, backgroundImage: `url(${slideImage.url})` }}>
              <div className="relative  flex flex-col items-center justify-center h-full text-center text-white  bg-opacity-50 p-8">
              
              </div>
            </div>
          </div>
        ))}
      </Fade>
    </div>
  );
};

export default Slideshow;
