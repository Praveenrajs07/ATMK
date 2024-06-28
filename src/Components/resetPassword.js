import React, {useState} from 'react';
import { Button, Form } from 'react-bootstrap';
import ButtonLoad from 'react-bootstrap-button-loader';
import Logo from '../asserts/images/logo.svg';
import ReCAPTCHA from 'react-google-recaptcha';
import { forgetPasswordMailVerification } from "../apifunction";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import { Link } from 'react-router-dom';

function ResetPassword() {
    const [email, setEmail] = useState();
    const [captcha, setCaptcha] = useState();
    const[loaderVerify, setLoaderVerify] = useState(false);
    const handleShowLoadVerify = () => setLoaderVerify(true);
    const handleHideLoadVerify = () => setLoaderVerify(false);

    const navigate = useNavigate()
    function onChange(value) {
        console.log("Captcha value:", value);
        setCaptcha(value);
    }
    const verifyMail = async() =>
    {
        try{
            handleShowLoadVerify();
        if(captcha)
        {
        let result = await forgetPasswordMailVerification(email,"resetPassword");
        // console.log("result", result);
        if(result === true)
            toast.success("Please check your E-mail");
        else
            toast.error("This E-mail does not have an account, Please create an account");
        }
        else{
            toast.error("Please verify with captcha");
        }
    }catch(e){
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
                        <h2 className='mb-2'>Reset your Password</h2>
                        <p>Enter your email address and we’ll send you a link to reset your password</p>
                    </div>
                    {/* mb-4 */}
                    <Form.Group className="mb-3" controlId="form.ControlInput1">
                        <Form.Label className='text-muted'>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter your Email-id" onChange={event => setEmail(event.target.value)}/>
                    </Form.Group>
                    {/* mb-3 */}
                    <div className='d-flex mb-4 justify-content-center'>
                        <ReCAPTCHA
                            sitekey="6LdQ6q0mAAAAACT7MyMX6Cl_wZn1AVL4goqxF-oO"
                            onChange={onChange}
                        />
                    </div>
                    {/* mb-4 */}
                    <ButtonLoad className='btn-button w-100' variant="dark" loading={loaderVerify} onClick={() => verifyMail()}>Continue</ButtonLoad>
                    <br/><center><Link to="/">Go to sign-in</Link></center>
                </div>
            </div>
        </div>
     );
}

export default ResetPassword;