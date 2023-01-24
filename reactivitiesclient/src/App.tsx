import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios  from 'axios';
import { Header } from 'semantic-ui-react';
import List from 'semantic-ui-react/dist/commonjs/elements/List';
import ListItem from 'semantic-ui-react/dist/commonjs/elements/List/ListItem';

function App() {
const [activities, setActivities] = useState([]);

useEffect(()=>{
  axios.get('https://localhost:7225/api/activities').then(response=>{
    console.log(response);
    setActivities(response.data);
  })
},[])

  return (
    <div>
      <Header as='h2' icon='users' content='Reactivites'>
      <List>
      {activities.map((activity:any)=>(
            <List.Item  key={activity.id}>
              {activity.title}
            </List.Item>
          ))}
      </List>
       
      
      </Header>
    </div>
  );
}

export default App;
