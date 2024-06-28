import { Button, Form } from 'react-bootstrap';
import Logo from '../asserts/images/logo.svg';
import { OrgAdminmailcheckget1,Orgadminsignup, Sessionloginpost, userprofileget } from "../apifunction";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import ButtonLoad from 'react-bootstrap-button-loader';

function SignInwithEnterpriseSSO() {
  const { isAuthenticated, loginWithPopup, logout, user } = useAuth0();
  const [email, setEmail] = useState('');
  const[loaderVerify, setLoaderVerify] = useState(false);
  //const [emailId, setemailId] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();

  const handleShowLoadVerify = () => setLoaderVerify(true);
  const handleHideLoadVerify = () => setLoaderVerify(false);

  const handleLogin = async () => {
    handleShowLoadVerify();
    
    try {
      // Ensure that loginWithPopup() sets isAuthenticated correctly.
      await loginWithPopup();
      console.log("user", user);
      if (isAuthenticated) {
        const [emailValid, data2] = await OrgAdminmailcheckget1(user.name);
        console.log("emailValid", emailValid);
  
        const signupuser1 = await Orgadminsignup(user.name, "", "Okta");
        console.log("checksignup1", signupuser1);
  
        if (emailValid === true) {
          localStorage.setItem("Login", true);
          localStorage.setItem("UserID", user.name);
  
          // Ensure userprofileget() and Sessionloginpost() return expected data.
          let [data, userprofiledetail] = await userprofileget(user.name);
          localStorage.setItem("UserName", userprofiledetail.firstName);
  
          let sessionlogin = await Sessionloginpost("", "", "Login", data2.tennantId, data2.roleType, user.name);
          
          // Code to execute after the login information is stored successfully
          handleHideLoadVerify();
          history(`/home`);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          toast.error("User not found in Sigma");
          handleHideLoadVerify();
        }
      } else {
        toast.error("SSO Authentication failed");
        handleHideLoadVerify();
      }
    } catch (error) {
      // Handle error
      console.error(error);
      toast.error("An error occurred during login");
      handleHideLoadVerify();
    }
  };

  return (
    <div className="vh-100 d-flex py-md-4 py-2 w-100">
      <ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/>
      <div className="container my-auto">
        <div className="user-card overflow-hidden">
          <div className="user-card-logo mb-4 text-center">
            <img className='img-fluid' src={Logo} alt="logo" />
          </div>
          <div className='mb-4'>
            <h2 className='mb-2'>Sign in with Enterprise SSO</h2>
          </div>
          {/* <Form.Group className="mb-5" controlId="form.ControlInput1">
            <Form.Control
              type="email"
              placeholder="example@me.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Group> */}
          {/* Removed the password input field */}
          <ButtonLoad className='btn-button w-100 mb-4' variant="dark" onClick={handleLogin} loading={loaderVerify}>
            PROCEED TO SSO LOGIN
          </ButtonLoad>
          <p>No organization alias? <Link to="/" className='btn-link'>Login here</Link></p>

         
        </div>
      </div>
    </div>
  );
}

export default SignInwithEnterpriseSSO;