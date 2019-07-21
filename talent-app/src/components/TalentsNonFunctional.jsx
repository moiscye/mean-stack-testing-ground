import React, { Component } from "react";
import {
  Segment,
  Container,
  Header,
  Divider,
  Grid,
  Table,
  Button,
  Icon
} from "semantic-ui-react";
import TalentDetail from "./TalentDetail";
export default class Talents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      talentList: [],
      talentObject: {},
      showDetailForm: false
    };
    this.openDetailForm = this.openDetailForm.bind(this);
    this.closeDetailForm = this.closeDetailForm.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.loadData = this.loadData.bind(this);

    this.saveTalent = this.saveTalent.bind(this);
  }

  componentWillMount() {
    this.loadData();
  }

  async loadData() {
    const result = await fetch("http://localhost:8000/api/talent/");
    const talentList = await result.json();
    this.setState({ talentList });
  }

  openDetailForm() {
    this.setState({ showDetailForm: true });
  }
  closeDetailForm() {
    this.setState({ showDetailForm: false });
  }

  async saveTalent() {
    const data = Object.assign({}, this.state.talentObject);
    console.log(data);
    await fetch("http://localhost:8000/api/talent/", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    this.loadData();
    this.closeDetailForm();
  }

  onValueChange(e) {
    const talentObject = Object.assign({}, this.state.talentObject, {
      [e.target.name]: e.target.value
    });
    this.setState({ talentObject });
  }

  render() {
    let talentTable = this.state.talentList.map((talent, index) => {
      return (
        <Table.Row key={index}>
          <Table.Cell>{` ${talent.name} ${talent.lastName}`}</Table.Cell>
          <Table.Cell> {talent.currentJob} </Table.Cell>
          <Table.Cell> {talent.company} </Table.Cell>
        </Table.Row>
      );
    });
    return (
      <Container style={{ margin: "5em", textAlign: "left" }}>
        <Button type="button" onClick={this.openDetailForm}>
          <Icon name="add" />
          Add new{" "}
        </Button>
        {this.state.showDetailForm && (
          <TalentDetail
            openDetailForm={this.openDetailForm}
            closeDetailForm={this.closeDetailForm}
            onValueChange={this.onValueChange}
            save={this.saveTalent}
          />
        )}
        <Segment style={{ marginTop: "5em" }}>
          <Header as="h2" floated="right">
            List of Applicants
          </Header>

          <Divider clearing />
          <Grid columns="equal" textAlign="center">
            <Grid.Column as="h3">
              Click to see full details of applicants
            </Grid.Column>
            <Grid.Column width={12}>
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell> Full Name</Table.HeaderCell>
                    <Table.HeaderCell>Position</Table.HeaderCell>
                    <Table.HeaderCell>Company</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>{talentTable}</Table.Body>
              </Table>
            </Grid.Column>
          </Grid>
        </Segment>
      </Container>
    );
  }
}
