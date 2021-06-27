import { useEffect, useState } from "react"
import fetchData from "../Components/axios"
import NavigationBar from "../Components/NavigationBar"
import { Button, CircularProgress } from "@material-ui/core"

const Publications = (props) => {
    const setUser = props.setUser

    const editMode = 'edit'
    const deleteMode = 'delete'
    const [title,setTitle] = useState()
    const [author_position,setAuthorPosition] = useState()
    const [other_authors,setOtherAuthors] = useState()
    const [date,setDate] = useState()
    const [journal_name,setJournalName] = useState()
    const [volume,setVolume] = useState()
    const [issue,setIssue] = useState()
    const [pp,setPP] = useState()
    const [dataList,setDataList] = useState([])
    const [loading,setLoading] = useState(true)
    const email = props.user.email
    const name = props.user.name
    const [err,setErr] = useState()


    useEffect(()=>{
        fetchData.post('user/get/data/publications',{email}).then((res) => {
            setLoading(false)
            setDataList(res.data)
        })
    },[])

    const clearStates = () => {
        setTitle("")
        setJournalName("")
        setDate("")
        setAuthorPosition("")
        setOtherAuthors("")
        setVolume("")
        setIssue("")
        setPP("")
    }

    const checkStates = () => {
        const states = [
            author_position,other_authors,date,title
            ,email,name,journal_name,volume,issue,pp
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
        const body = {author_position,other_authors,timestamp: new Date(date).getTime(),date,title,sorting_no
            ,email,name,journal_name,volume,issue,pp}
        setLoading(true)
        fetchData.post('user/upload/data/publications',body).then((res)=>{
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

    const Records = ({id,x}) => {
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
                document.getElementById(`row` + id).classList.remove('yellow')
                const fields = ['title', 'journal_name','author_position','other_authors',
                                'volume','issue','pp']
                const div_grps = document.getElementsByClassName(`input-div${id}`)
                let req_body = ''
                for (let i = 0; i < div_grps.length; i++) {
                    if (i === div_grps.length - 1)
                        req_body = `${req_body} "${fields[i]}":"${div_grps[i].innerHTML}"`
                    else req_body = `${req_body} "${fields[i]}":"${div_grps[i].innerHTML}",`
                }
                req_body = JSON.parse(`{${req_body}}`)
                setLoading(true)
                fetchData.post('user/update/data/publications', {...req_body,date,_id: x._id }).then((res) => {
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
                fetchData.delete(`user/delete/publications/${x._id}`).then((res) => {
                    setDataList((oldList) => oldList.filter(ele => ele._id !== x._id) )
                         setMode()
                         setLoading(false)
                }).catch((err) => { 
                    setLoading(false)
                })
            }
        }

        const cancel = () => {
            const data = [x.title, x.journal_name,x.author_position,x.other_authors,
                x.volume,x.issue,x.pp]
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
            <div contentEditable={mode === editMode} className={`flex1 input-div${id}`}>{x.title}</div>
            <div contentEditable={mode === editMode} className={`flex1 input-div${id}`}>{x.journal_name}</div>
            <input style={color} type='date' className={`flex1 unstyled date-picker${id}`}
            value={date} onChange={e => setDate(e.target.value)}/>
            <div contentEditable={mode === editMode} className={`flex1 input-div${id}`}>{x.author_position}</div>
            <div contentEditable={mode === editMode} className={`flex1 input-div${id}`}>{x.other_authors}</div>
            <div contentEditable={mode === editMode} className={`small input-div${id}`}>{x.volume}</div>
            <div contentEditable={mode === editMode} className={`small input-div${id}`}>{x.issue}</div>
            <div className="flex1">
                <div contentEditable={mode === editMode} className={`last-col input-div${id}`}>{x.pp}</div>
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
                    <div className="flex1">Paper Title</div>
                    <div className="flex1">Journal Name</div>
                    <div className="flex1">Date</div>
                    <div className="flex1">Author Position</div>
                    <div className="flex1">Other Authors</div>
                    <div className="small">Volume</div>
                    <div className="small">Issue</div>
                    <div className="flex1">PP</div>
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
            <form action="" className="entry-form">
                    {err ? <p style={{color: 'crimson',marginBottom: '10px',textAlign:'center'}}> {err} </p> : <> </>}

                        <div className="row">
                            <div className='left'>
                            <label className='form-label' htmlFor="text">
                                Paper Title<span style={{ color: 'red' }}>*</span>
                            </label>
                            <input className='form-input' type="text" value={title}
                            onChange={e => setTitle(e.target.value)} />
                            </div>
                            <div className='right'>
                            <label className='form-label' htmlFor="text">Journal Name<span style={{ color: 'red' }}>*</span></label>
                            <input className='form-input' type="text" value={journal_name}
                            onChange={e => setJournalName(e.target.value)}/>
                            </div>
                        </div>
                        <div className="row">
                        <div className='left'>
                            <label className='form-label'>Date<span style={{ color: 'red' }}>*</span></label>
                            <input className='form-input date' type="date" value={date}
                            onChange={e => setDate(e.target.value)}/>
                        </div>
                        <div className='right'>
                            <label className='form-label'>Author Position<span style={{ color: 'red' }}>*</span></label>
                            <input className='form-input date' type="text" value={author_position}
                            onChange={e => setAuthorPosition(e.target.value)}/>                        </div>
                        </div>
                        <div className="row">
                        <div className='left'>
                            <label className='form-label'>Other Authors<span style={{ color: 'red' }}>*</span></label>
                            <input className='form-input date' type="text" value={other_authors}
                            onChange={e => setOtherAuthors(e.target.value)}/>
                        </div>
                        <div className='right'>
                            <label className='form-label'>Volume<span style={{ color: 'red' }}>*</span></label>
                            <input className='form-input date' type="text" value={volume}
                            onChange={e => setVolume(e.target.value)}/>                       
                            </div>
                        </div>
                        <div className="row">
                        <div className='left'>
                            <label className='form-label'>Issue<span style={{ color: 'red' }}>*</span></label>
                            <input className='form-input date' type="text" value={issue}
                            onChange={e => setIssue(e.target.value)}/>
                        </div>
                        <div className='right'>
                            <label className='form-label'>PP<span style={{ color: 'red' }}>*</span></label>
                            <input className='form-input date' type="text" value={pp}
                            onChange={e => setPP(e.target.value)}/>                        </div>
                        </div>
                        <div className="button-div">
                            <Button variant="contained" color='primary' className='submit-button' onClick={uploadData}>Add</Button>
                        </div>
                </form>
        
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

export default Publications