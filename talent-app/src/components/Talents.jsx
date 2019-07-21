import React, { useState, useEffect } from "react";

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

export const Talents = () => {
  const [talentList, setTalentList] = useState([]);
  const [talentObject, setTalentObject] = useState({});
  const [showDetailForm, setShowDetailForm] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const result = await fetch("http://localhost:8000/api/talent/");
    const talentList = await result.json();
    setTalentList(talentList);
  }

  const saveTalent = async () => {
    const data = Object.assign({}, talentObject);
    console.log(data);
    await fetch("http://localhost:8000/api/talent/", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    loadData();
    setShowDetailForm(false);
  };

  const onValueChange = e => {
    const talentObject2 = Object.assign({}, talentObject, {
      [e.target.name]: e.target.value
    });
    setTalentObject(talentObject2);
  };

  const openDetailForm = () => setShowDetailForm(true);

  const closeDetailForm = () => setShowDetailForm(false);

  let talentTable = talentList ? (
    talentList.map((talent, index) => (
      <Table.Row key={index}>
        <Table.Cell>{` ${talent.name} ${talent.lastName}`}</Table.Cell>
        <Table.Cell> {talent.currentJob} </Table.Cell>
        <Table.Cell> {talent.company} </Table.Cell>
      </Table.Row>
    ))
  ) : (
    <div>loading...</div>
  );

  return (
    <Container style={{ margin: "5em", textAlign: "left" }}>
      <Button type="button" onClick={openDetailForm}>
        <Icon name="add" />
        Add new{" "}
      </Button>
      {showDetailForm && (
        <TalentDetail
          openDetailForm={openDetailForm}
          closeDetailForm={closeDetailForm}
          onValueChange={onValueChange}
          save={saveTalent}
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
};
