import { useReducer, ChangeEvent, useEffect, Dispatch, SetStateAction, useState, FormEvent } from 'react'
import styled from 'styled-components'
import { fetchData, fetchHelper } from '../../../utils/utils'
import { UserI, DataWithDocs, fecthData } from '../../../utils/interface'
import { isJSON } from '../../../utils/utils'
import { ToastContainer, toast, Flip } from 'react-toastify' 
import Swal from 'sweetalert2'

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

const Modal = styled.div`
background-color: ${props => props.theme.colors.bgColorCard};
color: ${props => props.theme.colors.textColorCard};
`

export type InitialState = {
  name: string,
  last_name: string,
  nick_name?: string | null,
  age: number,
  email?: string | null,
  password?: string | null,
  profile_image?: null | any,
  [key: string]: string | number | null | undefined | any,
}

const REDUCER_ACTION_TYPE: any = {
  name: 'MODIFY_NAME',
  last_name: 'MODIFY_LAST_NAME',
  nick_name: 'MODIFY_NICK_NAME',
  age: 'MODIFY_AGE',
  email: 'MODIFY_EMAIL',
  password: 'MODIFY_PASSWORD',
  profile_image: 'MODIFY_PROFILE_IMAGE',
}

type ReducerAction = {
  type: string,
  payload: unknown,
}

