import axios from 'axios'
import { DataWithDocs, fecthData } from './interface'
import Swal from 'sweetalert2'
import { Dispatch, SetStateAction } from 'react'

export const uri: string = 'http://localhost:8080'
// export const uri: string = 'https://fe91-179-6-42-33.ngrok-free.app'

export const fetchHelper = (method: string, url: string, body: object, file: boolean = false): Promise<fecthData> => {
  const options: any = {
    method: method,
    url: `${uri}${url}`,
    data: body,
    withCredentials: true,
  }
  if(!!file) {
    options.headers = {
      'Content-Type': 'multipart/form-data',
    }
  }
  return axios(options)
  .then((response) => {
    return response.data
  }).catch((error) => {
    return error.response.data
  })
}

export const fetchData = <T>(url: string): Promise<T> => {
  return axios({
    method: 'GET',
    url: `${uri}${url}`,
    withCredentials: true,
  })
    .then((response) => response.data as T)
    .catch((error) => error.response.data);
}

export const getToken = (): Promise<fecthData> => {
    return axios({
        method: 'GET',
        url: `${uri}/user/get-token`,
        withCredentials: true,
      }).then((response) => {
        return response.data
      }).catch((error) => {
        return error.response.data
      })
}

export const isJSON = (data: string) => {
  try {
    const array = JSON.parse(data)
    return array
  } catch (error) {
    return false
  }
}

export const fechaString = (date: string): string => {
  const fecha = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };
  const formattedFecha = fecha.toLocaleString('es-PE', options);
  return formattedFecha;
}

export const fechaFormato = (date: string): string => {
  const fecha = new Date(date);
  const year = fecha.getFullYear();
  const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
  const day = fecha.getDate().toString().padStart(2, '0');
  const formattedFecha = `${year}-${month}-${day}`;
  return formattedFecha;
}

export const showSWToDelete = <T>( title: string, urlD: string, body: { email: string}, urlG: string, setData: Dispatch<SetStateAction<T>> ) => {
  Swal.fire({
    title: title,
    text: "No podrás revertir esto",
    icon: 'warning',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, ¡Eliminalo!',
  }).then((result) => {
    if (result.isConfirmed) {
      fetchHelper('DELETE', urlD, body)
      .then((data) => {
        if(data.status === 1) {
          Swal.fire({
            title: '¡Eliminado!',
            text: 'El dato ha sido eliminado.',
            icon: 'success',
            timer: 1500,
            timerProgressBar: true,
          })
          fetchData<DataWithDocs<T>>(urlG)
          .then((data) => {
            setData(data.docs as T)
          })
        } else {
          Swal.fire({
            title: '¡No se eliminó!',
            text: 'El dato no se pudo eliminar.',
            icon: 'error',
            timer: 1500,
            timerProgressBar: true,
          })
        }
      })
    }
  })
}