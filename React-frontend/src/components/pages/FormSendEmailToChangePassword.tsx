import { ChangeEvent, FormEvent, useState } from 'react'
import { ToastContainer, toast, Flip } from 'react-toastify'
import { Link } from 'react-router-dom'
import { fetchHelper } from '../../utils/utils'
import SpinerToast from '../presentationals/SpinerToast'
import google from '../../assets/google.png'

export default function FormSendEmailToChangePassword() {
  const [verify, setVerify] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    const loadingToastId = toast(<SpinerToast text='Enviando mensaje'/> , { autoClose: 3000, hideProgressBar: true, });

    fetchHelper('POST', '/user/send-email', { email })
    .then((data) => {
      setIsLoading(false)
      if (data.status === 1) {
        toast.update(loadingToastId, { render: '¡Mensaje enviado a tu correo! Tiene 10 min. para cambiar su contraseña', type: toast.TYPE.INFO, autoClose: 1500, hideProgressBar: false, })
      } else {
        toast.update(loadingToastId, { render: data.message, type: toast.TYPE.ERROR, autoClose: 1500, hideProgressBar: false, })
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
        <form className='col-10 col-md-6 col-lg-4 col-xl-3' onSubmit={handleSubmit} autoComplete='off'>
          <img
            className='mb-4'
            src={google}
            alt=''
            width='100'
            height='100'
          />
          <h1 className='h3 mb-3 fw-normal'>Enviar mensaje a tu correo <code>xxxxx@gmail.com</code> para cambiar contraseña</h1>

          <div className='form-floating'>
            <input
              type='email'
              className='form-control'
              id='floatingInput'
              placeholder='name@example.com'
              value={verify}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setVerify(e.target.value)
              }}
            />
            <label htmlFor='floatingInput'>Correo electrónico</label>
          </div>
          <div className='form-floating mb-1'>
            <input
              type='text'
              className='form-control'
              id='floatingVerified'
              placeholder='Password'
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value)
              }}
            />
            <label htmlFor='floatingVerified'>Repita el correo electrónico</label>
          </div>

          <div className='btn-group-vertical w-100'>
            <button className='btn btn-primary w-100 py-2' type='submit' disabled={(verify !== email) || (verify.length < 1) || isLoading}>
              Enviar mensaje a ese correo
            </button>
            <button type='button' className='btn btn-secondary w-100 py-2' data-bs-theme-value='light'>
              <Link to={'/login'} className='text-decoration-none text-light'>
                  Volver a iniciar sesión
              </Link>
            </button>
          </div>

          <p className='mt-5 mb-3 text-body-secondary'>© 2023–2025</p>
        </form>
      </main>
    </>
  )
}
