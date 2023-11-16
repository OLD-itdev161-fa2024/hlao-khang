import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [state, setState] = useState({ data: null });
  useEffect(() => {
    axios
      .get("http://localhost:5000")
      .then((res) => {
        try {
          setState({ data: res.data });
        } catch (err) {
          console.log(`Error: ${err.message}`);
        }
      })
      .catch((err) => console.log(`Error fetching data ${err}`));
  });

  return <>{state.data}</>;
}
