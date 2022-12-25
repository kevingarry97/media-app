import React from 'react';
import ImgMobile from '../assets/images/chat_mobile.svg';
import Logo from '../assets/images/Logo.svg';

const AuthLayout = ({children}) => {
  return (
    <div className='bg_img'>
      <div className="container bg-light py-5 px-4">
        <div className="row d-flex align-items-strech">
          <div className="col-md-6 px-5">
            <img />
            <h4 className='my-5 text-muted'>#1 Intelligent Blog <br /> App for office, Mobile and <br /> Students.</h4>
            <img src={ImgMobile} className="img-fluid my-4" alt="" />
          </div>
          <div className="col-md-6 mx-3 bg-white px-0 rounded">
            {children}
            <div className="bottom-content py-2">
              <small className='text-muted'>By clicking the button above, you agree to our <a href='#'>terms of use</a> and <a href='#'>privacy ploicies</a></small>
            </div>
          </div>
          </div>
        </div>
    </div>
  )
}

export default AuthLayout;
