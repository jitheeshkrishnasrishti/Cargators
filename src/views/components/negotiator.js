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
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Button,
  Row,
} from "reactstrap";
// core components
import "./conponentStyle.css"

import Header from "components/Headers/Header.js";
export class Negotiator extends Component {
    nextPath(path) {
        this.props.history.push(path);
      }

      constructor(props) {
        super(props);
        this.state = {
          negotiators: [],

        };
      }
      componentDidMount(){
        axios.get('http://localhost:4000/negotiator/allNegotiators')
          .then(response => {
            console.log(response.data.data)
            this.setState({ negotiators: response.data.data });
          })
          .catch(function (error) {
            console.log(error);
          })
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
          <Button className="btn_clrChange" color="primary" onClick={() => this.nextPath('/admin/add-negotiator') }  >
          Add Negotiator
                </Button>
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Negotiators</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Contact</th>
                    <th scope="col">gender</th>
                    <th scope="col" className="text-right">Action</th>

                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                {this.state.negotiators.map((item, i) => 

                  <tr>
                  <td key={i}>{item.FullName}</td>

                  <td key={i}>{item.Email}</td>
                  
                  <td key={i}>{item.Contact}</td>

                  <td key={i}>{item.Gender}</td>

                    <td className="text-right">
                    Action
                    </td>
                  </tr>
                )}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
        {/* Dark table */}
        <Row className="mt-5">
          <div className="col">
          
          </div>
        </Row>
      </Container>
    </>
  );
                        }
                    };

export default Negotiator;
