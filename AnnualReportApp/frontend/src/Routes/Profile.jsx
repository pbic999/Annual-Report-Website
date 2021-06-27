import NavigationBar from "../Components/NavigationBar"

const Profile = (props) => {
    const setUser = props.setUser

    return (
        <div className='main_div'>
            <NavigationBar setUser={setUser} />
            <h1>Profile</h1>
        </div>
    )
}

export default Profile