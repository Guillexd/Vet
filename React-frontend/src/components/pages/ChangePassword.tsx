import { ChangeEvent, useState, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast, Flip } from 'react-toastify' 
import { useLocation } from 'react-router-dom'
import SpinerToast from '../presentationals/SpinerToast'
import { fetchHelper, isJSON } from '../../utils/utils'
import vet from '../../assets/vet.png'


export default function ChangePassword() {
  const [verify, setVerify] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const location = useLocation()
  const navigate = useNavigate()

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    const loadingToastId = toast(<SpinerToast text='Cambiando contraseña'/> , { autoClose: 3000, hideProgressBar: true, });

    fetchHelper('PUT', `/user/change-password${location.search}`, { password })
    .then((data) => {
      setIsLoading(false)
      if (data.status === 1) {
        toast.update(loadingToastId, { render: data.message, type: toast.TYPE.INFO, autoClose: 1500, hideProgressBar: false, })
        setTimeout(() => {
          navigate('/login')
        }, 1750);
      } else {
        const isJson = isJSON(data.message)
        if(isJson) {
          isJson.forEach((value: any) => {
            toast.update(loadingToastId, { render: value.msg, type: toast.TYPE.ERROR, autoClose: 1500, hideProgressBar: false, })
          })
        } else {
          toast.update(loadingToastId, { render: data.message, type: toast.TYPE.ERROR, autoClose: 1500, hideProgressBar: false, })
        }
      }
    })
    .catch(() => {
      toast.update(loadingToastId, { render: 'Hay problemas de conexión', type: toast.TYPE.WARNING, autoClose: 3000, hideProgressBar: false, })
      setIsLoading(false)
    });
  }

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
      <main className='d-flex justify-content-center text-center'>
        <form className='col-10 col-md-6 col-lg-4 col-xl-3' onSubmit={handleSubmit} autoComplete='off' >
          <img
            className='mb-4'
            src={vet}
            alt=''
            width='150'
            height='100'
            style={{ filter: 'brightness(1.1)', mixBlendMode: 'multiply' }}
          />
          <h1 className='h3 mb-3 fw-normal'>Cambiar contraseña</h1>

          <div className='form-floating'>
            <input
              type='password'
              className='form-control'
              id='password'
              placeholder='name@example.com'
              value={verify}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setVerify(e.target.value)
              }}
            />
            <label htmlFor='password'>Contraseña</label>
          </div>
          <div className='form-floating mb-1'>
            <input
              type='password'
              className='form-control'
              id='floatingPassword'
              placeholder='Password'
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value)
              }}
            />
            <label htmlFor='floatingPassword'>Repita la contraseña</label>
          </div>

          <div className='btn-group-vertical w-100'>
            <button
              className='btn btn-primary w-100 py-2'
              type='submit'
              disabled={(verify !== password) || (verify.length < 1) || isLoading}
            >
              Cambiar contraseña
            </button>
            <button
              type='button'
              className='btn btn-secondary w-100 py-2'
              data-bs-theme-value='light'
            >
              <Link
                to={'/login'}
                className='text-decoration-none text-light'
              >
                Iniciar sesión
              </Link>
            </button>
          </div>

          <p className='mt-5 mb-3 text-body-secondary'>© 2023–2025</p>
        </form>
      </main>
    </>
  );
}
