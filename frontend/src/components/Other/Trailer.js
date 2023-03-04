import React from 'react'

const Trailer = ({trailer}) => {
    return (
        <>
            <div className="trailer">
                <iframe
                    width={"100%"}
                    height={"100%"}
                    src={"https://www.youtube.com/embed/" + trailer.key}
                    name={trailer.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
            <h3>{trailer.name ? trailer.name : "No Trailer Found"}
             </h3>
            </>
    )
}

export default Trailer