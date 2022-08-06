import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Signup = (props) => {
    const [crediantial, setCrediantial] = useState({name:"",email:"",password:""});
    const navigate = useNavigate()
    const {showAlert}=props;
    const handleclick = async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name:crediantial.name,email:crediantial.email,password:crediantial.password})
      });
      const json = await response.json()
      console.log(json);
      if(json.success){
        localStorage.setItem('token2', json.authToken);        
        showAlert("success","account created successfull")
        navigate('/')
      }else{
        showAlert("danger","Invalid Email")
      }
    }

    const onChange=(e)=>{
      setCrediantial({ ...crediantial, [e.target.name]: e.target.value });
    }

  return (
    <>
      <form className="container login_container" onSubmit={handleclick}>
      <div className="mb-3 ">
      <h1 className="text-center mb-4">SignUp</h1>
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            name="name"
            value={crediantial.name}
            onChange={onChange}
            minLength="3"
          />
        </div>
        <div className="mb-3 ">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            name="email"
            value={crediantial.email}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            value={crediantial.password}
            required
            minLength="5"
          />
        </div>
        <button type="submit"  className="btn btn-primary">
          Signup
        </button>
      </form>
    </>
  )
}

export default Signup
