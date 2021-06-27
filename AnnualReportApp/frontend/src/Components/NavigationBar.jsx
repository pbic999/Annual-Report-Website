import { NavLink, useHistory } from "react-router-dom"
import './NavigationBar.css'

const NavigationBar = (props) => {
    const setUser = props.setUser
    let history = useHistory()

    const logout = () => {
        setUser()
        history.push('/')
    }
    return (
        <div className='navigation_bar'>
            <div className='links'>
        <NavLink className='unactive' exact to='/'>Home</NavLink>
        <NavLink className='unactive' exact to='/publications'>Publications</NavLink>
        <NavLink className='unactive' exact to='/abroad visits'>Abroad visit</NavLink>
        <NavLink className='unactive' exact to='/award and honours'>Award and Honours</NavLink>
        <NavLink className='unactive' exact to='/books'>Books/Book Chapters</NavLink>
        <NavLink className='unactive'  exact to='/conference organized'>Conference organized</NavLink>
        <NavLink className='unactive' exact to='/conference presentation'>Conference presentaions/Proceedings</NavLink>
        <NavLink className='unactive' exact to='/conference attend'>Conference attend</NavLink>
        <NavLink className='unactive' exact to='/fellowships'>Fellowships</NavLink>
        <NavLink className='unactive' exact to='/projects'>Projects</NavLink>
        <NavLink className='unactive' exact to='/special lectures'>Special Lectures</NavLink>
        <NavLink className='unactive' exact to='/visit to department'>Visit to department</NavLink>
        <span className='logout' onClick={logout}> Logout </span>
        </div>
        </div>
    )
}

export default NavigationBar