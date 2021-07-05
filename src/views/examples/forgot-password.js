
import React, { Component } from 'react';
import axios from 'axios';

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import "./exampleStyle.css"

export class Forgot_password extends Component {
  constructor(props) {
    super(props);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      Email: '',
      Password: '',
      ConfirmPassword: '',
      loginResponce: []
    }
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
  onChangeConfirmPassword(e) {
    this.setState({
        ConfirmPassword: e.target.value
    })
  }
  async onSubmit(e) {
    e.preventDefault();
console.log("kkkkk")
    const obj = {
      Email: this.state.Email,
      Password: this.state.Password,
      ConfirmPassword : this.state.ConfirmPassword,
    };
    console.log(obj)
   let resData = await axios.post('http://localhost:4000/business/ChangePassword', obj)
      console.log(resData)

      this.setState({
        loginResponce: [resData.data]
      })
if(resData.data.Status === true){
  this.props.history.push('/auth/login');
}else{
  alert(resData.data.message)
}

  }
// const Login = () => {
  render() {

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
        
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Forgot Password</small>
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email" value={this.state.Email}
                    onChange={this.onChangeEmail}
                    type="email"
                    autoComplete="new-email"
                  />
                  
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="New Password"
                    value={this.state.Password}
              onChange={this.onChangePassword}
                    type="password"
                    autoComplete="new-password"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Confirm Password"
                    value={this.state.ConfirmPassword}
              onChange={this.onChangeConfirmPassword}
                    type="password"
                    autoComplete="new-password"
                  />
                </InputGroup>
              </FormGroup>
              {/* <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div> */}
              {/* my-4 */}
              <div className="text-center">
                <Button className="btn_clrChange" color="primary" onClick={this.onSubmit}  >
                  Change Password
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="/auth/login"
            >
              <small>Login</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Create new account</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
                  }
};

export default Forgot_password;