function reducer( state: InitialState, action: ReducerAction): InitialState {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.name:
      return { ...state, name: action.payload as string }
      break;
    case REDUCER_ACTION_TYPE.last_name:
      return { ...state, last_name: action.payload as string }
      break;
    case REDUCER_ACTION_TYPE.nick_name:
      return { ...state, nick_name: action.payload as string }
      break;
    case REDUCER_ACTION_TYPE.age:
      return { ...state, age: action.payload as number }
      break;
    case REDUCER_ACTION_TYPE.email:
      return { ...state, email: action.payload as string }
      break;
    case REDUCER_ACTION_TYPE.password:
      return { ...state, password: action.payload as string }
      break;
    case REDUCER_ACTION_TYPE.profile_image:
      return { ...state, profile_image: action.payload as File }
      break;
    default:
      return state;
  }
}

  export default function CreateUser({ id, option, user, setRenderUsers, limit, filter, debounceValue }: { id: string, option: string, user: InitialState, setRenderUsers: Dispatch<SetStateAction<UserI[]>>, limit: number, filter: string, debounceValue: string }) {

    const options = {
      method: option === 'Crear' ? 'POST' : 'PUT',
      url: option === 'Crear' ? '/user/register' : '/user/update-user'
    }

    const [state, dispatch] = useReducer(reducer, user)
    const [password, setPassword] = useState<string>('')
    const [makeRequest, setMakeRequest] = useState<boolean>(false)

    const fetchUser = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setMakeRequest(true)
      fetchHelper(options.method, options.url, state, true)
      .then((_data: fecthData) => {
        if(_data.status === 1) {
          Toast.fire({
            icon: 'success',
            title: _data.message
          })
          fetchData<DataWithDocs<UserI>>(`/user?limit=${limit}&filter=${filter}&inputFilter=${debounceValue}`)
          .then((data) => {
            document.getElementById('closeButtonModal')?.click()
            setRenderUsers(data.docs)
          })
        } else {
          const isJson = isJSON(_data.message)
          if(isJson) {
            isJson.forEach((value: any) => {
              toast.error(value.msg, { autoClose: 3500, hideProgressBar: false, })
            })
          } else {
              toast.error(_data.message, { autoClose: 3500, hideProgressBar: false, })
          }
        }
      }
      )
      .finally(()=>setMakeRequest(false))
    }

    useEffect(()=>{
      const profileImageInput = document.getElementById('profile_image') as HTMLInputElement
      profileImageInput.value = ''
      for (const key in REDUCER_ACTION_TYPE) {
        const actionType = REDUCER_ACTION_TYPE[key]
        const payload = user.hasOwnProperty(key) ? user[key] : null
        dispatch({
          type: actionType,
          payload: payload,
        })
      }  
    }, [user])
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
        <div className='modal fade' id={id} tabIndex={-1} aria-labelledby={`${id}Label`} aria-hidden='true'>
        <div className='modal-dialog'>
          <form className='modal-content' onSubmit={fetchUser}>
            <Modal>
              <div className='modal-header'>
                <h1 className='modal-title fs-4' id={`${id}Label`}>{option} usuario</h1>
                <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
              </div>
              <div className='modal-body row'>
                <div className='col-12 col-md-6 mb-3'>
                  <label htmlFor='name' className='form-label'><strong>Nombre</strong></label>
                  <input type='text' className='form-control' id='name' aria-describedby='name'
                    value={state.name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      dispatch({
                        type: REDUCER_ACTION_TYPE.name,
                        payload: e.target.value
                      })
                    }}
                    />
                </div>
                <div className='col-12 col-md-6 mb-3'>
                  <label htmlFor='last_name' className='form-label'> <strong>Apellido</strong></label>
                  <input type='text' className='form-control' id='last_name' aria-describedby='last_name'
                    value={state.last_name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      dispatch({
                        type: REDUCER_ACTION_TYPE.last_name,
                        payload: e.target.value
                      })
                    }}
                    />
                </div>
                <div className='col-12 col-md-6 mb-3'>
                  <label htmlFor='age' className='form-label'> <strong>Edad</strong></label>
                  <input type='text' className='form-control' id='age' aria-describedby='age'
                    value={state.age}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      dispatch({
                        type: REDUCER_ACTION_TYPE.age,
                        payload: e.target.value
                      })
                    }}
                    />
                </div>
                <div className='col-12 col-md-6 mb-3'>
                  <label htmlFor='nick_name' className='form-label'> <strong>Apodo</strong></label>
                  <input type='text' className='form-control' id='nick_name' aria-describedby='nick_name'
                    value={state.nick_name || ''}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      dispatch({
                        type: REDUCER_ACTION_TYPE.nick_name,
                        payload: e.target.value
                      })
                    }}
                    />
                </div>
                <div className='col-12 mb-3'>
                  <label htmlFor='profile_image' className='form-label'> <strong>Imagen</strong></label>
                  <input type='file' className='form-control' id='profile_image' aria-describedby='profile_image' accept='image/*'
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      const file = e.target.files && e.target.files[0]
                      dispatch({
                        type: REDUCER_ACTION_TYPE.profile_image,
                        payload: file,
                      })
                    }}
                    />
                </div>
                {
                  option !== 'Editar' && 
                  <>
                    <div className='col-12 mb-3'>
                      <label htmlFor='email' className='form-label'> <strong>Correo</strong></label>
                      <input type='email' className='form-control' id='email' aria-describedby='email'
                        value={state.email ?? ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          dispatch({
                            type: REDUCER_ACTION_TYPE.email,
                            payload: e.target.value
                          })
                        }}
                        />
                    </div>
                    <div className='col-12 col-md-6 mb-3'>
                      <label htmlFor='trick' className='form-label'> <strong>Contraseña</strong></label>
                      <input type='password' className='form-control' id='trick' aria-describedby='trick' autoComplete='on'
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          setPassword(e.target.value)
                        }}
                        />
                    </div>
                    <div className='col-12 col-md-6 mb-3'>
                      <label htmlFor='password' className='form-label'> <strong>Repetir contraseña</strong></label>
                      <input type='password' className='form-control' id='password' aria-describedby='password' autoComplete='on'
                        value={state.password ?? ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          dispatch({
                            type: REDUCER_ACTION_TYPE.password,
                            payload: e.target.value
                          })
                        }}
                        disabled={password.length < 4}
                        />
                    </div>
                  </>
                }
              </div>
              <div className='modal-footer'>
                <button id='closeButtonModal' type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Cerrar</button>
                <button type='submit' className='btn btn-primary' disabled={password !== state.password && option !== 'Editar' || makeRequest}>{option}</button>
              </div>
            </Modal>
          </form>
        </div>
      </div>
    </>
    )
  }
