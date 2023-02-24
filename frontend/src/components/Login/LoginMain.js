import React,{useState} from 'react'
import { useNavigate} from "react-router-dom";

const LoginMain = (props) => {
    const [crediantial, setCrediantial] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { showAlert,setLogin } = props;
  const handleclick = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: crediantial.email, password: crediantial.password })
    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
      localStorage.setItem('token2', json.authToken);
      showAlert("success", "login successfull")
    }
    else {
      showAlert("danger", "invalid credentials")
    }
  }

  const onChange = (e) => {
    setCrediantial({ ...crediantial, [e.target.name]: e.target.value });
  }
  return (
    <form  onSubmit={handleclick}>
            <div className="mb-3 ">
              <h2 className="text-center">Login</h2>
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
            <div>
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
                minLength="5"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <p className="mt-3">Don't have an Account?
              <p className="acc mx-1" onClick={()=>setLogin(false)}>Create Account</p>
            </p>
          </form>
  )
}

export default LoginMain