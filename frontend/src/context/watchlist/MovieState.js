import React,{useState} from 'react'
import WatchlistContext from "./WatchlistContext";
const MovieState = (props) => {

    const [movieN2, setMovien2] = useState("");
  return (
    <WatchlistContext.Provider value={{setMovien2,movieN2}}>
            {props.children}
    </WatchlistContext.Provider>
  )
}

export default MovieState