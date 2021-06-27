import {BrowserRouter, Route, Switch, useHistory} from 'react-router-dom'
import Home from './Routes/Home';

import './App.css';
import NavigationBar from './Components/NavigationBar';
import Publications from './Routes/Publications';
import AbroadVisit from './Routes/AbroadVisit';
import AwardAndHonours from './Routes/AwardAndHonours';
import Books from './Routes/Books';
import ConferenceOrganized from './Routes/ConferenceOrganized';
import ConferenceAttended from './Routes/ConferenceAttended';
import ConferencePresentation from './Routes/ConferencePresentation';
import Projects from './Routes/Projects';
import SpecialLectures from './Routes/SpecialLectures';
import VisitToDepartment from './Routes/VisitToDepartment';
import SignIn from './Routes/Signin';
import CompleteProfile from './Routes/CompleteProfile';
import Fellowships from './Routes/fellowships';
import { useEffect, useState } from "react"

const PageNotFound = (props) => {
  return (
    <div style={{display: 'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',flex: 1}}> 
        <img src='./err404.jpg' style={{width: '60%',height:'80%'}} />
        <span style={{fontSize: '16px',fontWeight: '500',cursor:'pointer'}} onClick={e => props.history.push('/')}>&#8592; Back to Home </span>
    </div>
  )
}

function App() {

  const data = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
    const [user,setUser] = useState(data)

    useEffect(() => {
        if(user)
        localStorage.setItem('user',JSON.stringify(user))
        else { 
          localStorage.removeItem('user')}
    },[user])

  return (
    <div className="App">
  {!user ? <SignIn setUser={user => setUser(user)}/> :
   !user.dept ? <CompleteProfile user={user} 
    setUser={info => setUser((oldData => { return {...oldData,...info} }))}/> : 
      <BrowserRouter>
      <Switch>
        <Route exact path='/'> <Home setUser={user => setUser(user)} user={user} /> </Route>
        <Route exact path='/publications'> <Publications setUser={user => setUser(user)} user={user}/> </Route>
        <Route exact path='/abroad visits'> <AbroadVisit setUser={user => setUser(user)} user={user}/> </Route>
        <Route exact path='/award and honours'> <AwardAndHonours setUser={user => setUser(user)} user={user}/> </Route>
        <Route exact path='/books'> <Books setUser={user => setUser(user)} user={user}/> </Route>
        <Route exact path='/conference organized'> <ConferenceOrganized setUser={user => setUser(user)} user={user}/> </Route>
        <Route exact path='/conference attend'> <ConferenceAttended setUser={user => setUser(user)} user={user}/> </Route> 
        <Route exact path='/conference presentation'> <ConferencePresentation setUser={user => setUser(user)} user={user}/> </Route>
        <Route exact path='/fellowships'> <Fellowships setUser={user => setUser(user)} user={user}/> </Route>
        <Route exact path='/projects'> <Projects setUser={user => setUser(user)} user={user}/> </Route>
        <Route exact path='/special lectures'> <SpecialLectures setUser={user => setUser(user)} user={user}/> </Route>
        <Route exact path='/visit to department'> <VisitToDepartment setUser={user => setUser(user)} user={user}/> </Route>
        <Route path='*' component={PageNotFound} />
        </Switch>
      </BrowserRouter>
     }
    </div>
  );
}

export default App;
