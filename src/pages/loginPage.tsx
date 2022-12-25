import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthLayout from '../layout/authLayout';
import auth from '../services/auth';


const LoginPage = (props: any) => {
    const [data, setData] = useState({email: '', password: ''});

    const handleChange = ({target}: any) => {
        setData({...data, [target.name]: target.value})
    }

    const handleSubmit = async (e: any) => {
        try {
          e.preventDefault();
          await auth.login(data.email, data.password)
          const { state } = props.location;
      
          window.location = state ? state.from.pathname : "/home";
          setData({email: '', password: ''})
    
        } catch(e) {
          toast("Invalid Email or Password", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        }
        
    }

    return (
        <AuthLayout>
            <div className="card border-0 mx-4">
                <div className="card-body mt-5">
                    <small className='text-muted'><b>YOU CAN CHOOSE FREE</b></small>
                    <h3 className='mt-2'>Welcome Back<b>.</b></h3>
                    <small className='text-muted'>Don’t have an account? <Link to='/register'>Sign Up</Link></small>
                    <form className='my-5' onSubmit={handleSubmit}>
                        <div className="form-group my-4">
                        <input type="text" placeholder='Email' className="form-control border-0 border-bottom" value={data.email} name="email" onChange={handleChange} />
                        </div>
                        <div className="form-group my-4">
                        <input type="password" placeholder='Password' className="form-control border-0 border-bottom" value={data.password} name="password" onChange={handleChange} />
                        <small id="passwordHelpBlock" className="form-text text-muted float-right mb-5">
                            Forgot Password
                        </small>
                        </div>
                        <button className='btn btn-success btn-block rounded-pill py-2 mt-5'> <b>Sign In </b></button>
                    </form>
                </div>
            </div>
        </AuthLayout>
    )
}

export default LoginPage;