import '../../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import GoogleLogin from 'react-google-login'
import {useEffect, useState} from 'react'
import fetchData from "../Components/axios"
import { CircularProgress } from '@material-ui/core'


const SignIn = (props) => {
    const [signup,setSignUp] = useState(false)
    const [err,setErr] = useState(false)
    const [loading,setLoading] = useState(false)
    const [errText,setErrText] = useState('')
    const setUser = props.setUser
    
    const googleResponce = (response) => {
        console.log(response);
        console.log('fail');
    }

    const openGoogleLogin = () => {
        document.getElementsByClassName('google')[0].click()
    }

    const Login = () => {
        const [email,setEmail] = useState()
        const [password,setPassword] = useState()
        const [six,set] = useState()

        const success = (response) => {
                setErr(false)
                setLoading(true)
                fetchData.post('/auth/google/signin',{email: response.profileObj.email}).then((res) => {
                    console.log(res.data);
                    setUser(res.data)
                    setLoading(false)
                }).catch ((err) => {
                    setErr(true)
                    setErrText('Invalid email.')
                    setLoading(false)
                })
            console.log('pass');
        }

        const checkStates = () => {
            if(!email || email.trim().length === 0) {
                setErr(true)
                setErrText('Please enter email.')
                return false
            }
            else if(!password || password.trim().length === 0) {
                setErr(true)
                setErrText('Please enter password.')
                return false
            }
            return true
        }

        const sendLoginRequest = (e) => {
            e.preventDefault()
            setErr(false)
            if(checkStates()) {
                setLoading(true)
                fetchData.post('/auth/signin',{email,password}).then((res) => {
                    console.log(res.data);
                    setLoading(false)
                    setUser(res.data)
                }).catch((err) => {
                    setErr(true)
                    setLoading(false)
                    setErrText('Invalid email or password.')
                })
            }
        }

        return (
            <div className='sign_in' style={{opacity: loading ? 0.5 : 1}}>
                <div className="form-div">
                    <p className='login-heading'> Login </p>
                    {err ? <p style={{color: "#ff9999",marginBottom: '10px'}}> {errText} </p> : <> </>}
                    <form action="" className="form">
                        <input type="text" className="login-input"
                         placeholder='Email' onChange={e=>setEmail(e.target.value)}/>
                        <input type="password" className="login-input"
                         placeholder='Password' onChange={e=>setPassword(e.target.value)}/>
                        <button className='login-button' onClick = {sendLoginRequest}>
                             LOGIN
                            </button>
                    </form>
                    <div style={{display: 'flex',width: '100%',alignItems: 'center', marginBottom: '15px'}}>
                        <div style={{flex: 1,height: '0px',borderBottom : '1px solid #a2a2a2', marginRight: '5px'}} />
                    <div style={{color: '#a2a2a2',  cursor: 'default',marginBottom: '5px'}}> or </div>
                    <div style={{flex: 1,height: '0px',borderBottom : '1px solid #a2a2a2', marginLeft: '5px'}} />
                    </div>
                    <button className="google-ref" onClick = {openGoogleLogin}>
                        LOGIN WITH GOOGLE
                    </button>
                    <p className='forget' onClick = {e => {setSignUp(true);setErr(false)}}> Create new account </p>
                </div>
                <GoogleLogin className='google' style={{}}
        clientId='1097961012896-bdaqd3vgke0i0uq9lj9u9b5p7pio3283.apps.googleusercontent.com'
        buttonText='LOGIN WITH GOOGLE'
        onSuccess={success}
        onFailure={googleResponce}
        cookiePolicy='single_host_origin'
        />
            </div>
        )
    }

    const SignUp = () => {
        const [email,setEmail] = useState()
        const [password,setPassword] = useState()
        const [name,setName] = useState()

        const success = (response) => {
            const user = response.profileObj
            if(signup) {
                setLoading(true)
                fetchData.post('/auth/signup',{name: user.familyName,email: user.email}).then((res) => {
                    console.log(res.data);
                    setLoading(false)
                    setUser(res.data)
                }).catch ((err) => {
                    setErr(true)
                    setLoading(false)
                    setErrText('Email already in use.')
                })
            }
            console.log('pass');
        }

        const checkStates = () => {
            if(!name || name.trim().length === 0) {
                setErrText('Please enter name.')
                setErr(true)
                return false
            }
            else
            if(!email || email.trim().length === 0) {
                setErrText('Please enter email.')
                setErr(true)
                return false
            }
            else if(!password || password.trim().length === 0) {
                setErrText('Please enter email.')
                setErr(true)
                return false
            }
            return true
        }
        
        const sendSignupRequest = (e) => {
            e.preventDefault()
            setErr(false)
            if(checkStates()){
                setLoading(true)
                fetchData.post('/auth/signup',{name,email,password}).then((res) => {
                    console.log(res.data);
                    setLoading(false)
                    setUser(res.data)
                }).catch ((err) => {
                    setErr(true)
                    setErrText('Email already in use.')
                    setLoading(false)
                })
            }
        }

        return (
            <div className='sign_in' >
                <div className="form-div">
                    <p className='login-heading'> Sign Up </p>
                    {err ? <p style={{color: "#ff9999",marginBottom: '10px'}}> {errText} </p> : <> </>}
                    <form action="" className="form">
                        <input type="text" className="login-input" 
                        placeholder='Name' onChange={e=>setName(e.target.value)}/>
                        <input type="text" className="login-input" 
                        placeholder='Email' onChange={e=>setEmail(e.target.value)}/>
                        <input type="password" className="login-input" 
                        placeholder='Password' onChange={e=>setPassword(e.target.value)}/>
                        <button className='login-button' onClick = {sendSignupRequest}>
                            SIGN UP
                        </button>
                    </form>
                    <div style={{display: 'flex',width: '100%',alignItems: 'center', marginBottom: '15px'}}>
                        <div style={{flex: 1,height: '0px',borderBottom : '1px solid #a2a2a2', marginRight: '5px'}} />
                    <div style={{color: '#a2a2a2',  cursor: 'default',marginBottom: '5px'}}> or </div>
                    <div style={{flex: 1,height: '0px',borderBottom : '1px solid #a2a2a2', marginLeft: '5px'}} />
                    </div>
                    <button className="google-ref" onClick = {openGoogleLogin}>
                        SIGN UP WITH GOOGLE
                    </button>
                    <p className='forget' onClick={e=> {setSignUp(false);setErr(false)}} > Already have an account </p>
                </div>
                <GoogleLogin className='google' style={{}}
        clientId='1097961012896-bdaqd3vgke0i0uq9lj9u9b5p7pio3283.apps.googleusercontent.com'
        buttonText='LOGIN WITH GOOGLE'
        onSuccess={success}
        onFailure={googleResponce}
        cookiePolicy='single_host_origin'
        />
            </div>
        )
    }

    return (
        <>
        {signup ? <SignUp /> :  <Login />} 
        {loading ? 
            <div style={{position:'absolute',display: 'flex',justifyContent:'center',alignItems:'center',
            top:0,height: '100%',width: '100%'}} >
                <CircularProgress /> <span style={{fontWeight:'500'}}> &nbsp;Loading... </span>
            </div>    : null}
        </>
    )
}

export default SignIn