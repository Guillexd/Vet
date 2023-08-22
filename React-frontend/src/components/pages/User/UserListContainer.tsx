import { useState, useEffect, ChangeEvent } from 'react'
import { DataWithDocs, UserI } from '../../../utils/interface'
import User from './User';
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import CreateUser from './CreateUser'
import { InitialState } from './CreateUser'
import InfiniteScroll from 'react-infinite-scroll-component'
import UserLoading from '../../presentationals/UserLoading'
import useFetchData from '../../../utils/useFecthData'
import useDebounce from '../../../utils/useDebounce';

const Body = styled.div`
background-color: ${props => props.theme.colors.bgColorCard};
color: ${props => props.theme.colors.textColorCard};
height: 100%;
font-size: 10rem;
display: flex;
justify-content: center;
align-items: center;
padding: 10px;
&:hover{
  background-color: ${props => props.theme.colors.hoverColorCard};
  color: ${props => props.theme.colors.hoverTextColor};
  cursor: pointer;
}
`

const Text = styled.h1`
color: ${(props)=>props.theme.colors.textColor};
text-align: center;
`

export default function UserListContainer() {

  const initialState : InitialState = {
    name: '',
    last_name: '',
    nick_name: null,
    age: 0,
    email: null,
    password: null,
    image: null,
  }

  const [filter, setFilter] = useState<string>('name')
  const [inputFilter, setInputFilter] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const [helper, setHelper] = useState<number>(0)
  const [option, setOption] = useState<string>('Crear')
  const [user, setUser] = useState<InitialState>(initialState)
  const [renderUsers, setRenderUsers] = useState<UserI[]>([])
  const [limit, setLimit] = useState<number>(0)
  
  const { debounceValue } = useDebounce(inputFilter, 500)
  const { data, loading } = useFetchData<DataWithDocs<UserI>>(`/user?page=${page}&filter=${filter}&inputFilter=${debounceValue}`, [page, helper])

  useEffect(()=>{
    setPage(1)
    setLimit(6)
    setHelper((prev)=>prev+1)
  }, [debounceValue])

  useEffect(()=>{
    if(!loading) {
      if(data.docs){
        if(debounceValue.length > 0 && page > 1) {
          setRenderUsers((prevUsers) => [...prevUsers, ...data.docs])
        } else if(debounceValue.length > 0){
          setRenderUsers(data.docs)
        } else if(debounceValue.length === 0 && page === 1){
          setRenderUsers(data.docs)
        } else {
          setRenderUsers((prevUsers) => [...prevUsers, ...data.docs])
        }
        setLimit(data.limit * data.page)
      }
    }
  }, [data])

  return (
    <div className='container'>
      <Text>
        Usuarios
      </Text>
      {loading && helper < 2
        ?
        <div className='d-flex justify-content-end my-2'>
          <div className='col-5 col-md-3 col-lg-2 p-0 me-1'>
            <select className='form-select p-2 placeholder'></select>
          </div>
          <div className='placeholder col-7 col-md-5 col-lg-3 p-0'>
          
          </div>
        </div>
        : 
        <div className='d-flex justify-content-center justify-content-md-end my-2 flex-wrap flex-md-nowrap'>
          <button className='btn btn-primary me-1 col-5 col-md-3 col-lg-auto mb-1' onClick={()=>setInputFilter('')}>Limpiar filtros</button>
          <div className='col-6 col-md-3 col-lg-2 p-0 me-1 mb-1'>
            <select className='form-select p-2 text-center' onChange={((e: ChangeEvent<HTMLSelectElement>)=>setFilter(e.target.value))}>
              <option value="name">Nombre</option>
              <option value="last_name">Apellido</option>
              <option value="age">Edad</option>
              <option value="email">Correo</option>
              {/* <option value="createdAt">Fecha</option> */}
            </select>
          </div>
          <div className='col-11 col-md-6 col-lg-3 p-0 position-relative'>
            <input type='text' className='form-control p-2 text-center' value={inputFilter} onChange={(e: ChangeEvent<HTMLInputElement>)=>{
              setInputFilter(e.target.value)
            }} />
              {loading && 
              <div className="spinner-border text-primary position-absolute top-0 end-0 mt-1 me-1" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>}
            {/* <input type="date" className='form-control p-2 text-center' /> */}
            </div>  
        </div>
      }
      {loading && renderUsers.length < 1
        ? 
        <div className='row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3 d-flex justify-content-center'>
          <UserLoading />
        </div>
       : 
      <>
        <InfiniteScroll
          dataLength={renderUsers.length}
          next={()=>setPage((prevPage) => prevPage + 1)}
          hasMore={data.hasNextPage}
          loader={<UserLoading />}
          className='row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3 d-flex justify-content-center'>
            <div className='col' data-bs-toggle='modal' data-bs-target='#userModal' 
              onClick={()=>{
                setOption('Crear')
                setUser(initialState)
              }}>
              <div className='card shadow-sm h-100'>
                <Body>
                  <FontAwesomeIcon icon={faUserPlus} />
                </Body>
              </div>
            </div>
            {renderUsers.map((user: UserI, index: number) => <User user={user} setOption={setOption} setUser={setUser} setRenderUsers={setRenderUsers} key={index} />)}
        </InfiniteScroll>
        <CreateUser id='userModal' option={option} user={user} setRenderUsers={setRenderUsers} limit={limit} filter={filter} debounceValue={debounceValue} />
      </>
      }
    </div>
  )
}
