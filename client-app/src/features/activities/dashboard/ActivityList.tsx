import React from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
  activities: Activity[];
  selectActivityFunc: (id: string) => void;
  handleDeleteActivity: (id: string) => void;
}

export const ActivityList = ({
  activities,
  selectActivityFunc,
  handleDeleteActivity,
}: Props) => {
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
                    onClick={() => handleDeleteActivity(activity.id)}
                    floated="right"
                    content="Delete"
                    color="red"
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
