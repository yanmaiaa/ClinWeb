import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './Home.module.css';
import CarouselSlider from './CarouselSlider';

const Home = () => {
  return (
    <section>
      <div className={style.line}></div>
      <div className={style.background}>
        <div className={style.sobre}>
          <h1>Nós providenciamos acessibilidade!</h1>
          <p>O profissional ao seu alcance.</p>
          <nav className={style.nav}>
            <NavLink className={style.btnstart} to="/cadastro">
              Comece agora
            </NavLink>
          </nav>
        </div>
        <CarouselSlider />
      </div>
    </section>
  );
};

export default Home;
