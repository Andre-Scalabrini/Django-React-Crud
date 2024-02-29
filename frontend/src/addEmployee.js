  import 'bootstrap/dist/css/bootstrap.min.css';
  import 'font-awesome/css/font-awesome.min.css';

  import { useState, useEffect } from "react";
  import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
  import API from "./API";

  const AddEmployee = ({ onAdd }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [department, setDepartment] = useState("");
    const [employeeId, setEmployeeId] = useState(null);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
      refreshEmployees();
    }, []);

    const refreshEmployees = () => {
      API.get("/")
        .then((res) => {
          setEmployees(res.data);
        })
        .catch(console.error);
    };

    const onSubmit = (e) => {
      e.preventDefault();
      let item = { name, email, department };
      API.post("/", item).then(() => refreshEmployees());
    };

    const onUpdate = (id) => {
      let item = { name, email, department };
      API.patch(`/${id}/`, item).then((res) => refreshEmployees());
    };

    const onDelete = (id) => {
      API.delete(`/${id}/`).then((res) => refreshEmployees());
    };

    function selectEmployee(id) {
      let item = employees.filter((employee) => employee.id === id)[0];
      setName(item.name);
      setEmail(item.email);
      setDepartment(item.department);
      setEmployeeId(item.id);
    }
    

    return (
      <div>
<Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Brand href="#">
      <img
        src="/SmartflowSistemas.png"
        width="200"
        height="47"
        className="d-inline-block align-top"
        alt="Employees Control"
      />
    </Navbar.Brand>
    <div className="ml-auto">
      <span className="employees-text">Employees Control</span>
    </div>
  </Container>
</Navbar>


        <div className="container mt-5">
          <div className="row">
            <div className="col-md-4">
              <h3 className="float-left">Create a new Employee</h3>
              <Form onSubmit={onSubmit} className="mt-4">
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>{employeeId} Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDepartment">
                  <Form.Label>Department</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  />
                </Form.Group>

                <div className="float-right">
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={onSubmit}
                    className="mx-2"
                  >
                    Save
                  </Button>
                  <Button
                    variant="primary"
                    type="button"
                    onClick={() => onUpdate(employeeId)}
                    className="mx-2"
                  >
                    Update
                  </Button>
                </div>
              </Form>
            </div>
            <div className="col-md-8 m">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Employee Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Department</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee, index) => {
                    return (
                      <tr key="">
                        <th scope="row">{employee.id}</th>
                        <td> {employee.name}</td>
                        <td>{employee.email}</td>
                        <td>{employee.department}</td>
                        <td>
                          <i
                            className="fa fa-pencil-square text-primary d-inline"
                            aria-hidden="true"
                            onClick={() => selectEmployee(employee.id)}
                          ></i>
                          <i
                            className="fa fa-trash-o text-danger d-inline mx-3"
                            aria-hidden="true"
                            onClick={() => onDelete(employee.id)}
                          ></i>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default AddEmployee;
