import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import { Talents } from "./Talents";

export default class Home extends Component {
  render() {
    return (
      <Container style={{ margin: "5em", textAlign: "left" }}>
        <Talents />
      </Container>
    );
  }
}
