/* eslint-disable react/prop-types */
import { Button, Form } from "react-bootstrap";
import "./AddAgentForm.css"
import { useEffect, useState } from "react";
import { useAddAgentMutation, useUpdateAgentMutation, useDeleteAgentMutation } from "../../../api/Agents";

const initialState = {
  fullName: "",
  email: "",
  department: "",
  interests: "",
}

export default function AddAgentForm({
  open,
  setIsOpen,
  agentObj,
  setEditAgent
}) {
  const [formValue, setFormValue] = useState(initialState)
  const [addAgent] = useAddAgentMutation()
  const [updateAgent] = useUpdateAgentMutation();
  const [deleteAgent] = useDeleteAgentMutation()

  useEffect(() => {
    if (open && agentObj) {
      setFormValue(agentObj)
    }
  }, [open, agentObj])

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormValue((preVal) => ({
      ...preVal, [name]: value
    }))
  }

  const closeForm = () => {
    setIsOpen(false)
    setFormValue(initialState)
    setTimeout(() => {
      setEditAgent(null)
    }, 800)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!agentObj) {
      try {
        await addAgent(formValue).unwrap()
        closeForm()
      } catch (err) {
        console.error("something went wrong: ", err)
      }
    } else {
      try {
        await updateAgent({ id: agentObj.id, formValue }).unwrap();
        closeForm()
      } catch (err) {
        console.error("something went wrong: ", err)
      }
    }
  }

  const handleDelete = async () => {
    try {
      if (window.confirm("Are you sure you want to delete this agent?")) {
        await deleteAgent(agentObj.id)
      }
      closeForm()
    } catch (err) {
      console.error("somewthing went wrong: ", err)
    }

  }

  return (
    <Form
      className="sliding-form"
      style={{ left: open ? "0px" : "100%" }}
      onSubmit={handleSubmit}
    >
      <h2 style={{ marginBottom: "2em" }}>
        {agentObj ? "Update Agent" : "Add A New Agent"}
      </h2>
      <Form.Group className="mb-3" controlId="formBasicEmail">
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
      <Form.Group className="mb-3" controlId="formBasicEmail">
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
      <Form.Group className="mb-3" controlId="formBasicEmail">
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
      <Form.Group className="mb-3" controlId="formBasicEmail">
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
          <Button
            variant="outline-danger"
            type="button"
            onClick={closeForm}
          >
            Cancel
          </Button>
        </div>
        <div className="col2">
          {agentObj && (<Button
            variant="danger"
            type="button"
            onClick={handleDelete}
          >
            Delete Agent
          </Button>)}

        </div>
      </div>
    </Form>
  )
}