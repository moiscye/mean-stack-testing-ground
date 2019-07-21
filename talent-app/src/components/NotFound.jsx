import React, { Component } from "react";
import { Container } from "semantic-ui-react";

export default class NotFound extends Component {
  render() {
    return (
      <Container style={{ marginTop: "5em" }}>
        <h1>Page not found!</h1>
      </Container>
    );
  }
}
