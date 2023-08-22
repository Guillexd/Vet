import { Dispatch, SetStateAction } from 'react'
import { UserI } from '../../../utils/interface'
import styled from 'styled-components'
import { fechaFormato, fechaString, showSWToDelete } from '../../../utils/utils'
import noUser from '../../../assets/no-user.jpg'
import { InitialState } from './CreateUser'

const Body = styled.div`
  background-color: ${props => props.theme.colors.bgColorCard};
  color: ${props => props.theme.colors.textColorCard};
`

export default function User({ user, setOption, setUser, setRenderUsers } : { user: UserI, setOption: Dispatch<SetStateAction<string>>, setUser: Dispatch<SetStateAction<InitialState>>, setRenderUsers: Dispatch<SetStateAction<UserI[]>> }) {
  const serverUrl: string = 'http://localhost:8080'
  const handleDeleteUser = ( email: string ) => {
    showSWToDelete<UserI[]>('¿Quieres eliminar este usuario?', '/user/delete-user', { email }, '/user', setRenderUsers)
  }

  return (
    <div className='col'>
      <div className='card shadow-sm'>
          <img src={user.profile_image ? serverUrl + `/profile_images/${user.profile_image}` : noUser} alt={user.name} style={{height: '40vh', objectFit: 'cover'} } />
        <Body>
          <div className='card-body'>
            <h3 className='text-center'>{user.nick_name || `${user.name} ${user.last_name}`}</h3>
            <div className='p-2'>
              <p className='card-text'>
                <strong>Nombre:</strong> {user.name}
              </p>
              <p className='card-text'>
                <strong>Apellido:</strong> {user.last_name}
              </p>
              <p className='card-text'>
                <strong>Edad:</strong> {user.age}
              </p>
              <p className='card-text'>
                <strong>Correo:</strong> {user.email}
              </p>
              <p className='card-text'>
                <strong>Fecha de creación:</strong> {fechaString(user.createdAt)}
              </p>
            </div>
            <div className='d-flex justify-content-between align-items-center'>
              <div className='btn-group'>
                <button type='button' className='btn btn-sm btn-outline-secondary' data-bs-toggle='modal' data-bs-target='#userModal' 
                onClick={()=>{
                  setOption('Editar')
                  setUser(user)
                }}
                >Modificar</button>
                <button type='button' className='btn btn-sm btn-outline-secondary' onClick={()=>handleDeleteUser(user.email)}>Eliminar</button>
              </div>
              <small>{ fechaFormato(user.createdAt) }</small>
            </div>
          </div>
        </Body>
      </div>
    </div>
  )
}
