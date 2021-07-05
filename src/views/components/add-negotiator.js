/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React,{ Component } from "react";
import axios from 'axios';

// reactstrap components
import {
  Card,
  CardHeader,
 
  Container,
  Row,
  Col,
  CardBody,
  Form,
  FormGroup,
  Input,
  Button,
  
} from "reactstrap";
// core components
import "./conponentStyle.css"
import Header from "components/Headers/Header.js";

export class Add_negotiator extends Component {

  constructor(props) {
    super(props);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeContact = this.onChangeContact.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      FirstName:'',
      LastName:'',
      Gender:'',
      Contact:'',
      Email: '',
      Password: '',
      AddNegotiator: []
    }
  }
  onChangeFirstName(e) {
    this.setState({
      FirstName: e.target.value 
    });
  }
  onChangeLastName(e) {
    this.setState({
      LastName: e.target.value 
    });
  }
  onChangeGender(e) {
    this.setState({
      Gender: e.target.value 
    });
  }
  onChangeContact(e) {
    this.setState({
      Contact: e.target.value 
    });
  }
  onChangeEmail(e) {
    this.setState({
      Email: e.target.value 
    });
  }
  onChangePassword(e) {
    this.setState({
      Password: e.target.value
    })
  }
    nextPath(path) {
        this.props.history.push(path);
      }
      async onSubmit(e) {
        e.preventDefault();
    console.log("kkkkk")
        const obj = {
          FirstName: this.state.FirstName,
          LastName: this.state.LastName,
          Gender: this.state.Gender,
          Contact: this.state.Contact,
          Email: this.state.Email,
          Password: this.state.Password,
        };
        console.log(obj)
       let resData = await axios.post('http://localhost:4000/negotiator/addNegotiator', obj)
          console.log(resData)
    
          this.setState({
            loginResponce: [resData.data]
          })
    if(resData.data.status === true){
      this.props.history.push('/admin/negotiator');
    }else{
      alert(resData.data.message)
    }
    
      }
    render() {

  return (
    <>
      <Header />
      {/* Page content */}
      
      <Container className="mt--7" fluid>
        {/* Table */}
      
        <Row>
      
          <div className="col">
         
                <Card className="bg-secondary shadow">
<CardHeader className="bg-white border-0">
  <Row className="align-items-center">
    <Col xs="8">
      <h3 className="mb-0">Add Negotiator</h3>
    </Col>
   
  </Row>
</CardHeader>
<CardBody>
  <Form>
    
    <div className="pl-lg-4">
      <Row>
        <Col lg="6">
          <FormGroup>
            <label
              className="form-control-label"
              htmlFor="input-username"
            >
              First Name
            </label>
            <Input
              className="form-control-alternative"
              placeholder="First Name"
              onChange={this.onChangeFirstName}

              type="text"
            />
          </FormGroup>
        </Col>
        <Col lg="6">
          <FormGroup>
            <label
              className="form-control-label"
              htmlFor="input-email"
            >
              Last Name
            </label>
            <Input 
              className="form-control-alternative"
              onChange={this.onChangeLastName}
              placeholder="Last Name"
              type="text"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col lg="6">
          <FormGroup>
            <label
              className="form-control-label"
              htmlFor="input-first-name"
            >
              Email
            </label>
            <Input
              className="form-control-alternative"
              onChange={this.onChangeEmail}
              placeholder="Email"
              type="email"
            />
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup>
            <label
              className="form-control-label"
              htmlFor="input-address"
            >
              Password
            </label>
            <Input
              className="form-control-alternative"
              placeholder="Password"
              onChange={this.onChangePassword}
              type="password"
            />
          </FormGroup>
        </Col>

</Row>
<Row>
        <Col lg="6">
          <FormGroup>
          <label
              className="form-control-label"
              htmlFor="input-last-name"
            >
              Gender
            </label>
          <div className="form-check">
  <input className="form-check-input" value="male" type="radio"  onChange={this.onChangeGender} ></input>
  <label className="form-check-label" htmlFor="flexRadioDefault1">
    Male
  </label>
</div>
<div className="form-check">
  <input className="form-check-input"  value="female" type="radio" onChange={this.onChangeGender}  ></input>
  <label className="form-check-label" htmlFor="flexRadioDefault2">
  female
  </label>
</div>
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup>
            <label
              className="form-control-label"
              htmlFor="input-address"
            >
              Contact
            </label>
            <Input
              className="form-control-alternative"
              onChange={this.onChangeContact}
              placeholder="Contact"
              type="Number"
            />
          </FormGroup>
        </Col>
      </Row>
    </div>
    <div className="text-center">
                <Button className="btn_clrChange" color="primary"  onClick={this.onSubmit} >
                  Add Negotiator
                </Button>
              </div>
    {/* Address */}
  
 
   
   
  </Form>
</CardBody>
</Card>
          </div>
        </Row>
      </Container>
    </>
  );
                        }
                    };

export default Add_negotiator;
