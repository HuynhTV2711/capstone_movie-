import React from 'react'
import Lottie from 'react-lottie';
import * as loading from './../../assets/animation/loading.json'


const Loading = () => {
      // animation
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  return (
    <div className='absolute top-0 left-0 right-0 bottom-0' style={{zIndex:"999"}}>
         <Lottie options={defaultOptions}
                height={400}
                width={400}
              />
    </div>
  )
}

export default Loading