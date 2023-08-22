import { Link } from 'react-router-dom'
import { ToastContainer, Flip } from 'react-toastify' 
import vet from '../../assets/vet.png'


export default function AddUser() {
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
        <form
          className='col-10 col-md-6 col-lg-4 col-xl-3'
          autoComplete='off'
        >
          <img
            className='mb-4'
            src={vet}
            alt=''
            width='150'
            height='100'
            style={{ filter: 'brightness(1.1)', mixBlendMode: 'multiply' }}
          />
          <h1 className='h3 mb-3 fw-normal'>Nombre</h1>

          <div className='form-floating'>
            <input
              type='text'
              className='form-control'
              id='name'
              placeholder='name@example.com'
             
            />
            <label htmlFor='name'>Nombre</label>
          </div>
          <div className='form-floating'>
            <input
              type='last_name'
              className='form-control'
              id='floatingInput'
              placeholder='name@example.com'
             
            />
            <label htmlFor='last_name'>Apellido</label>
          </div>
          <div className='form-floating'>
            <input
              type='text'
              className='form-control'
              id='nickname'
              placeholder='name@example.com'
             
            />
            <label htmlFor='nickname'>¿Desea un apodo?</label>
          </div>
          <div className='form-floating'>
            <input
              type='text'
              className='form-control'
              id='age'
              placeholder='name@example.com'
             
            />
            <label htmlFor='age'>Edad</label>
          </div>
          <div className='form-floating'>
            <input
              type='text'
              className='form-control'
              id='email'
              placeholder='name@example.com'
             
            />
            <label htmlFor='email'>Correo electrónico</label>
          </div>
          <div className='form-floating'>
            <input
              type='password'
              className='form-control'
              id='password'
              placeholder='name@example.com'
             
            />
            <label htmlFor='password'>Contraseña</label>
          </div>
          <div className='form-floating mb-1'>
            <input
              type='password'
              className='form-control'
              id='floatingPassword'
              placeholder='Password'
             
            />
            <label htmlFor='floatingPassword'>Repita la contraseña</label>
          </div>

          <div className='btn-group-vertical w-100'>
            <button
              className='btn btn-primary w-100 py-2'
              type='submit'
              // disabled={
              //   state.email.length === 0 ||
              //   state.password.length === 0 ||
              //   isLoading
              // }
            >
              Cambiar contraseña
            </button>
            <button
              type='button'
              className='btn btn-secondary w-100 py-2'
              data-bs-theme-value='light'
            >
              <Link
                to={'/send-email'}
                className='text-decoration-none text-light'
              >
                Cambiar contraseña
              </Link>
            </button>
          </div>

          <p className='mt-5 mb-3 text-body-secondary'>© 2023–2025</p>
        </form>
      </main>
    </>
  );
}
