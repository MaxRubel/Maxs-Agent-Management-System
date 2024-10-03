import "./App.css";
import { Button, Table } from "react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import AddAgentForm from "./components/AddAgentForm/AddAgentForm";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function App() {
  const [openForm, setOpenForm] = useState(false);
  const [editAgent, setEditAgent] = useState(null);
  const [departments, setDepartments] = useState({});

  const { agents } = useSelector((state) => state.agents);

  const updateAgentForm = (id) => {
    const agentObj = agents.find((item) => item.id === id);
    setEditAgent(agentObj);
    setOpenForm(true);
  };

  useEffect(() => {
    const newDepartments = {};
    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];
      const department = agent.department;

      if (newDepartments[department]) {
        newDepartments[department].push(agent);
      } else {
        newDepartments[department] = [agent];
      }
    }

    setDepartments(newDepartments);
  }, [agents]);

  return (
    <main>
      <h1>Agents</h1>
      <div style={{ margin: "2em 0em" }}>
        <Button
          variant="outline-primary"
          onClick={() => {
            setOpenForm(true);
          }}
        >
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
                  onClick={() => {
                    updateAgentForm(agent.id);
                  }}
                >
                  {agent.fullName}
                </td>
                <td>
                  <a href={`mailto:${agent.email}`}>{agent.email}</a>
                </td>
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