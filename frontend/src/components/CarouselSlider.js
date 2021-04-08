import React from 'react';
import { ReactComponent as ImgSlider1 } from '../Assets/imgCarousel01.svg';
import style from './CarouselSlider.module.css';
import Carousel from 'react-bootstrap/Carousel';

const CarouselSlider = () => {
  //return;
  /* <div className={style.carousel_content}>
      <ImgSlider1 />
      <p>
        Encontre o profissional que você precisa na <b>palma</b> das suas mãos.
      </p>
    </div> */
  <Carousel fade>
    <Carousel.Item>
      <div className={style.img01}>
        <ImgSlider1 />
      </div>
    </Carousel.Item>
  </Carousel>;
};

export default CarouselSlider;
