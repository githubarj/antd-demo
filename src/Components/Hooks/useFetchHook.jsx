import axios from "axios";
import { useEffect, useState } from "react";

function useFetchHook({url}) {
  const [data, setData] = useState();
  console.log(url);
  useEffect(() => {
    axios
      .get(url)
      .then((response) => setData(response.data))
      .catch((err) => console.error(err));
  }, []);

  return data ;
}

export default useFetchHook;
