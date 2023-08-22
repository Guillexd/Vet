import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  color: ${props => props.theme.colors.textColor};
  height: 100vh;
  display: flex;
  align-items: center;
`

export default function ErrorNotFound() {
  return (
    <Container>
      <Link to='/home'>
        <button className='btn btn-primary position-absolute top-0 end-0 mt-4 me-4'>Volver</button>
      </Link>
      <div className='container'>
          <div className='row'>
              <div className='col-md-6 offset-md-3'>
                  <div className='text-center'>
                      <h1 className='display-4'>Error 404</h1>
                      <p className='lead'>Página no encontrada</p>
                      <p>Lo sentimos, la página que estás buscando no existe.</p>
                  </div>
              </div>
          </div>
      </div>
    </Container>
  )
}
