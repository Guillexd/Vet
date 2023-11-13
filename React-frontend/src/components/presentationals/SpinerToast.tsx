
export default function SpinerToast({ text }: { text: string }) {
  return (
    <div className='d-flex'>
    <div className='spinner-border text-primary' role='status'>
        <span className='visually-hidden'>Cargando...</span>
    </div>
    <span className='ps-3 align-self-center'>{text}</span>
    </div>
  )
}
