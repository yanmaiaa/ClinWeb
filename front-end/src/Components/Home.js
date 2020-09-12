import React from 'react';
import style from './Home.module.css';
import { ReactComponent as Img } from '../Assets/img01.svg';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section>
      <div className={style.sobre}>
        <h1>Nós providenciamos acessibilidade!</h1>
        <p>O profissional ao seu alcance.</p>
        <nav className={style.nav}>
          <Link className={style.but} to="/cadastro">
            Comece agora
          </Link>
        </nav>
      </div>
      <div className={style.carousel_content}>
        <Img />
        <p>
          Encontre o profissional que você precisa na <b>palma</b> das suas
          mãos.
        </p>
      </div>
    </section>
  );
};

export default Home;
