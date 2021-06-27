import { Button, CircularProgress } from "@material-ui/core"
import { useEffect, useState } from "react"
import fetchData from "../Components/axios"
import NavigationBar from "../Components/NavigationBar"

const VisitToDepartment = (props) => {
    const setUser = props.setUser
    const editMode = 'edit'
    const deleteMode = 'delete'
    const [designation,setDesignation] = useState()
    const [name,setName] = useState()
    const [institute,setInstitute] = useState()
    const [date,setDate] = useState()
    const [purpose,setPurpose] = useState()
    const [topic,setTopic] = useState()
    const [dataList,setDataList] = useState([])
    const [loading,setLoading] = useState(true)
    const email = props.user.email
    const [err,setErr] = useState()


    useEffect(()=>{
        fetchData.post('user/get/data/visitor_to_department',{email}).then((res) => {
            setLoading(false)
            setDataList(res.data)
        })
    },[])

    const clearStates = () => {
        setPurpose("")
        setName("")
        setInstitute("")
        setDate("")
        setTopic("")
        setDesignation("")
    }

    const checkStates = () => {
        const states = [
            topic,purpose,institute,date
            ,email,name,designation
        ]
        for(let i=0; i < states.length; i++) {
            if(!states[i] || states[i].trim().length === 0) return false
        }
        return true
    }

    const deptArray = ['Chemical', 'Chemistry', 'Civil and Environmental', 'Electrical',
        'Computer Science', 'Humanities and Social Sciences', 'Mathematics and Statistics',
        'Mechanical', 'Physics']
        let sorting_no
    deptArray.map((x,index)=> {if(x === props.user.dept) sorting_no = index})

    const uploadData = (e) => {
        e.preventDefault()
        setErr()
        if(checkStates()) {
        const body = {topic,purpose,timestamp: new Date(date).getTime(),institute,date,sorting_no
            ,email,name,designation}
        setLoading(true)
        fetchData.post('user/upload/data/visitor_to_department',body).then((res)=>{
            setDataList(oldData => [...oldData,body])
            setLoading(false)
            clearStates()
        }).catch((err)=> {
            setLoading(false)
        })}
        else {
            setErr('Please fill all mandatory fields.')
        }
    }


    const Form = () => {
        return (
            <form action="" className="entry-form">
                    {err ? <p style={{color: 'crimson',marginBottom: '10px',textAlign:'center'}}> {err} </p> : <> </>}

                        <div className="row">
                            <div className='left'>
                            <label className='form-label' htmlFor="text">
                                Faculty Name<span style={{ color: 'red' }}>*</span>
                            </label>
                            <input className='form-input' type="text" value={name}
                            onChange={e => setName(e.target.value)} />
                            </div>
                            <div className='right'>
                            <label className='form-label' htmlFor="text">Designation<span style={{ color: 'red' }}>*</span></label>
                            <input className='form-input' type="text" value={designation}
                            onChange={e => setDesignation(e.target.value)}/>
                            </div>
                        </div>
                        <div className="row">
                        <div className='left'>
                            <label className='form-label'>Date of Visit<span style={{ color: 'red' }}>*</span></label>
                            <input className='form-input date' type="date" value={date}
                            onChange={e => setDate(e.target.value)}/>
                        </div>
                        <div className='right'>
                            <label className='form-label'>Institute Name<span style={{ color: 'red' }}>*</span></label>
                            <input className='form-input date' type="text" value={institute}
                            onChange={e => setInstitute(e.target.value)}/>                        </div>
                        </div>
                        <div className="row">
                        <div className='left'>
                            <label className='form-label' htmlFor="text">Purpose of visit<span style={{ color: 'red' }}>*</span></label>
                            <input className='form-input' type="text" value={purpose}
                            onChange={e => setPurpose(e.target.value)}/>
                        </div>
                        <div className='right'>
                            <label className='form-label'>Webinar Topic<span style={{ color: 'red' }}>*</span></label>
                            <input className='form-input date' type="text" value={topic}
                            onChange={e => setTopic(e.target.value)}/>                       
                        </div>
                        </div>
                        <div className="button-div">
                            <Button variant="contained" color='primary' className='submit-button' onClick={uploadData}>Add</Button>
                        </div>
                </form>
        )
    }

    const Records = ({id,x}) => {
        console.log(dataList);
        const [mode,setMode] = useState()
        const color = { color: mode ? '#000' : '#777' }
        const [date,setDate] = useState(x.date)

        const editContent = () => {
            if(!mode) {
                setMode(editMode)
                document.getElementsByClassName('date-picker'+id)[0].classList.add('date')
                document.getElementById(`row`+id).classList.add('yellow')
            }
        }

        const deleteContent = () => {
            if(!mode) {
                setMode(deleteMode)
                document.getElementById(`row`+id).classList.add('red')
            }
        }

        const deleteOrUpdateContent = () => {
            document.getElementsByClassName('date-picker'+id)[0].classList.remove('date')
            setMode()
            if(mode === editMode) {
                document.getElementById(`row`+id).classList.remove('yellow')
                const fields = ['name', 'designation','institute','purpose','topic']
                const div_grps = document.getElementsByClassName(`input-div${id}`)
                let req_body = ''
                for (let i = 0; i < div_grps.length; i++) {
                    if (i === div_grps.length - 1)
                        req_body = `${req_body} "${fields[i]}":"${div_grps[i].innerHTML}"`
                    else req_body = `${req_body} "${fields[i]}":"${div_grps[i].innerHTML}",`
                }
                req_body = JSON.parse(`{${req_body}}`)
                setLoading(true)
                fetchData.post('user/update/data/visitor_to_department', {...req_body,date,_id: x._id }).then((res) => {
                    setDataList((oldList) => oldList.map((x,index) => {
                        if(index === id) return  {...req_body,date,_id: x._id }
                    else return x}) )
                         setMode()
                         setLoading(false)
                         console.log(dataList);
                }).catch((err) => { 
                    setLoading(false)
                })
            }
            else if(mode === deleteMode) {
                setLoading(true)
                document.getElementById(`row`+id).classList.remove('red')
                fetchData.delete(`user/delete/visitor_to_department/${x._id}`).then((res) => {
                    setDataList((oldList) => oldList.filter(ele => ele._id !== x._id) )
                         setMode()
                         setLoading(false)
                }).catch((err) => { 
                    setLoading(false)
                })
                console.log('check');
            }
        }

        const cancel = () => {
            const data = [x.name, x.designation,x.institute,x.purpose,x.topic]
            const div_grps = document.getElementsByClassName(`input-div${id}`)
            setDate(x.date)
            for (let i = 0; i < div_grps.length; i++) {
                div_grps[i].innerHTML = data[i]
            }
            setMode()
            document.getElementsByClassName('date-picker'+id)[0].classList.remove('date')
            document.getElementById(`row`+id).classList.remove('red')
            document.getElementById(`row`+id).classList.remove('yellow')
        }

        return (
            <div style={color} className="entries-row" id={`row`+id}>
            <div className="sno">{id+1}</div>
            <div contentEditable={mode === editMode} className={`flex1 input-div${id}`}>{x.name}</div>
            <div contentEditable={mode === editMode} className={`flex1 input-div${id}`}>{x.designation}</div>
            <input style={color} type='date' className={`flex1 unstyled date-picker${id}`}
            value={date} onChange={e => setDate(e.target.value)} />
            <div contentEditable={mode === editMode} className={`flex1 input-div${id}`}>{x.institute}</div>
            <div contentEditable={mode === editMode} className={`flex1 input-div${id}`}>{x.purpose}</div>
            <div className="flex1">
                <div contentEditable={mode === editMode} className={`last-col input-div${id}`}>{x.topic}</div>
                { mode ? <>
                <i className='bi bi-check-circle-fill check-icon' onClick={deleteOrUpdateContent}/>
                <i className='bi bi-x-circle-fill delete-icon' onClick={cancel}/>
                </> : 
                <>
                <i className="bi bi-pencil-square edit-icon edit-icon" onClick={editContent}/>
                <i className='bi bi-trash-fill delete-icon' onClick={deleteContent}/>
                </>
    }
                </div>
        </div>
        )
    }

    const Entries = () => {
        return (
            <div className="entries-div">
                <div className="entries-row header">
                    <div className="sno">#</div>
                    <div className="flex1">Faculty Name</div>
                    <div className="flex1">Designation</div>
                    <div className="flex1">Date of Visit</div>
                    <div className="flex1">Institute Name</div>
                    <div className="flex1">Purpose of visit</div>
                    <div className="flex1">Webinar Topic</div>
                </div>
                {   dataList.length === 0 && !loading ? 
                <div className='flex1' 
                style={{backgroundColor: '#fff',borderTop:'#000 solid 1px',
                        paddingLeft: '10px'}}>
                     Entries not found
                </div>
                :
                    dataList.map((x, index) => {
                        return <Records key={index} x={x} id={index} />
                    })
                }
            </div>
        )
    }

    return (
        <>
        <div className='main_div'>
            <NavigationBar setUser={setUser}/>
            <div className="content">
                {Form()}
                {Entries()}
            </div>
        </div>
        {loading ? 
            <div style={{position:'absolute',display: 'flex',justifyContent:'center',alignItems:'center',
            top:0,height: '100%',width: '100%'}} >
            </div>    : null}

            </>
    )
}

export default VisitToDepartment