import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import { NavBar } from "./NavBar";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const data = await axios.get<Activity[]>(
        "http://localhost:5000/api/Activities"
      );
      setActivities(data.data);
    };

    getData();
  }, []);

  const handleSelectActivity = (id: String) => {
    setSelectedActivity(
      activities.find((x) => {
        return x.id === id;
      })
    );
    console.log("handleselect çalıştı");
    console.log(selectedActivity);
  };

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
    console.log("handlecancel çalıştı");
  };

  const handleFormOpen = (id?: string) => {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  };

  const handleFormClose = () => {
    setEditMode(false);
  };

  const handleCreateOrEditActivity = (activity: Activity) => {
    activity.id
      ? setActivities([
          ...activities.filter((x) => x.id !== activity.id),
          activity,
        ])
      : setActivities([...activities, { ...activity, id: uuid() }]);

    setEditMode(false);
    setSelectedActivity(activity);
  };

  const handleDeleteActivity = (id: string) => {
    setActivities(activities.filter((x) => x.id !== id));
  };

  if (activities.length === 0) return <div>Loading...</div>;
  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivityFunc={handleSelectActivity}
          cancelSelectActivityFunc={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          handleCreateOrEditActivity={handleCreateOrEditActivity}
          handleDeleteActivity={handleDeleteActivity}
        />
      </Container>
    </>
  );
}

export default App;
