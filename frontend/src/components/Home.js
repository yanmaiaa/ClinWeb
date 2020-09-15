import React from 'react';
import Style from './Home.module.css';
import { ReactComponent as Img } from '../assets/img01.svg';
import { Link } from 'react-router-dom';
import Head from './Head';

const Home = () => {
  return (
    <section>
      <Head title="Página Inicial" />
      <div className={Style.line}></div>
      <div className={Style.background}>
        <div className={Style.sobre}>
          <h1>Nós providenciamos acessibilidade!</h1>
          <p>O profissional ao seu alcance.</p>
          <nav className={Style.nav}>
            <Link className={Style.but} to="/cadastro">
              Comece agora
            </Link>
          </nav>
        </div>
        <div className={Style.carousel_content}>
          <Img />
          <p>
            Encontre o profissional que você precisa na <b>palma</b> das suas
            mãos.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Home;
