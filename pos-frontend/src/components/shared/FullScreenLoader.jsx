// to display a loader while we refresh page while checking authentication
import React from 'react'

const FullScreenLoader = () => {
    return (
        <div className='fullscreen-loader'>
            <div className='spinner'></div>
        </div>
    )
}

export default FullScreenLoader