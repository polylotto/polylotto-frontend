import 'react-slideshow-image/dist/styles.css'
import React from 'react';
import { Slide } from 'react-slideshow-image';
import Slides from "./slides";

const slideImages = [
    {"id": 1, "img":'../images/404.png'},

    {"id":2, "img": '../images/step.png'},

    {"id": 3, "img": '../images/ticket.png'}
  ];
  
const Slideshow = () => {
      return (
        <div>
          <Slide easing="ease">
            {slideImages.map( image => (
                <div key={image.id} className="each-slide">
                    {/* <Slides backgroundImage={image.img} slideNumber={image.id}/> */}
               </div>
            )
            )}
          </Slide>
        </div>
      )
};
  
export default Slideshow;