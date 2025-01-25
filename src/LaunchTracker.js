import { useState, useEffect } from "react";

const SPACEX_API_URL = 'https://api.specexdata.com/v4/launches';

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

    
}


