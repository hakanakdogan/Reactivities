import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { ActivityDetails } from "../details/ActivityDetails";
import { ActivityForm } from "../form/ActivityForm";
import { ActivityList } from "./ActivityList";

interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  selectActivityFunc: (id: string) => void;
  cancelSelectActivityFunc: () => void;
  editMode: boolean;
  openForm: (id: string) => void;
  closeForm: () => void;
  handleCreateOrEditActivity: (activity: Activity) => void;
  handleDeleteActivity: (id: string) => void;
}

export const ActivityDashboard = ({
  activities,
  selectedActivity,
  selectActivityFunc,
  cancelSelectActivityFunc,
  editMode,
  openForm,
  closeForm,
  handleCreateOrEditActivity,
  handleDeleteActivity,
}: Props) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList
          activities={activities}
          selectActivityFunc={selectActivityFunc}
          handleDeleteActivity={handleDeleteActivity}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity && !editMode && (
          <ActivityDetails
            activity={selectedActivity}
            cancelSelectActivityFunc={cancelSelectActivityFunc}
            openForm={openForm}
          />
        )}
        {editMode && (
          <ActivityForm
            closeForm={closeForm}
            activity={selectedActivity}
            handleCreateOrEditActivity={handleCreateOrEditActivity}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};
