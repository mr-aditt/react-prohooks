import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav>
            <div className='navbar'>
                <div className='logo'>
                    <Link to="/">ProHooks</Link>
                </div>
                <div className='nav-links'>
                    <ul className='links'>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/search">Search</Link></li>
                    </ul>
                </div>
            </div>

            {/* <div className='welcome'>
                 <p className='welcome-head'>Welcome to Books with Hooks</p>
                <p>You need to sign in to use the application</p>
                 <button>Sign in</button>
            </div> */}
        </nav>
    )
}
