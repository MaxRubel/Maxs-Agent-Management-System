/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addAgent, removeAgent, updateAgent } from "../../store/agentsSlice";
import "./AddAgentForm.css";

const initialState = {
  fullName: "",
  email: "",
  department: "",
  interests: "",
};

export default function AddAgentForm({ open, setIsOpen, agentObj, setEditAgent }) {
  const [formValue, setFormValue] = useState(initialState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (open && agentObj) {
      setFormValue(agentObj);
    }
  }, [open, agentObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prevVal) => ({
      ...prevVal,
      [name]: value,
    }));
  };

  const closeForm = () => {
    setIsOpen(false);
    setFormValue(initialState);
    setTimeout(() => {
      setEditAgent(null);
    }, 800);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agentObj) {
      dispatch(addAgent({ ...formValue, id: Date.now() }));
    } else {
      dispatch(updateAgent({ ...formValue, id: agentObj.id }));
    }
    closeForm();
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this agent?")) {
      dispatch(removeAgent({ id: agentObj.id }));
    }
    closeForm();
  };

  return (
    <Form
      className="sliding-form"
      style={{ left: open ? "0px" : "100%" }}
      onSubmit={handleSubmit}
    >
      <h2 style={{ marginBottom: "2em" }}>
        {agentObj ? "Update Agent" : "Add A New Agent"}
      </h2>
      <Form.Group className="mb-3" controlId="formFullName">
        <Form.Label className="text-left">Full Name</Form.Label>
        <Form.Control
          type="text"
          name="fullName"
          value={formValue.fullName}
          placeholder="Enter full name"
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label className="text-left">Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formValue.email}
          placeholder="Enter email"
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formDepartment">
        <Form.Label className="text-left">Department</Form.Label>
        <Form.Control
          type="text"
          name="department"
          value={formValue.department}
          placeholder="Enter department"
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formInterests">
        <Form.Label className="text-left">Interests</Form.Label>
        <Form.Control
          type="text"
          name="interests"
          value={formValue.interests}
          placeholder="Enter interests, separated by a comma"
          onChange={handleChange}
        />
      </Form.Group>
      <div className="button-gap">
        <div className="col1">
          <Button variant="outline-primary" type="submit">
            Submit
          </Button>
          <Button variant="outline-danger" type="button" onClick={closeForm}>
            Cancel
          </Button>
        </div>
        <div className="col2">
          {agentObj && (
            <Button variant="danger" type="button" onClick={handleDelete}>
              Delete Agent
            </Button>
          )}
        </div>
      </div>
    </Form>
  );
}