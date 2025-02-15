import React, { useState } from 'react'
import trayectosService from '../Controllers/TrayectoControllers'
import ListCardTrayectoSearch from '../Components/Trayectos/ListCardTrayectoSearch'
export default function MainPage() {
const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [resultados, setResultados] = useState([]);
const [error, setError] = useState('');

  const handleSubmit = async (event)=>{
    event.preventDefault()
    trayectosService.obtenerTodosTrayectos().then((response)=>{
      console.log(response)
    })


    const searchParams = new URLSearchParams({ from, to, time })
   


   const formatteTime = time.replace("T", " ");
   console.log(formatteTime)
    trayectosService.buscarTrayectos(from, to, formatteTime).then((response)=>{
        setResultados(response);
        console.log(response)
    }).catch((error)=>{
      setError(error.message);
    })
          

  }
  return (
    <>
    {error? <p>{error}</p> : null}
    <form onSubmit={handleSubmit}>
        <input type="text" name="origen" id="origen" onInput={(e)=> setFrom(e.target.value)}/>
        <input type="text" name="destino" id="destino" onInput={(e)=> setTo(e.target.value)}/>
        
        <input type="datetime-local" pattern='yyyy-MM-dd HH:mm' name="hora" id="hora" onInput={(e)=> setTime(e.target.value)}/>
        <button type="submit">Buscar</button>
    </form>
    <div>
                <h2>Resultados:</h2>
                <ListCardTrayectoSearch listTrayectos={resultados}/> 
            
        </div>
    </>
  )
}
