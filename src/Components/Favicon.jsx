import React from 'react'
import ReactDOM from 'react-dom'
import Favicon from 'react-favicon'
import FaviconBrain from './assets/logos/uBrain_favicon.jpg'

ReactDOM.render(
    <React.Fragment>
        <Favicon url={FaviconBrain} />
    </React.Fragment>,

    document.getElementById('hybrid_conection')
)