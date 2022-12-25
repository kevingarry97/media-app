import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { toast } from 'react-toastify';
import AuthLayout from '../layout/authLayout';
import { createUser } from '../services/user';

const RegisterPage = () => {
    const [data, setData] = useState({firstname: '', lastname: '', email: '', password: '', role: ''});
    const [loading, setLoading] = useState(false);

    const handleChange = ({target}: any) => {
        // const reader = new FileReader();
        // if(target.name === "file") {
        //   setUpload(target.files[0])
        //   reader.onload = () => {
        //     if(reader.readyState === 2) { 
        //       setView(reader.result)
        //     }
        //   }
        //   reader.readAsDataURL(target.files[0]);
        // }
        setData({...data, [target.name]: target.value})
    }

    const handleSubmit = async (e: any) => {
        const {firstname, lastname, password, email, role} = data
        e.preventDefault();
        setLoading(true);
        
        const payload = {
            username: firstname + ' ' + lastname,
            email,
            password,
            role: data.role === '' && 'user'
        }
        const res = await createUser(payload);
    
        if(res.status === 200) {
          setLoading(false);
          toast("Verify your email to activate account", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
    
          setData({firstname: '', lastname: '', email: '', password: '', role: ''});
        } else {
          toast("Try again later", {
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
                    <small className='text-muted'><b>START FOR FREE</b></small>
                    <h3 className='mt-2'>Create New Account<b>.</b></h3>
                    <small className='text-muted'>Already a Member? <Link to="/">Sign In</Link></small>
                    <form className='my-5' onSubmit={handleSubmit}>
                        <div className="row mb-4">
                        <div className="form-group col-md-6">
                            <input type="text" placeholder='First name' className="form-control border-0 border-bottom" value={data.firstname} name="firstname" onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-6">
                            <input type="text" placeholder='Last name' className="form-control border-0 border-bottom" value={data.lastname} name="lastname" onChange={handleChange} />
                        </div>
                        </div>
                        <div className="form-group mb-5">
                        <input type="email" placeholder='Email' className="form-control border-0 border-bottom" value={data.email} name="email" onChange={handleChange} />
                        </div>
                        <div className="form-group mb-5">
                        <input type="password" placeholder='Password' className="form-control border-0 border-bottom" value={data.password} name="password" onChange={handleChange} />
                        </div>
                        <button className='btn btn-success btn-block rounded-pill py-2 mt-5'> <b>Let's Go</b></button>
                    </form>
                </div>
            </div>
                
        </AuthLayout>
    )
}

export default RegisterPage;