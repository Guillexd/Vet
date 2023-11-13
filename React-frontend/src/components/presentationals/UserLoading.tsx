import styled from 'styled-components'
import noUser from '../../assets/no-user.jpg'

const Body = styled.div`
  background-color: ${props => props.theme.colors.bgColorCard};
  color: ${props => props.theme.colors.textColorCard};
`

export default function UserLoading() {
  const placeholders = Array.from({ length: 5 }, (_, index) => (
    <div className='col' key={index}>
      <div className='card shadow-sm'>
        <img src={noUser} alt='no-user-photo' className='opacity-0' />
        <Body>
          <div className='card-body placeholder-glow'>
            <h3 className='card-text placeholder col-11'>Enrique</h3>
            <div className='p-2'>
              <p className='card-text placeholder col-10'>
                <strong>Nombre:</strong> Enrique
              </p>
              <p className='card-text placeholder col-10'>
                <strong>Apellido:</strong> Enrique
              </p>
              <p className='card-text placeholder col-7'>
                <strong>Edad:</strong>Enrique
              </p>
              <p className='card-text placeholder col-12'>
                <strong>Correo:</strong> Enrique
              </p>
              <p className='card-text placeholder col-12'>
                <strong>Fecha de creación:</strong> Enrique
              </p>
            </div>
            <div className='d-flex justify-content-between align-items-center'>
              <div className='btn-group w-50'>
                <a className='btn btn-sm btn-secondary disabled placeholder col-6'></a>
                <a className='btn btn-sm btn-secondary disabled placeholder col-6'></a>
              </div>
              <small className='card-text placeholder col-3'>Enrique</small>
            </div>
          </div>
        </Body>
      </div>
    </div>
  ))

  return (
    <>
      {placeholders}
    </>
  )
}
