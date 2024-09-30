import { useContext } from "react";
import "./App.css";
import { FetchContext } from "./context/FetchingContext";
import { Table } from "react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { getAllAgents } from "../api/Agents";

function App() {
  // eslint-disable-next-line no-unused-vars
  const { fakeData, setFakeData } = useContext(FetchContext);
  console.log(fakeData);

  getAllAgents();

  return (
    <>
      <h1>Agents</h1>
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
