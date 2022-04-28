import React from 'react'
import "../css/404.css"
import image404 from "../images/404.png"
import { Link } from 'react-router-dom'

export default function Page404() {
  return (
    <div className='page_404'>
        <div className="error_message">
            <div className="error_img">
                <img src={image404} alt="404" />
            </div>
            <h2>Oops... It looks like you're lost !</h2>
            <p>The page you were looking for doesn't exist.</p>
            <Link to={"/"} className="btn-3">Go back</Link>
        </div>
    </div>
  )
}
