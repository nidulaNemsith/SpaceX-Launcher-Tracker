import { useState, useEffect } from "react";

const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches';

function LaunchTracker(){
    const [launches, setLanches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() =>{
        fetch(SPACEX_API_URL)
        .then((response) =>{
            if(!response.ok){
                throw new Error('Failed to fetch data');
            }
            return response.json();
        })
        .then((data)=>{
            setLanches(data);
            setLoading(false);
        })
        .catch((error) =>{
            setError(error);
            setLoading(false);
        }, []);
    });

    return(
        <div>
            <h1>SpaceX Launch Tracker</h1>
            {loading && <p>Loading...</p>}
            {error && <p>{error.message}</p>}
            <ul>
                {launches.map((launch) => (
                    <li key={launch.id}>
                        <h2>{launch.name}</h2>
                        <p>Data : {new Date(launch.date_utc).toLocaleDateString}</p>
                        <p>Rocket :{launch.rocket}</p>
                        <p>Launch Site : {launch.launchpad}</p>
                        <p>Details : {launch.details ? launch.details : 'No Details available for this launch'} </p>
                        <a href={launch.links.webcast} target="blank" rel="noopener noreferrer">Watch Launch</a>
                    </li>
                ))}
            </ul>

        </div>
    );
  
}

export default LaunchTracker;


