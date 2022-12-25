import React from 'react';
import Lottie from "lottie-react";
import Loading from '../assets/lottie/lf30_editor_jft5hqov.json';

const LoadingIndicator = ({visible}: any) => {

  if(!visible) return null;
  return (
    <div className='overlay'>
      <Lottie animationData={Loading} loop autoPlay />
    </div>
  )
}

export default LoadingIndicator;