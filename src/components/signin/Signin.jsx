import React from 'react'
import { useState } from 'react'
import HeadingComp from '../signup/HeadingComp'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useDispatch } from 'react-redux'
import { authActions } from '../../store'
import { toast } from 'react-toastify'





const Signin = () => {
  const dispatch = useDispatch()
  const history = useNavigate()
  const [Inputs, setInputs] = useState({
    email: "",
    password: ""
  })
  const change = (e) => {
    const { name, value } = e.target
    setInputs({ ...Inputs, [name]: value })

  }
  const submit = async (e) => {

    e.preventDefault()
    // console.log("Inputs", Inputs);

    await axios.post("http://localhost:8000/api/v1/login", Inputs).then((response) => {
      console.log("RESPONSE : ", response);  // response me backend side wala data ho ga
      
      if (response.data.message === "Please signUp first") {
        return alert("Please signUp first")
      }
      else {
        console.log("iddddddddddddddddddddd",response.data.others._id);
        sessionStorage.setItem("id", response.data.others._id)
        dispatch(authActions.login())
        history("/todo")
      }




    });

  }
  return (
    <div>  <div className='signup'><div className="container">
      <div className="row">
        <div className="col-lg-8 column d-flex justify-content-center align-items-center">
          <div className='d-flex flex-column w-100 p-3'>
            <input
              className='p-2 my-3 input-signup '
              name='email'
              type='email'
              placeholder='Enter Your Email'
              onChange={change}
              value={Inputs.email} />

            <input
              className='p-2 my-3 input-signup'
              name='password'
              type='password'
              placeholder='Enter Your Password'

              onChange={change}
              value={Inputs.password} />
            <button className='btn-signUp p-2' onClick={submit}>Sign In</button>
          </div>
        </div>
        <div className="col-lg-4 column col-left d-none d-lg-flex justify-content-center align-items-center">
          <HeadingComp first="Sign" second="In" />

        </div>
      </div>
    </div>
    </div></div>
  )
}

export default Signin