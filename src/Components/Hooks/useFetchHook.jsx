import axios from "axios";
import { useEffect, useState } from "react";

function useFetchHook(endPoint) {
  const [data, setData] = useState();
  useEffect(() => {
    axios
      .get(endPoint)
      .then((response) => setData(response.data))
      .catch((err) => console.error(err));
  }, []);

  return data ;
}

export default useFetchHook;
