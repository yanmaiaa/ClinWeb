import React from 'react';
import { Link } from 'react-router-dom';
import Styles from './Header.module.css';
import { ReactComponent as Clin } from '../Assets/Logo-Test03.svg';
import { ReactComponent as Barra } from '../Assets/Linha.svg';

const Header = () => {
  return (
    <header className={Styles.header}>
      <Link className={Styles.logo} to="/" area-label="Clin - Home">
        <Clin />
      </Link>
      <nav className={Styles.nav}>
        <Link className={Styles.menu} to="/inicio">
          Início
        </Link>
        <Link className={Styles.menu} to="/sobre">
          Sobre
        </Link>
        <Link className={Styles.menu} to="/info">
          Info
        </Link>
        <Barra className={Styles.barra} />
        <Link className={Styles.menu} to="/entrar">
          Entrar
        </Link>
        <Link className={Styles.cadastro} to="/cadastro">
          Cadastro
        </Link>
      </nav>
    </header>
  );
};

export default Header;
