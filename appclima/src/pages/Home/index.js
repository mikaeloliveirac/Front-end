import { useState } from 'react';
import api from '../../services/api';
import './home.css'
import { toast } from 'react-toastify';



export default function Home() {

    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState('')



    const handleChange = (e) => {
        setCity(e.target.value)
    }

    let cidade = document.querySelector(".cidade")

    async function handleSearch() {
        if (cidade === null) {
            return (
                toast.error("Campo cidade inválido")
            )
        }
        else {
            const res = await api.get(`data/2.5/weather?
            `, {
                params: {
                    q: city,
                    appid: process.env.REACT_APP_OPEN_WHEADER_KEY,
                    units: 'metric',
                    lang: 'pt'
                }
            }).then((res) => {
                setWeather(res.data)

            }).catch(() => {
                toast.error("Campo cidade inválido!")
            })
        }

    }


    if (weather === false) {
        return (
            <div>
                <h3>Caregando...</h3>
            </div>
        )



    }


    else {

        return (
            
            <div className='main'>

                <div className='container'>
                    <h1>O CLIMA NA SUA CIDADE.</h1>

                    <label>Digite a sua Cidade: </label>
                    <small>Exemplo: Lagarto,se</small>
                    <input type='text' value={city} onChange={handleChange} className='cidade' />
                    <button onClick={handleSearch}>Pesquisar</button>

                    {
                        weather ? (

                            <div className='content'>
                                <ul>
                                    <li> <strong className='temp'>{(weather['main']['temp']).toFixed()}° C</strong>
                                        <small>Temperatura atual</small>
                                    </li>

                                    <li> <strong className='temp'>{(weather['main']['feels_like']).toFixed()}° C</strong>
                                        <small>Sensação térmica </small>
                                    </li>

                                    <li> <strong className='temp'> {(weather['main']['temp_max']).toFixed()}° C</strong>
                                        <small>Temperatura máxima</small>
                                    </li>

                                    <li> <strong className='temp'>{(weather['main']['temp_min']).toFixed()}° C</strong>
                                        <small>Temperatura minima</small>
                                    </li>
                                    <li> <strong className='temp'>{weather['main']['pressure']} hpa</strong>
                                        <small>Pressão</small>
                                    </li>
                                    <li> <strong className='temp'>{weather['main']['humidity']}%</strong>
                                        <small>Humidade</small>
                                    </li>
                                </ul>
                            </div>



                        ) : null


                    }



                </div>
            </div>


        )
    }
}

