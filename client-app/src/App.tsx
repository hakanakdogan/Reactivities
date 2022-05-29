import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { Header, List } from "semantic-ui-react";

function App() {
  const [activities, setActivities] = useState<any>([]);
  useEffect(() => {
    const getData = async () => {
      const data = await axios.get("http://localhost:5000/api/Activities");
      setActivities(data.data);
    };

    getData();
  }, []);

  if (activities.length === 0) return <div>Loading...</div>;
  return (
    <div>
      <Header as="h2" icon={"users"} content="Reactivities" />

      <List>
        {activities.map((activity: any) => {
          return <List.Item key={activity.id}>{activity.title}</List.Item>;
        })}
        {console.log(activities)}
      </List>
    </div>
  );
}

export default App;
