import React from 'react'

const ReviewItem = (props) => {
    const {note} = props;

  return (
    <div className="card m-2">
    <div className="card-body ">
    <div className="reviewCon">
      <h5 className="card-title"><i className="fas fa-user"></i> {note.name}</h5>
      <p className="card-text">{note.review}</p>
      </div>
    </div>
  </div>
  )
}

export default ReviewItem
