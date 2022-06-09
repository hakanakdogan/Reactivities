import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
  activities: Activity[];
  selectActivityFunc: (id: string) => void;
  handleDeleteActivity: (id: string) => void;
  submitting: boolean;
}

export const ActivityList = ({
  activities,
  selectActivityFunc,
  handleDeleteActivity,
  submitting,
}: Props) => {
  const [target, setTarget] = useState("");
  const handleActivityDelete = (
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setTarget(e.currentTarget.name);
    handleDeleteActivity(id);
  };
  return (
    <Segment>
      <Item.Group divided>
        {activities.map((activity) => {
          return (
            <Item key={activity.id}>
              <Item.Content>
                <Item.Header as={"a"}>{activity.title}</Item.Header>

                <Item.Meta>{activity.date}</Item.Meta>
                <Item.Description>
                  <div className=""> {activity.description} </div>
                  <div className="">
                    {activity.city}, {activity.venue}
                  </div>
                </Item.Description>
                <Item.Extra>
                  <Button
                    onClick={() => selectActivityFunc(activity.id)}
                    floated="right"
                    content="View"
                    color="blue"
                  />
                  <Button
                    name={activity.id}
                    onClick={(e) => handleActivityDelete(e, activity.id)}
                    floated="right"
                    content="Delete"
                    color="red"
                    loading={submitting && target === activity.id}
                  />
                  <Label basic content={activity.category} />
                </Item.Extra>
              </Item.Content>
            </Item>
          );
        })}
      </Item.Group>
    </Segment>
  );
};
