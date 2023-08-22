import { Dispatch, SetStateAction } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { fetchHelper } from '../../utils/utils';
import { useCustomContext } from '../../utils/context/Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.bgPrimary};
  position: sticky;
  top: 0;
  z-index: 999;
`

const Logo = styled.div`
  color: ${(props) => props.theme.colors.textColor};
  font-size: 2.5rem;
`

export default function NavBar({
  darkMode,
  setDarkMode,
}: {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}) {
  const { setIsAuth } = useCustomContext();

  function logOut() {
    fetchHelper('GET', '/user/logout', {}).then(() => {
      setTimeout(() => {
        setIsAuth(false);
      }, 600);
    });
  }

  function changeMode() {
    localStorage.setItem('mode', darkMode ? 'light' : 'dark');
    setDarkMode(!darkMode);
  }

  return (
    <Container>
      <div className='container-fluid navbar'>
        <header className='d-flex flex-wrap align-items-center justify-content-around  py-3 border-bottom w-100'>
          <div className='col-3 col-md-12 col-lg-3 mb-2 mb-md-0 text-center'>
            <Link to='/home'>
              <Logo>
                <FontAwesomeIcon icon={faPaw} />
              </Logo>
            </Link>
          </div>

          <ul className='nav col-12 col-md-auto mb-2 justify-content-center mb-md-0 d-none d-sm-flex'>
            <li>
              <NavLink
                to='/home'
                className={({ isActive }) =>
                  isActive ? 'nav-link px-2 link-secondary' : 'nav-link px-2'
                }
              >
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink
                  to='/user'
                  className={({ isActive }) =>
                    isActive ? 'nav-link px-2 link-secondary' : 'nav-link px-2'
                  }
                >
                  Usuarios
              </NavLink>
            </li>
            <li>
              <NavLink
                  to='/pet'
                  className={({ isActive }) =>
                    isActive ? 'nav-link px-2 link-secondary' : 'nav-link px-2'
                  }
                >
                  Mascotas
              </NavLink>
            </li>
            <li>
              <NavLink
                  to='/testimonial'
                  className={({ isActive }) =>
                    isActive ? 'nav-link px-2 link-secondary' : 'nav-link px-2'
                  }
                >
                  Testimonios
              </NavLink>
            </li>
            <li>
              <NavLink
                  to='/messenger'
                  className={({ isActive }) =>
                    isActive ? 'nav-link px-2 link-secondary' : 'nav-link px-2'
                  }
                >
                  Mensajería
              </NavLink>
            </li>
          </ul>

          <div className='col-4 col-md-12 col-lg-4 text-end d-none d-sm-flex justify-content-center me-3'>
            <button
              type='button'
              className='btn btn-outline-primary me-2 '
              onClick={changeMode}
            >
              {darkMode ? 'Claro' : 'Oscuro'}
            </button>
            <button type='button' className='btn btn-primary' onClick={logOut}>
              Cerrar sesión
            </button>
          </div>

          <button
            className='navbar-toggler border d-sm-none border border-primary'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarCollapse'
            aria-controls='navbarCollapse'
            aria-expanded='true'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>

          <div
            className='collapse navbar-collapse d-sm-none text-center'
            id='navbarCollapse'
          >
            <ul className='nav ml-auto text-primary d-flex flex-column'>
              <li className='nav-item'>
                <a href='#' className='nav-link px-2 link-secondary'>
                  Home
                </a>
              </li>
              <li className='nav-item'>
                <a href='#' className='nav-link px-2'>
                  Features
                </a>
              </li>
              <li className='nav-item'>
                <a href='#' className='nav-link px-2'>
                  Pricing
                </a>
              </li>
              <li className='nav-item'>
                <a href='#' className='nav-link px-2'>
                  FAQs
                </a>
              </li>
              <li className='nav-item'>
                <a href='#' className='nav-link px-2'>
                  About
                </a>
              </li>
            </ul>

            <div className='col-md-3 text-end d-flex justify-content-center me-3'>
              <button
                type='button'
                className='btn btn-outline-primary me-2 '
                onClick={changeMode}
              >
                {darkMode ? 'Claro' : 'Oscuro'}
              </button>
              <button
                type='button'
                className='btn btn-primary'
                onClick={logOut}
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </header>
      </div>
    </Container>
  )
}
