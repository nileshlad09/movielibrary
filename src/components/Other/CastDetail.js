import React from "react";
import img from '../../Img/person.jpg'
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const CastDetail = (props) => {
  const { data } = props;
  return (
    <div className="castImg">
      <div className="cast-img">
        <img src={data.profile_path?IMG_URL + data.profile_path:img} className="card-img-top" />
        <div className="card-body">
          <h6 className="card-title">{data.name}</h6>
        </div>
      </div>
    </div>
  );
};

export default CastDetail;
