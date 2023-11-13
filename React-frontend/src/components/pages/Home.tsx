export default function Home() {
  return (
    <div className='container'>
      <div className='d-flex flex-wrap'>
        {/* <div className='card' aria-hidden='true'>
          <img src='...' className='card-img-top' alt='...' />
          <div className='card-body'>
            <h5 className='card-title placeholder-glow'>
              <span className='placeholder col-6'></span>
            </h5>
            <p className='card-text placeholder-glow'>
              <span className='placeholder col-7'></span>
              <span className='placeholder col-4'></span>
              <span className='placeholder col-4'></span>
              <span className='placeholder col-6'></span>
              <span className='placeholder col-8'></span>
            </p>
            <a className='btn btn-primary disabled placeholder col-6'></a>
          </div>
        </div> */}
        <div className='card shadow-sm'>
          <svg
            className='bd-placeholder-img card-img-top'
            width='100%'
            height='225'
            role='img'
            aria-label='Placeholder: صورة مصغرة'
            preserveAspectRatio='xMidYMid slice'
            focusable='false'
          >
            <title>Cargando...</title>
            <rect width='100%' height='100%' fill='#55595c'></rect>
            <text x='100' y='100' fill='#eceeef' dy='.3em'>
              Cargando ...
            </text>
          </svg>
          <div className='card-body placeholder-glow'>
            <p className='card-text placeholder col-7'>
              Titulo
            </p>
            <div className='d-flex justify-content-between align-items-center'>
              <div className='btn-group w-25'>
                
              <a className='btn btn-sm btn-secondary disabled placeholder col-6'></a>
              <a className='btn btn-sm btn-secondary disabled placeholder col-6'></a>
            
              </div>
              <small className='text-body-secondary placeholder'>Fecha</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
