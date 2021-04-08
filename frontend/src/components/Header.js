import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import { ReactComponent as Clin } from '../Assets/Logo-header.svg';
import { ReactComponent as Barra } from '../Assets/Linha.svg';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link className={styles.logo} to="inicio" area-label="Clin - Home">
        <Clin />
      </Link>
      <nav className={styles.nav}>
        <NavLink
          className={styles.menu}
          activeStyle={{ color: ' #d75413' }}
          to="inicio"
        >
          Início
        </NavLink>
        <NavLink
          className={styles.menu}
          activeStyle={{ color: ' #d75413' }}
          to="sobre"
        >
          Sobre
        </NavLink>
        <NavLink
          className={styles.menu}
          activeStyle={{ color: ' #d75413' }}
          to="info"
        >
          Info
        </NavLink>
        <Barra className={styles.barra} />
        <NavLink
          className={styles.menu}
          activeStyle={{ color: ' #d75413' }}
          to="entrar"
        >
          Entrar
        </NavLink>
        <NavLink
          className={styles.cadastro}
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
