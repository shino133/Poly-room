import React from 'react';
import { Slide,Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import banner_bg1 from "../../assets/banner_bg1.jpg";
import banner_bg2 from "../../assets/banner_bg2.jpg";
import banner_bg3 from "../../assets/banner_bg3.jpg";

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
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white  bg-opacity-50 p-8">
                <h6 className="text-lg font-semibold mb-2">Away from monotonous life</h6>
                <h2 className="text-4xl font-bold mb-4">Relax Your Mind</h2>
                <p className="mb-6">
                  If you are looking at blank cassettes on the web, you may be very confused at the
                  <br />
                  difference in price. You may see some for as low as $.17 each.
                </p>
                <a
                  href="#"
                  className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        ))}
      </Fade>
    </div>
  );
};

export default Slideshow;
