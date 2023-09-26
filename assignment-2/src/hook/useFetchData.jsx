import {useEffect, useState} from "react";
import axios from "../axios";

const useFetchData = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
      const fetchData = async () =>{
          setLoading(true)
          const res = await axios.get(url);
          if (res) {
              setData(res);
              setLoading(false)
          } else {
              setLoading(false);
              setError(true)
          }
      }
       fetchData();
    }, []);

    return {
        error,
        data,
        setData,
        loading
    };
};
export default useFetchData;

