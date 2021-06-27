import GoogleLogin from 'react-google-login'
import '../../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import { useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group';
import { Animated } from 'react-animated-css'
import fetchData from '../Components/axios';
import { CircularProgress } from '@material-ui/core';

const CompleteProfile = (props) => {
    const [genderToggle, setGenderToggle] = useState(false)
    const [deptToggle, setDeptToggle] = useState(false)
    const genderArray = ['Male', 'Female', 'Other']
    const deptArray = ['Chemical', 'Chemistry', 'Civil and Environmental', 'Electrical',
        'Computer Science', 'Humanities and Social Sciences', 'Mathematics and Statistics',
        'Mechanical', 'Physics']
    

    const [loading,setLoading] = useState(false)
    const [qualification, setQualification] = useState()
    const [gender, setGender] = useState()
    const [contact, setContact] = useState()
    const [designation, setDesignation] = useState()
    const [dept, setDept] = useState()
    const [errText,setErrText] = useState()
    const user = props.user
    const setUser = props.setUser

    const checkStates = () => {
        if(!qualification  || !gender || !contact || !designation || !dept 
            || qualification.trim().length === 0 || contact.trim().length ===0 || designation.trim().length === 0 ) {
                setErrText('Please fill all the fields.')
                return false
            }
            else if(contact.length !== 10 || contact.charAt(0) < 6 ) {
                setErrText('Invalid contect no.')
                return false
            }
            return true
    }

    const sendLoginRequest = (e) => {
        e.preventDefault()
        setErrText()
        if(checkStates()) {
            setLoading(true) 
            fetchData.post('/auth/update',{email:user.email,qualification,
                gender,dept,designation,contact}).then((res) => {
                    setLoading(false)
                    setUser({qualification,dept,gender,contact,designation})
                })
        }
    }

    return (
        <>
        <div className='sign_in' onClick={e => {
            setDeptToggle(false)
            setGenderToggle(false)
        }}>
            <div className="form-div">
                <p className='login-heading'> Complete Your Profile </p>
                {errText ? <p style={{color: "#ff9999",marginBottom: '10px'}}> {errText} </p> : <> </>}
                <form action="" className="form">
                    <input type="text" className="login-input"
                        placeholder='Qualification' onChange={e => setQualification(e.target.value)} />

                    <div style={{ height: 0, zIndex: 2, height: '40px', marginBottom: '12px' }} >
                        <div id='dept' className='select' 
                        onClick={e =>
                            {   e.stopPropagation();
                                setDeptToggle(!deptToggle);
                                setGenderToggle(false)
                            }}>
                            <div className='login-input'
                                style={{
                                    display: 'flex', border: 'none', margin: 0,
                                    padding: 0, width: '296px', paddingRight: '4px'
                                }}>
                                <input style={{
                                    width: '290px', border: 'none',
                                    cursor: 'pointer', margin: 0
                                }} className='login-input'
                                    readOnly value={dept} placeholder='Select Department'/>
                                <i class="bi bi-chevron-down"
                                    style={{ display: 'flex', alignItems: 'center' }} />
                            </div>
                            <div className={deptToggle ? 'show-dept options' : 'hide-dept options'}> 
                            <div style={{overflowY: 'auto',height:'160px'}}>
                                {  
                                    deptArray.map(x => {
                                        return <input className='login-input hover' readOnly value={x} onClick={e => setDept(e.target.value)}
                                            style={{ paddingLeft: '5px', paddingRight: '25px', width: '270px', backgroundColor: x === dept ? '#444' : 'transparent', }} />
                                    })
                                    
                                }
                                </div>
                            </div> 
                        </div>
                    </div>

                    <div style={{ height: 0, zIndex: 1 , height: '40px', marginBottom: '12px' }} >
                        <div id='gender' className='select' 
                        onClick={e => 
                        {    e.stopPropagation()
                            setGenderToggle(!genderToggle)
                            setDeptToggle(false)
                        }
                        }>
                            <div className='login-input'
                                style={{
                                    display: 'flex', border: 'none', margin: 0,
                                    padding: 0, width: '296px', paddingRight: '4px'
                                }}>
                                <input style={{
                                    width: '290px', border: 'none',
                                    cursor: 'pointer', margin: 0
                                }} className='login-input'
                                    readOnly value={gender} placeholder='Select Gender' />
                                <i class="bi bi-chevron-down"
                                    style={{ display: 'flex', alignItems: 'center' }} />
                            </div>
                            <div className={genderToggle ? 'show-gender options' : 'hide-gender options'}>
                            <div style={{overflowY: 'auto',height:'120px'}}>
                                {
                                    genderArray.map(x => {
                                        return <input className='login-input hover' readOnly value={x} onClick={e => setGender(e.target.value)}
                                            style={{ paddingLeft: '5px', backgroundColor: x === gender ? '#444' : 'transparent',
                                            paddingRight: '25px', width: '270px' }} />
                                    })
                                }
                                </div>
                            </div>
                        </div>
                    </div>

                    <input type="text" className="login-input"
                        placeholder='Contact no.' onChange={e => setContact(e.target.value)} />
                    <input type="text" className="login-input"
                        placeholder='Designation' onChange={e => setDesignation(e.target.value)} />

                    <button style={{marginTop: '20px'}}
                     className='login-button'
                     onClick={sendLoginRequest}>Continue &#8594;</button>
                </form>
            </div>
        </div>
        {loading ? 
            <div style={{position:'absolute',display: 'flex',justifyContent:'center',alignItems:'center',
            top:0,height: '100%',width: '100%'}} >
            </div>    : null} 
            </>
    )
}

export default CompleteProfile