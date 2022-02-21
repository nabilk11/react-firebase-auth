import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
        <div className="w100 text-center mt-2 mb-5">
        <h1>THIS IS THE HOME PAGE WOOT!</h1>
        </div>
        <div className="w100 text-center mt-2">
        <button className='btn btn-danger'> <Link style={{color: "white", fontWeight: "bold"}} to={"/login"}>Already have an account? Log In!</Link></button>
        </div>
        <div className="w100 text-center mt-2">
        <button className='btn btn-success'><Link style={{color: "white", fontWeight: "bold"}} to={"/signup"}>Don't have an account? Sign Up!</Link></button>
        </div>



    </div>
  )
}
