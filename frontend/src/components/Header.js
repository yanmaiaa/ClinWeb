import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Styles from './Header.module.css';
import { ReactComponent as Clin } from '../assets/Logo-Test03.svg';
import { ReactComponent as Barra } from '../assets/Linha.svg';

const Header = () => {
  return (
    <header className={Styles.header}>
      <Link className={Styles.logo} to="/" area-label="Clin - Home">
        <Clin />
      </Link>
      <nav className={Styles.nav}>
        <NavLink
          className={Styles.menu}
          activeStyle={{ color: ' #d75413' }}
          to="inicio"
        >
          Início
        </NavLink>
        <NavLink
          className={Styles.menu}
          activeStyle={{ color: ' #d75413' }}
          to="sobre"
        >
          Sobre
        </NavLink>
        <NavLink
          className={Styles.menu}
          activeStyle={{ color: ' #d75413' }}
          to="info"
        >
          Info
        </NavLink>
        <Barra className={Styles.barra} />
        <NavLink
          className={Styles.menu}
          activeStyle={{ color: ' #d75413' }}
          to="entrar"
        >
          Entrar
        </NavLink>
        <NavLink
          className={Styles.cadastro}
          activeStyle={{ color: ' #031f73' }}
          to="cadastro"
        >
          Cadastro
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
