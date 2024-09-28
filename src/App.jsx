import "./App.css";
import { Button, Table } from "react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import AddAgentForm from "./components/AddAgentForm/AddAgentForm";
import { useState } from "react";
import { useSelector } from "react-redux";

function App() {
  const [openForm, setOpenForm] = useState(false)
  const [editAgent, setEditAgent] = useState(null)

  const { agents } = useSelector((state) => state.agents);

  // const { data: agents, error, isLoading } = useGetAllAgentsQuery();

  const updateAgentForm = (id) => {
    const agentObj = agents.find((item) => item.id === id)
    setEditAgent(agentObj)
    setOpenForm(true)
  }

  // if (isLoading) {
  //   return <div>Loading...</div>
  // }

  // if (error) {
  //   return <div>Something went wrong...</div>
  // }

  return (
    <main>
      <h1>Max&apos;s Amazing Agent Management System</h1>
      <div style={{ margin: "2em 0em" }}>
        <Button
          variant="outline-primary"
          onClick={() => { setOpenForm(true) }} >
          Add an Agent
        </Button>
      </div>
      <div className="grid-container centered">
        <AddAgentForm
          open={openForm}
          setIsOpen={setOpenForm}
          setEditAgent={setEditAgent}
          agentObj={editAgent}
        />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Interests</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
              <tr key={agent.id}>
                <td
                  style={{ cursor: "pointer" }}
                  onClick={() => { updateAgentForm(agent.id) }}
                >
                  {agent.fullName}
                </td>
                <td><a href={`mailto:${agent.email}`}>{agent.email}</a></td>
                <td>{agent.department}</td>
                <td>{agent.interests}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </main>
  );
}

export default App;
