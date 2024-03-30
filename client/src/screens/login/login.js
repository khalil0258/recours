import React, { useState } from 'react'
import './login.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import loginImage from './../../assets/Login2.png';


function Login({setShowLogin, showLogin}) {

    const [aria, setAria] = useState(false)

    const fermer = () => {
        setAria(true);

        setTimeout(() => {
            setShowLogin(false);
            setAria(false)
          }, 200);
    }

  return (

        <div className="d-flex justify-content-center align-items-center fenetre-login" onClick={fermer} 
        aria-hidden={aria ? "true" : "false"}>

            {/* <!----------------------- Login Container --------------------------> */}
            <div className="row border rounded-3 p-3 bg-white shadow box-area" onClick={(e) => e.stopPropagation()}>

                <div className="boite-header">
                    <span className="fermer">
                        <i className="bi bi-x-circle" onClick={fermer}></i>
                    </span>
                </div>

                {/* <!--------------------------- Left Box -----------------------------> */}
                <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box" /* style={{background: "red"}} */>
                    <div className="featured-image">
                        <img src={loginImage} className="img-fluid" style={{height: "450px"}} alt="img"/>
                    </div>
                    
                </div> 

                {/* <!-------------------- ------ Right Box ----------------------------> */}
                <div className="col-md-6 right-box">
                    <div className="row align-items-center">
                            <div className="header-text mb-2">
                                <h2 className='mb-0'>Se connecter</h2>
                                <p className=''>Nous sommes heureux de vous revoir.</p>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="email" className="form-control" id="email" placeholder="name@example.com"/>
                                <label htmlFor="email" className='label'>Adresse Email</label>
                            </div>
                            <div className="form-floating mb-1">
                                <input type="password" className="form-control" id="mdp" placeholder="Mot de Passe" />
                                <label htmlFor="mdp" className='label'>Mot de Passe</label>
                            </div>
                            
                            <div className="input-group mb-4 d-flex justify-content-between">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="formCheck"/>
                                    <label htmlFor="formCheck" className="form-check-label text-secondary"><small>Se souvenir de moi</small></label>
                                </div>
                                <div className="forgot">
                                    <small><a href='h'>Mot de passe oublié ?</a></small>
                                </div>
                            </div>
                            <div className="input-group mb-2 mt-2">
                                <button className="btn btn-lg btn-primary w-100 fs-6">Login</button>
                            </div>
                            
                            <div className="row">
                                <small>Si vous n'avez pas de compte <a href="h">contactez</a> la CASNOS</small>
                            </div>
                    </div>
                </div> 
            </div>
        </div>
    
  )
}

export default Login
