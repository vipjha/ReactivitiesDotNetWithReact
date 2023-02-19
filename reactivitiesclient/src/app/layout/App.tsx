import React, { useEffect, useState } from 'react';
//import './App.css';
import axios  from 'axios';
import { Container} from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';

function App() {
const [activities, setActivities] = useState<Activity[]>([]);
const [selectActivity, setSeclectedActivity] = useState<Activity| undefined>(undefined);
const [editMode, setEditMode] = useState(false);



useEffect(()=>{
  axios.get<Activity[]>('https://localhost:7225/api/activities').then(response=>{
    //console.log(response);
    setActivities(response.data);
  })
},[])

function handleSelectActivity(id:string){
  setSeclectedActivity(activities.find(x=>x.id===id));
}

function handleCancleSelectActivity(){
  setSeclectedActivity(undefined);
}

function handleFormOpen(id?:string){
  id?handleSelectActivity(id):handleCancleSelectActivity();
  setEditMode(true);
}

function handleFormClose(){
setEditMode(false);
}

function handleCreateOrEditActivity(activity:Activity){
 activity.id
 ? setActivities([...activities.filter(x=>x.id!==activity.id),activity])
 :setActivities([...activities,{...activity, id:uuid()}]);
 setEditMode(false);
 setSeclectedActivity(activity);
}

function handleDeleteActivity(id:string){
  setActivities([...activities.filter(x=>x.id!==id)])
}


  return (
    <>
      {/* <Header as='h2' icon='users' content='Reactivites'/> */}
      <NavBar openForm={handleFormOpen} /> 
      <Container style={{marginTop:'7em'}}>
        <ActivityDashboard  
        activities={activities}
        selectedActivity={selectActivity}
        selectActivity= {handleSelectActivity}
        cancleSelectActivity={handleCancleSelectActivity} 
        editMode={editMode}
        openForm={handleFormOpen}
        closeForm={handleFormClose}
        createOrEdit={handleCreateOrEditActivity}
        deleteActivity={handleDeleteActivity}
        />
      </Container>
      
    </>
  );
}
export default App;
