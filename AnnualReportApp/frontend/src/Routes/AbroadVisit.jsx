import NavigationBar from "../Components/NavigationBar"
import DatePicker from 'react-date-picker'
import { useEffect, useState } from "react"
import 'react-datepicker/dist/react-datepicker.css'
import '../../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import fetchData from "../Components/axios"
import { Button, CircularProgress } from "@material-ui/core"

const AbroadVisit = (props) => {
    const setUser = props.setUser
    const editMode = 'edit'
    const deleteMode = 'delete'
    const [dataList, setDataList] = useState([])
    const [loading, setLoading] = useState(true)
    const email = props.user.email
    const name = props.user.name
    const [visit_purpose, setPurpose] = useState()
    const [venue, setVenue] = useState()
    const [start, setStart] = useState()
    const [end, setEnd] = useState()
    const [funding_from, setFundingFrom] = useState()
    const [err,setErr] = useState()

    const deptArray = ['Chemical', 'Chemistry', 'Civil and Environmental', 'Electrical',
        'Computer Science', 'Humanities and Social Sciences', 'Mathematics and Statistics',
        'Mechanical', 'Physics']
        let sorting_no
    deptArray.map((x,index)=> {if(x === props.user.dept) sorting_no = index})

    useEffect(() => {
        fetchData.post('user/get/data/abroad_visit', { email }).then((res) => {
            setLoading(false)
            setDataList(res.data)
        })
    }, [])

    const clearStates = () => {
        setPurpose("")
        setVenue("")
        setStart("")
        setFundingFrom("")
        setEnd("")
    }

    const checkStates = () => {
        const states = [
            visit_purpose, venue, start,
            end, funding_from, email, name
        ]
        for(let i=0; i < states.length; i++) {
            if(!states[i] || states[i].trim().length === 0) return false
        }
        return true
    }

    const uploadData = async (e) => {
        e.preventDefault()
        setErr()
        if(checkStates()) {
            const body = {
                visit_purpose, venue, start,
                end, funding_from, sorting_no
            }
            setLoading(true)
            fetchData.post('/user/upload/data/abroad_visit', {...body,email,name}).then((res) => {
                setLoading(false)
                setDataList(oldData => [...oldData,body])
                clearStates()
            }).catch((err) => setLoading(false))
        }
        else {
            setErr('Please fill all mandatory fields.')
        }
    }


    const Records = ({ id, x }) => {
        const [mode, setMode] = useState()
        const [start, setStart] = useState(x.start)
        const [end, setEnd] = useState(x.end)

        const editContent = () => {
            if (!mode) {
                setMode(editMode)
                document.getElementsByClassName('date-picker' + id)[0].classList.add('date')
                document.getElementsByClassName('date-picker' + id)[1].classList.add('date')
                document.getElementById(`row` + id).classList.add('yellow')
            }
        }

        const deleteContent = () => {
            if (!mode) {
                setMode(deleteMode)
                document.getElementById(`row` + id).classList.add('red')

            }
        }

        const deleteOrUpdateContent = () => {
            document.getElementsByClassName('date-picker' + id)[0].classList.remove('date')
            document.getElementsByClassName('date-picker' + id)[1].classList.remove('date')
            if (mode === editMode) {
                document.getElementById(`row` + id).classList.remove('yellow')
                const fields = ['visit_purpose', 'venue', 'funding_from']
                const div_grps = document.getElementsByClassName(`input-div${id}`)
                let req_body = ''
                for (let i = 0; i < div_grps.length; i++) {
                    if (i === div_grps.length - 1)
                        req_body = `${req_body} "${fields[i]}":"${div_grps[i].innerHTML}"`
                    else req_body = `${req_body} "${fields[i]}":"${div_grps[i].innerHTML}",`
                }
                req_body = JSON.parse(`{${req_body}}`)
                setLoading(true)
                fetchData.post('user/update/data/abroad_visit', {...req_body,start,end,_id: x._id }).then((res) => {
                    setDataList((oldList) => oldList.map((x,index) => {
                        if(index === id) return  {...req_body,start,end,_id: x._id }
                    else return x}) )
                         setMode()
                         setLoading(false)
                         console.log(dataList);
                }).catch((err) => { 
                    setLoading(false)
                })

            }
            else if (mode === deleteMode) {
                setLoading(true)
                document.getElementById(`row` + id).classList.remove('red')
                fetchData.delete(`user/delete/abroad_visit/${x._id}`).then((res) => {
                    setDataList((oldList) => oldList.filter(ele => ele._id !== x._id) )
                         setMode()
                         setLoading(false)
                }).catch((err) => { 
                    setLoading(false)
                })
            }
        }

        const cancel = () => {
            const data = [x.visit_purpose, x.venue, x.funding_from]
            const div_grps = document.getElementsByClassName(`input-div${id}`)
            setStart(x.start)
            setEnd(x.end)
            for (let i = 0; i < div_grps.length; i++) {
                div_grps[i].innerHTML = data[i]
            }
            setMode()
            const datepickers = document.getElementsByClassName('date-picker' + id)
            datepickers[0].classList.remove('date')
            datepickers[1].classList.remove('date')
            document.getElementById(`row` + id).classList.remove('red')
            document.getElementById(`row` + id).classList.remove('yellow')
        }

        const color = { color: mode ? '#000' : '#777' }

        return (
            <div className="entries-row" style={color} id={`row` + id}>
                <div className="sno">{id + 1}</div>
                <div contentEditable={mode === editMode} className={`flex1 input-div${id}`}>{x.visit_purpose}</div>
                <div contentEditable={mode === editMode} className={`flex1 input-div${id}`}>{x.venue}</div>
                <input style={color} type='date' className={`flex1 unstyled date-picker${id}`}
                    value={start} onChange={e => setStart(e.target.value)} />
                <input style={color} type='date' className={`flex1 unstyled date-picker${id}`}
                    value={end} onChange={e => setEnd(e.target.value)} />
                <div className="flex1">
                    <div contentEditable={mode === editMode} className={`last-col input-div${id}`}>{x.funding_from}</div>
                    {mode ? <>
                        <i className='bi bi-check-circle-fill check-icon' onClick={deleteOrUpdateContent} />
                        <i className='bi bi-x-circle-fill delete-icon' onClick={cancel} />
                    </> :
                        <>
                            <i className="bi bi-pencil-square edit-icon edit-icon" onClick={editContent} />
                            <i className='bi bi-trash-fill delete-icon' onClick={deleteContent} />
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
                    <div className="flex1">Purpose</div>
                    <div className="flex1">Country</div>
                    <div className="flex1">Start</div>
                    <div className="flex1">End</div>
                    <div className="flex1">Funding from</div>
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
        <div className='main_div' style={{opacity: loading? 0.5 : 1}}>
            <NavigationBar setUser={setUser} />
            <div className="content">
            <form className="entry-form">
                    {err ? <p style={{color: 'crimson',marginBottom: '10px',textAlign:'center'}}> {err} </p> : <> </>}
                <div className="row">
                    <div className='left'>
                        <label className='form-label'>
                            Visit purpose<span style={{ color: 'red' }}>*</span>
                        </label>
                        <input className='form-input' type="text" value={visit_purpose}
                            onChange={e => setPurpose(e.target.value)} />
                    </div>
                    <div className='right'>
                        <label className='form-label' htmlFor="text">Country visited<span style={{ color: 'red' }}>*</span></label>
                        <input className='form-input' multiple type="text"
                            value={venue} onChange={e => setVenue(e.target.value)} />
                    </div>
                </div>
                <div className="row">
                    <div className='left'>
                        <label className='form-label'>Start Date<span style={{ color: 'red' }}>*</span></label>
                        <input className='form-input date' type="date"
                            value={start} onChange={e => { setStart(e.target.value); console.log(e.target.value) }} />
                    </div>
                    <div className='right'>
                        <label className='form-label'>End Date<span style={{ color: 'red' }}>*</span></label>
                        <input className='form-input date' type="date"
                            value={end} onChange={e => setEnd(e.target.value)} />
                    </div>
                </div>
                <div className="row">
                    <div className='left'>
                        <label className='form-label' htmlFor="text">Funding from<span style={{ color: 'red' }}>*</span></label>
                        <input className='form-input' type="text"
                            value={funding_from} onChange={e => setFundingFrom(e.target.value)} />
                    </div>
                </div>
                <div className="button-div">
                    <Button variant="contained" color='primary' onClick={uploadData} type='submit'>Add</Button>
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

export default AbroadVisit