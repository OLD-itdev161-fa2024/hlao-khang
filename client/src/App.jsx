import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  let [state, setState] = useState({});
  useEffect((_) => {
    axios
      .get("http://localhost:5000")
      .then((response) => {
        setState({ data: response.data });
      })
      .catch((error) => console.log(`Error fetching data: ${error}`));
  });
  return (
    <>
      <h1>works</h1>
      {state.data}
    </>
  );
}

export default App;
