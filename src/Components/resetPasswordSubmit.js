import React, {useState} from 'react';
import { Button, Form } from 'react-bootstrap';
import ButtonLoad from 'react-bootstrap-button-loader';
import Logo from '../asserts/images/logo.svg';
import { resetPasswordSubmit } from "../apifunction";
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function ResetPasswordSubmit() {
    const [email, setEmail] = useState();
    const [newPassword, setNewPassword] = useState();
    const [reNewPassword, setReNewPassword] = useState();
    const [otp, setOtp] = useState();
    const [showpassword, setShowpassword] = useState(false);
    const [showCpassword, setShowCpassword] = useState(false);
    const [err, setErr] = useState(false);
    const[loaderVerify, setLoaderVerify] = useState(false);
    const handleShowLoadVerify = () => setLoaderVerify(true);
    const handleHideLoadVerify = () => setLoaderVerify(false);

    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowpassword(!showpassword); // Toggle the password visibility
      };

      const toggleCPasswordVisibility = () => {
        setShowCpassword(!showCpassword); // Toggle the password visibility
      };

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
     }

    const submitMail = async() =>
    {
        try{
            handleShowLoadVerify();
            if(email === null || email === "" || email === undefined){
                toast.warn(`Please Enter EmailId`); 
                    }
            else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
                toast.warn(`Please Enter Valid EmailId`); 
              
                    
                }
            else if(otp === null || otp === "" || otp === undefined){
                toast.warn(`Please Enter OTP`); 
                    }
            else if(newPassword === null || newPassword === "" || newPassword === undefined){
                toast.warn(`Please Enter password`); 
                    } 
            else if(reNewPassword === null || reNewPassword === "" || reNewPassword === undefined){
                toast.warn(`Please Enter Confirm password`); 
                    }        
            else if(newPassword !== reNewPassword){
                toast.error("Please input same password to confirm");
            }
        else if(newPassword === reNewPassword)
        {
            setErr(false);
            let result = await resetPasswordSubmit(email, newPassword, otp, "restPasswordSubmit");
            if(result === true)
            {
                toast.success("Password updated. Redirecting to sign-in");
                await sleep(5000);
                navigate("/")
            }
            else
                toast.error("Please check Email or OTP");
        }
        else
        {
            setErr(true);
        }
    }
    catch(e){
        console.log(e);
    }finally{
        handleHideLoadVerify();
    }
    }
    return ( 
        <div className="vh-100 d-flex py-md-4 py-2 w-100">
            <ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/>
            <div className="container my-auto">
                <div className="user-card overflow-hidden">
                    <div className="user-card-logo text-center"><img className='img-fluid' src={Logo} alt="logo" /></div>
                    <div className='mb-4'>
                        <h2 className='mb-2'>Reset password verification</h2>
                        {/* <p>Reset password verification</p> */}
                    </div>
                    {/* mb-4 */}
                    <Form.Group className="mb-3" controlId="form.ControlInput1">
                        <Form.Label className='text-muted'>Email</Form.Label>
                        <Form.Control required type="email" placeholder="Enter your Email-id" onChange={event => setEmail(event.target.value)}/>
                        <br/>
                        <Form.Label className='text-muted'>OTP</Form.Label>
                        <Form.Control required type="number" placeholder="Enter your OTP" onChange={event => setOtp(event.target.value)}/>
                        <br/>
                        <Form.Label required className='text-muted'>New password</Form.Label>
                        <div className="input-group">
                        <Form.Control type={showpassword ? "text" : "password"} placeholder="Enter your new password" onChange={event => setNewPassword(event.target.value)}/>
                        <Button variant="secondary" onClick={togglePasswordVisibility}>
                            {showpassword ? (
                              <FontAwesomeIcon icon={faEyeSlash} />
                            ) : (
                              <FontAwesomeIcon icon={faEye}/>
                            )}
                          </Button>
                          </div>
                        <br/>
                        <Form.Label required className='text-muted'>Confirm password</Form.Label>
                        <div className="input-group">
                        <Form.Control type={showCpassword ? "text" : "password"} placeholder="Re-enter your new password" onChange={event => setReNewPassword(event.target.value)}/>
                        <Button variant="secondary" onClick={toggleCPasswordVisibility}>
                            {showCpassword ? (
                              <FontAwesomeIcon icon={faEyeSlash} />
                            ) : (
                              <FontAwesomeIcon icon={faEye}/>
                            )}
                          </Button>
                          </div>
                    </Form.Group>
                    {err ? <p style={{color: "red"}}>Passwords does not match</p> : <></>}
                    {/* mb-3 */}
                    <ButtonLoad className='btn-button w-100' variant="dark" loading={loaderVerify} onClick={() => submitMail()}>Submit</ButtonLoad>
                </div>
            </div>
        </div>
     );
}

export default ResetPasswordSubmit;