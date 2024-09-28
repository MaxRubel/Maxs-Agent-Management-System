import "./App.css";
import { Table } from "react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { getAllAgents } from "../api/Agents";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch()
  const { agents, loading, error } = useSelector((state => state.agents))

  useEffect(() => {
    dispatch(getAllAgents())
  }, [])

  console.log(agents)

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Something went wrong...</div>
  }

  return (
    <>
      <h1>Max&apos;s Incredible Agent Management System</h1>
      <div className="grid-container centered">
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
            <tr>
              <td>John Doe</td>
              <td>john.doe@example.com</td>
              <td>Marketing</td>
              <td>Photography, Hiking</td>
            </tr>
            <tr>
              <td>Jane Smith</td>
              <td>jane.smith@example.com</td>
              <td>Engineering</td>
              <td>Coding, Chess</td>
            </tr>
            <tr>
              <td>Mike Johnson</td>
              <td>mike.johnson@example.com</td>
              <td>Sales</td>
              <td>Golf, Cooking</td>
            </tr>
            <tr>
              <td>Emily Brown</td>
              <td>emily.brown@example.com</td>
              <td>Human Resources</td>
              <td>Yoga, Reading</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default App;
