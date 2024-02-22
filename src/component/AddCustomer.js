import React, { useState } from 'react'
import { addUser, machineStart } from '../Service'
import { toast } from 'react-toastify'

export default function AddCustomer() {
  const [errorMsg, setErrorMsg] = useState()
  const [success, setSuccess] = useState(false)

  const formSubmitHandle = () => {
    let name = document.getElementById("name").value
    let mobile = document.getElementById("mobile").value
    let email = document.getElementById("email").value
    if (name === "" || mobile === "" || email === "") {
      setErrorMsg("Fill All blank space")
      return false
    }
    if (mobile.length !== 10) {
      setErrorMsg("Enter Valid Mobile")
      return false
    }
    addUser({
      "name": name,
      "email": email,
      "phone": mobile
    }).then((res) => {
      console.log(res);
      setSuccess(true)
      toast.success("Success you can test your power!")
    }).catch((error) => {
      toast.error(error.response.data.message)
      console.log(error.response.data.message);
    })
  }

  const mobileChangeHandle = (e) => {
    if (e.target.value.length > 10 || e.target.value.length < 10) {
      setErrorMsg("Enter Valid Mobile")
    } else {
      setErrorMsg()
    }
  }
  if (success) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: "white",
            padding: "50px",
            borderRadius: "4px",
            boxShadow: "0 2px 3px #C8D0D8",
          }}
        >
          <div style={{ display: 'flex', borderRadius: "200px", height: "200px", width: "200px", background: "#F8FAF5", alignItems: "center", justifyContent: 'center' }}>
            <i class="checkmark" style={{ color: "#9ABC66", fontSize: "100px", lineHeight: "200px" }}>✓</i>
          </div>
          <h1 style={{
            color: "#88B04B",
            fontFamily: '"Nunito Sans", "Helvetica Neue", sans-serif',
            fontWeight: 900,
            fontSize: "40px",
            marginBottom: "10px"
          }}>
            Success
          </h1>
          <p style={{textAlign:'center'}}>You can test your power<br /> Take Pull up Maximum!</p>
        </div>
      </div>)
  } else {
    return (
      <div className='container-fluid d-flex align-items-center justify-content-center'>
        <div className="card card-outline-secondary w-100">
          <div className="card-header">
            <h3 className="mb-0">Healthy Touch</h3>
          </div>
          {errorMsg &&
            <div class="alert alert-danger" role="alert">
              {errorMsg}
            </div>
          }
          <div className="card-body">
            <div className="form-group">
              <label for="name">Full Name</label>
              <input className="form-control" id="name" name="name" type="text" required />
            </div>
            <div className="form-group">
              <label for="mobile">Mobile</label>
              <input className="form-control" id="mobile" pattern="[1-9]{1}[0-9]{9}" onChange={mobileChangeHandle} name="mobile" type="number" required />
            </div>
            <div className="form-group">
              <label for="email">Email</label>
              <input className="form-control" id="email" name="email" type="email" required />
            </div>
            <button className="btn btn-success btn-lg float-right" onClick={formSubmitHandle}>submit</button>
          </div>
        </div>
      </div>
    )
  }

}
