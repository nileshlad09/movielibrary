import React ,{useState,useEffect} from 'react'



const Wheretowatch = (params) => {
    const IMG_URL = process.env.REACT_APP_IMG_URL;
    const API_KEY = process.env.REACT_APP_API_KEY;
  const BASE_URL = process.env.REACT_APP_BASE_URL;
   const {movieid,type}=params;

    const [providers, setProvider] = useState([]);
    const [providers2, setProvider2] = useState([]);
    const [providers3, setProvider3] = useState([]);
    // const id = localStorage.getItem("movieId");

    useEffect(()=>{
        //watch provider
        fetch(BASE_URL + `/${type}/${movieid}/watch/providers?` + API_KEY)
        .then((res) => res.json())
        .then((data) => {
            let provider = data.results.IN;
            if (data.results) {
                setProvider(provider?.flatrate);
                setProvider2(provider?.buy);
                setProvider3(provider?.rent);
            }
        });
    },[])
    
    
    return (
        <div>
            <div className="provider">
                <h3>Where to Watch</h3>
                <div
                    className="provider2"
                    style={{
                        display: providers === undefined ? "none" : "flex",
                    }}
                >
                    <div
                        className="providers"
                        style={{
                            display: providers === undefined ? "none" : "flex",
                        }}
                    >
                        <h4>Watch Online</h4>
                        <div className="p1">
                            {providers != undefined ? (
                                providers.map((p) => {
                                    return (
                                        <div className="ott">
                                            <img
                                                src={IMG_URL + p.logo_path}
                                                style={{
                                                    display:
                                                        IMG_URL + p.logo_path ? "block" : "none",
                                                }}
                                                alt=""
                                            />
                                            {/* <p className="provider-name">{p.provider_name}</p> */}
                                        </div>
                                    );
                                })
                            ) : (
                                <p className="provider-name">currently not available</p>
                            )}
                        </div>
                    </div>
                    <div
                        className="providers"
                        style={{
                            display: providers2 === undefined ? "none" : "block",
                        }}
                    >
                        <h4>Buy</h4>
                        <div className="p1">
                            {providers2 != undefined ? (
                                providers2.map((p) => {
                                    return (
                                        <div className="ott">
                                            <img
                                                src={IMG_URL + p.logo_path}
                                                style={{
                                                    display:
                                                        IMG_URL + p.logo_path ? "block" : "none",
                                                }}
                                                alt=""
                                            />
                                            {/* <p className="provider-name">{p.provider_name}</p> */}
                                        </div>
                                    );
                                })
                            ) : (
                                <p className="provider-name">currently not available</p>
                            )}
                        </div>
                    </div>
                    <div
                        className="providers"
                        style={{
                            display: providers3 === undefined ? "none" : "block",
                        }}
                    >
                        <h4>Rent</h4>
                        <div className="p1">
                            {providers3 != undefined ? (
                                providers3.map((p) => {
                                    return (
                                        <div className="ott">
                                            <img
                                                src={IMG_URL + p.logo_path}
                                                style={{
                                                    display:
                                                        IMG_URL + p.logo_path ? "block" : "none",
                                                }}
                                                alt=""
                                            />
                                            {/* <p className="provider-name">{p.provider_name}</p> */}
                                        </div>
                                    );
                                })
                            ) : (
                                <p className="provider-name">currently not available</p>
                            )}
                        </div>
                    </div>
                </div>
                <p className="provider-name" style={{ display: (providers === undefined && providers2 === undefined && providers3 === undefined) ? "block" : "none" }}>currently not available</p>
            </div>
        </div>

    )
}

export default Wheretowatch