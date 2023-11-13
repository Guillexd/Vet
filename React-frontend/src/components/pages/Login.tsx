import { ChangeEvent, useReducer, FormEvent, useState, useEffect } from 'react'
import { useCustomContext } from '../../utils/context/Context'
import { fetchHelper } from '../../utils/utils'
import { ToastContainer, toast, Flip } from 'react-toastify'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons' 
import { faPaw } from '@fortawesome/free-solid-svg-icons'
import SpinerToast from '../presentationals/SpinerToast'
import styled from 'styled-components'
import { uri } from '../../utils/utils'

type InitialState = {
  email: string
  password: string
}

const enum REDUCER_ACTION_TYPE {
  UPDATE_EMAIL,
  UPDATE_PASSWORD,
}

type ReducerAction = {
  type: REDUCER_ACTION_TYPE
  payload: string
}

const initialState: InitialState = {
  email: '',
  password: '',
}

function reducer(
  state: typeof initialState,
  action: ReducerAction
): InitialState {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.UPDATE_EMAIL:
      return { ...state, email: action.payload ?? '' }
      break

    case REDUCER_ACTION_TYPE.UPDATE_PASSWORD:
      return { ...state, password: action.payload ?? '' }
      break

    default:
      return state
      break
  }
}

const Logo = styled.div`
  color: ${props => props.theme.colors.textColor};
  font-size: 8rem;
`

const Text = styled.div`
  color: ${props => props.theme.colors.textColor};
`

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export default function Login() {
  const { setIsAuth } = useCustomContext()
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    const loadingToastId = toast(<SpinerToast text='Cargando...' />, { autoClose: 3000, hideProgressBar: true, });
    
    fetchHelper('POST', '/user/login', state)
    .then((data) => {
      setIsLoading(false)
      if (data.status === 1) {
        toast.update(loadingToastId, { render: '¡Iniciando sesión!', type: toast.TYPE.SUCCESS, autoClose: 1000, hideProgressBar: false, })
        setTimeout(() => {
          setIsAuth(true)
        }, 1250);
      } else {
        toast.update(loadingToastId, { render: data.message, type: toast.TYPE.ERROR, autoClose: 1500, hideProgressBar: false, })
      }
    })
    .catch(() => {
      toast.update(loadingToastId, { render: 'Hay problemas de conexión', type: toast.TYPE.WARNING, autoClose: 3000, hideProgressBar: false, })
      setIsLoading(false)
    });
  }

  const redirectToGoogleSSO = async () => {
    const googleLoginURL = `${uri}/user/login-google`;
    const width = 500;
    const height = 600;

    const left = (screen.availWidth - width) / 2;
    const top = (screen.availHeight - height) / 2;

    window.open(
      googleLoginURL,
      '_blank',
      `width=${width}, height=${height}, left=${left}, top=${top}`
    )
  }

  useEffect(() => {
    // Agrega un listener para escuchar los mensajes enviados desde la ventana emergente
    const messageListener = (event: any) => {
      if (event.origin === uri) {
        // Verifica que el mensaje sea válido y contiene el token de acceso
        if (event.data && event.data.token) {
          const accessToken = event.data.token;
          const loadingToastId = toast(<SpinerToast text='Cargando...' />, { autoClose: 3000, hideProgressBar: true, });
          if(!!accessToken) {
            fetchHelper('POST', '/user/cookie-passport', { jwtToken: accessToken })
            .then((data) => {
              setIsLoading(false)
              if (data.status === 1) {
                toast.update(loadingToastId, { render: '¡Iniciando sesión!', type: toast.TYPE.SUCCESS, autoClose: 1000, hideProgressBar: false, })
                setTimeout(() => {
                  setIsAuth(true)
                }, 1250)
              } else {
                toast.update(loadingToastId, { render: '¡Error al iniciar sesión!', type: toast.TYPE.ERROR, autoClose: 1500, hideProgressBar: false, })
              }
            })
            .catch(() => {
              toast.update(loadingToastId, { render: 'Hay problemas de conexión', type: toast.TYPE.WARNING, autoClose: 3000, hideProgressBar: false, })
              setIsLoading(false)
            });
          }
          
        }
      }
    }

    window.addEventListener('message', messageListener);

    return () => {
      window.removeEventListener('message', messageListener);
    };
  }, []);

  return (
    <>
      <ToastContainer
        position='top-right'
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Flip}
        theme='light'
      />

      <Container>
        <main className='d-flex justify-content-center text-center'>
          <form className='col-10 col-md-6 col-lg-4 col-xl-3' onSubmit={handleSubmit}  autoComplete='off'>

            <Logo>
              <FontAwesomeIcon icon={faPaw} />
            </Logo>
            <Text>
              <h1 className='h3 mb-3 fw-normal'>Iniciar sesión en Vet</h1>
            </Text>

            <div className='form-floating'>
              <input
                type='email'
                className='form-control'
                id='floatingInput'
                placeholder='name@example.com'
                value={state.email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  dispatch({
                    type: REDUCER_ACTION_TYPE.UPDATE_EMAIL,
                    payload: e.target.value,
                  })
                }}
                />
              <label htmlFor='floatingInput'>Correo electrónico</label>
            </div>
            <div className='form-floating mb-1'>
              <input
                autoComplete='true'
                type='password'
                className='form-control'
                id='floatingPassword'
                placeholder='Password'
                value={state.password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  dispatch({
                    type: REDUCER_ACTION_TYPE.UPDATE_PASSWORD,
                    payload: e.target.value,
                  })
                }}
                />
              <label htmlFor='floatingPassword'>Contraseña</label>
            </div>

            <div className='btn-group-vertical w-100'>
              <button className='btn btn-primary w-100 py-2' type='submit' disabled={state.email.length === 0 || state.password.length === 0 || isLoading}>
                Ingresar
              </button>
              <button type='button' className='btn btn-secondary w-100 py-2' data-bs-theme-value='light'>
                <Link to={'/send-email'} className='text-decoration-none text-light'>
                    Cambiar contraseña
                </Link>
              </button>
              <button type='button' className='btn btn-success w-100 py-2' onClick={redirectToGoogleSSO}>
                <FontAwesomeIcon icon={faGoogle} size='3x' bounce /> <br />
                Iniciar sesión con google
              </button>
            </div>

            <p className='mt-5 mb-3 text-body-secondary'>© 2023–2025</p>
          </form>
        </main>
      </Container>
    </>
  )
}
