import React, { useState, useEffect } from 'react'

const useFetch = (url) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const fetchData = async()=>{
        const res = await fetch(url);
        const info = await res.json();
        setData(info);
        setLoading(false);
    }
    
    useEffect(()=>{
        setLoading(true);
        fetchData();
    },[url]);
    
    return {loading, data};
}

export default useFetch