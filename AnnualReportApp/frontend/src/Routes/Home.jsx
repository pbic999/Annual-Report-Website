import NavigationBar from "../Components/NavigationBar"
import SignIn from "./Signin"
import CompleteProfile from "./CompleteProfile"
import { useState } from "react"
import DescriptionIcon from '@material-ui/icons/Description';
import { Button } from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import GenerateDocx from "../Components/GenerateDocs";
import fetchData from "../Components/axios";



const Home = (props) => {
    const [err,setErr] = useState()
    const setUser = props.setUser
    const user = props.user
    const [start,setStart] =  useState()
    const [end,setEnd] =  useState()
    const genderType = ['Male','Female','Other']
    const deptArray = ['Chemical', 'Chemistry', 'Civil and Environmental', 'Electrical',
        'Computer Science', 'Humanities and Social Sciences', 'Mathematics and Statistics',
        'Mechanical', 'Physics']
    const [loading,setLoading] = useState(false)

    const [name,setName] = useState(user.name)
    const [dept,setDept] = useState(user.dept)
    const [email,setEmail] = useState(user.email)
    const [qualification,setQualification] = useState(user.qualification)
    const [gender,setGender] = useState(user.gender)
    const [contact,setContact] = useState(user.contact)
    const [designation,setDesignation] = useState(user.designation)

    const updateLoading  = (val) => {
        setLoading(val)
    }

    const generateDocx = () => {
        setErr()
        if(start && end) {
            setLoading(true)
            const dates = {start: new Date(start).getTime() ,end: new Date(end).getTime(), updateLoading:updateLoading}
            GenerateDocx(dates)
        }
        else setErr('Please first select the start and end dates.')
    }

    const updateUser = () => {
        setLoading(true)
            const body = {name,dept,email,qualification,gender,contact,designation}
            fetchData.post('/auth/google/update',{email: props.user.email,...body}).then((res) => {
                localStorage.setItem('user',JSON.stringify(body))
                setUser(body)
                setLoading(false)
            }).catch ((err) => {
                setLoading(false)
            })
    }


    return (
        <>
    <div className='main_div'>
        <NavigationBar setUser={setUser} />
        <div className="content">
            <div style = {{boxShadow: 'inset 0px 0px 5px 1px rgba(0,0,0,0.5)',backgroundColor: 'white'}}>
            <div style={{display: 'flex', flexDirection:'column',marginBottom: '10px',
             alignItems:'center', padding: '10px'}}>
        <p style={{marginBottom:'10px', fontSize: '20px', fontWeight: '500'}}> Generate Docx  </p>
        {err ? <p style={{color: 'crimson',marginBottom: '10px',textAlign:'center'}}> {err} </p> : <> </>}

        <div className='row' style={{alignItems: 'center', width: '100%'}} >
            <div style={{flex:0.38}}>
           <label className='form-label' style={{marginRight: '20px'}}> Start date</label> 
           <input type='date' style={{width: 'fit-content'}} className='form-input' value={start}
            onChange={e => setStart(e.target.value)} />
            </div>
            <div style={{flex: 0.38}}>
           <label className='form-label' style={{marginRight: '20px'}}> End date</label>
           <input type='date'  style={{width: 'fit-content'}}  className='form-input' value={end}
            onChange={e => setEnd(e.target.value)} />
            </div>
            <div style={{flex:0.24}}> 
                <Button variant="contained" color="primary" onClick={generateDocx}>
                        GENERATE DOCX FILE <DescriptionIcon /> 
                </Button>
            </div>
            </div>
            </div>
            <div style={{display: 'flex', flexDirection:'column',
            alignItems:'center', padding: '10px'}}> 
            <p style={{marginBottom:'10px', fontSize: '20px', fontWeight: '500'}}> Edit Infromation <span>&#9997;</span> </p>
            <div className="row" style={{width: '100%'}}>
                            <div className='left'>
                            <label className='form-label' htmlFor="text">
                                Name
                            </label>
                            <input className='form-input' type="text" value={name}
                             onChange={e => setName(e.target.value)} />
                            </div>
                            <div className='right'>
                            <label className='form-label' htmlFor="text">Email</label>
                            <input className='form-input' type="text"  value={email}
                             onChange={e => setEmail(e.target.value)}/>
                            </div>
                        </div>
                        <div className="row" style={{width: '100%'}}>
                            <div className='left'>
                            <label className='form-label' htmlFor="text">
                                Qualification
                            </label>
                            <input className='form-input' type="text"  value={qualification}
                             onChange={e => setQualification(e.target.value)}/>
                            </div>
                            <div className='right'>
                            <label className='form-label' htmlFor="text">Gender</label>
                            <select className="form-input" value={gender}
                             onChange={e=>setGender(e.target.value)}>
                                <option value={null}>------Select-------</option>
                                {genderType.map(x=> {
                                    return <option value={x}> {x} </option>
                                })}
                            </select>
                            </div>
                        </div>
                        <div className="row" style={{width: '100%'}}>
                            <div className='left'>
                            <label className='form-label' htmlFor="text">
                                Dept
                            </label>
                            <select className="form-input" value={dept}
                             onChange={e=>setDept(e.target.value)}>
                                <option value={null}>------Select-------</option>
                                {deptArray.map(x=> {
                                    return <option value={x}> {x} </option>
                                })}
                            </select>
                            </div>
                            <div className='right'>
                            <label className='form-label' htmlFor="text">Contact no.</label>
                            <input className='form-input form-control' type="text" value={contact}
                             onChange={e => setContact(e.target.value)} />
                            </div>
                        </div>
                        <div className="row" style={{width: '100%'}}>
                            <div className='left'>
                            <label className='form-label' htmlFor="text">
                                Designation
                            </label>
                            <input className='form-input' type="text" value={designation}
                             onChange={e => setDesignation(e.target.value)} />
                            </div>
                        </div>
                        <Button style={{marginTop: '15px'}} variant="contained" 
                        color='primary' onClick={updateUser}>
                            Save <SaveIcon />
                        </Button>
            </div>
        </div>
        </div>
    </div>
    {loading ? 
        <div style={{position:'absolute',display: 'flex',justifyContent:'center',alignItems:'center',
        top:0,height: '100%',width: '100%'}} >
        </div>    : null}
        </>
    )
}



export default Home