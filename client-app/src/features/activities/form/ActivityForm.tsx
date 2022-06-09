import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
  activity: Activity | undefined;
  closeForm: () => void;
  handleCreateOrEditActivity: (activity: Activity) => void;
  submitting: boolean;
}

export const ActivityForm = ({
  activity: selectedActivity,
  closeForm,
  handleCreateOrEditActivity,
  submitting,
}: Props) => {
  const initialState = selectedActivity ?? {
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  };

  const [activity, setActivity] = useState(initialState);

  const handleSubmit = () => {
    handleCreateOrEditActivity(activity);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setActivity({ ...activity, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={() => handleSubmit()} autoComplete="off">
        <Form.Input
          placeholder="Title"
          value={activity.title}
          name="title"
          onChange={(e) => handleInputChange(e)}
        />
        <Form.TextArea
          placeholder="Description"
          value={activity.description}
          name="description"
          onChange={(e) => handleInputChange(e)}
        />
        <Form.Input
          placeholder="Category"
          value={activity.category}
          name="category"
          onChange={(e) => handleInputChange(e)}
        />
        <Form.Input
          placeholder="Date"
          value={activity.date}
          name="date"
          type="date"
          onChange={(e) => handleInputChange(e)}
        />
        <Form.Input
          placeholder="City"
          value={activity.city}
          name="city"
          onChange={(e) => handleInputChange(e)}
        />
        <Form.Input
          placeholder="Venue"
          value={activity.venue}
          name="venue"
          onChange={(e) => handleInputChange(e)}
        />
        <Button
          loading={submitting}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          onClick={() => closeForm()}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};
