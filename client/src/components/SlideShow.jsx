import React from 'react';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import banner_bg1 from "../assets/banner_bg1.jpg";
import banner_bg2 from "../assets/banner_bg2.jpg";
import banner_bg3 from "../assets/banner_bg3.jpg";
import Dashboard from '../views/pages/Dashboard';

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize: 'cover',
  height: '100vh',
  width: '100%'
};

const SlideShow = () => {
  const slideImages = [
    { url: banner_bg1 },
    { url: banner_bg2 },
    { url: banner_bg3 }
  ];

  return (
    <div className="relative w-full h-screen">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Fade arrows={false} pauseOnHover={false}>
          {slideImages.map((slideImage, index) => (
            <div key={index}>
              <div style={{ ...divStyle, backgroundImage: `url(${slideImage.url})` }}></div>
            </div>
          ))}
        </Fade>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-8">
        {/* Your content goes here */}
        {/* <Dashboard/> */}
      </div>
    </div>
  );
};

export default SlideShow;
