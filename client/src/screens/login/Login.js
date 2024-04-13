import React, { useState } from 'react'
import './login.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import loginImage from './../../assets/Login2.png';
import axios from 'axios'
import ErreurMessage from './../../components/message_erreur/ErreurMessage'


function Login({setShowLogin, showLogin}) {

    const [aria, setAria] = useState(false)

    const [email, setEmail] = useState('')
    const [mdp, setMdp] = useState('')

    const [erreur, setErreur] = useState('')

    const fermer = () => {
        setAria(true);

        setTimeout(() => {
            setShowLogin(false);
            setAria(false)
          }, 200);
    }


    const login = (e) => {
        e.preventDefault();
        //console.log(email + "    " + mdp)

        //verifier si les champs ne sont pas vides
        if(email === '' || mdp === ''){
            setErreur('Veuillez renseigner vos identifiants')
            return;
        }

        axios.post("http://localhost:4000/auth/login", {email, mdp}) 
        .then(res => {
          if(res.data.statut === "erreur"){
            setErreur(res.data.message)
            //console.log(res);
          } else {
            console.log(res.data.statut)
            setErreur('');
            //navigate('/'); naviguer vers le dashboard de l'assure
          }
        })
        .catch(err => {
          setErreur("Une erreur est survenu, réessayez plus tard")
          //console.log(err)
        })
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
                            <div className="header-text">
                                <h2 className='mb-0'>Se connecter</h2>
                                <p className=''>Nous sommes heureux de vous revoir.</p>
                            </div>

                            {erreur !== '' && <ErreurMessage message={erreur} />}

                            <form onSubmit={login}>
                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control" id="email" placeholder="hdeb@gmail.com" 
                                    onChange={(e) => setEmail(e.target.value)}/>
                                    <label htmlFor="email" className='label'>Adresse Email</label>
                                </div>
                                <div className="form-floating mb-1">
                                    <input type="password" className="form-control" id="mdp" placeholder="mot de passe" 
                                    onChange={(e) => setMdp(e.target.value)}/>
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
                                    <button type='submit' className="btn btn-lg btn-primary w-100 fs-6">Login</button>
                                </div>
                            </form>
                            
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
