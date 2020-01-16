import React, {useEffect, useState} from 'react';

function DevForm({ onSubmit }){
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [username, setUsername] = useState('');
    const [techs, setTechs] = useState('');

    useEffect(()=> {
        navigator.geolocation.getCurrentPosition((position)=>{
         const { latitude, longitude } = position.coords;
         setLatitude(latitude);
         setLongitude(longitude);
        }, 
        (err)=>{
          console.log(err);
        },
        {
          timeout: 30000
        })
      }, []);

    async function handleSubmit(e){
        e.preventDefault();

         await onSubmit({
             github_username: username,
             techs,
             latitude,
             longitude
         });
         setUsername('');
         setTechs('');   
      }

      
    return (
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="github_username">Usuário do Github</label>
            <input name="github_username" value={username} onChange={e=> setUsername(e.target.value)} id="github_username" required/>
          </div>
          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input name="techs" value={techs} onChange={e=> setTechs(e.target.value)} id="techs" required/>
          </div>
          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input 
              name="latitude" 
              type="number"
              value={latitude} 
              onChange={e=> setLatitude(e.target.value)}
              id="latitude" 
              required/>
            </div>
            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input 
              name="longitude" 
              type="number" 
              value={longitude} 
              onChange={e=> setLongitude(e.target.value)}
              id="longitude" 
              required/>
            </div>
          </div>
          <button type="submit">Cadastrar</button>
        </form>
    )
}

export default DevForm;