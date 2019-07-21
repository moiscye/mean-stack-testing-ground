import React, { Component } from "react";
import {
  Header,
  Form,
  Segment,
  Button,
  Grid,
  Divider
} from "semantic-ui-react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import Period from "./Period";
export default class Utils extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listOfData: {
        typeOfBill: "",
        startDate: new Date(),
        endDate: new Date(),
        numberOfDays: 0,
        costPerDay: 0,
        total: 0,
        numberOfPeriods: 3
      },
      showPeriodForm: false
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    //this.save = this.save.bind(this);
    this.calculateData = this.calculateData.bind(this);
    this.showPeriodForm = this.showPeriodForm.bind(this);

    this.closePeriodForm = this.closePeriodForm.bind(this);
  }

  onValueChange(e, { value, name }) {
    const listOfData = Object.assign({}, this.state.listOfData, {
      [name]: value
    });
    this.setState({ listOfData }, this.calculateData);
  }

  handleChange(date, name) {
    const listOfData = Object.assign({}, this.state.listOfData, {
      [name]: date
    });
    this.setState({ listOfData }, this.calculateData);
  }
  calculateData() {
    const listOfData = Object.assign({}, this.state.listOfData);

    const start = moment(listOfData.startDate);
    const end = moment(listOfData.endDate);

    const numberOfDays = end.diff(start, "days") + 1;

    const costPerDay = listOfData.total / numberOfDays;

    listOfData["costPerDay"] = Math.round(costPerDay * 100) / 100;
    listOfData["numberOfDays"] = numberOfDays;

    this.setState({ listOfData });
  }

  showPeriodForm() {
    this.setState({ showPeriodForm: true });
    //return  Array.from(Array(this.state.listOfData.numberOfPeriods)).map((x, index) => <Period closePeriodForm={this.closePeriodForm} key={index} />)
  }

  closePeriodForm() {
    //this.calculateData();
    this.setState({ showPeriodForm: false });
  }
  render() {
    const options = [
      { key: "e", text: "Electricity", value: "Electricity" },
      { key: "g", text: "Gas", value: "Gas" },
      { key: "w", text: "Water", value: "Water" },
      { key: "i", text: "Internet", value: "Internet" }
    ];
    console.log(this.state.listOfData.numberOfPeriods);

    const periods = Array.from(
      Array(this.state.listOfData.numberOfPeriods)
    ).map((x, index) => {
      console.log("coming here");
      return <Period closePeriodForm={this.closePeriodForm} key={index} />;
    });

    return (
      <React.Fragment>
        <Segment style={{ margin: "6em", textAlign: "left" }}>
          <Header icon>Bill Splitter</Header>
          <Grid columns={2} stackable>
            <Divider vertical />
            <Grid.Row verticalAlign="middle">
              <Grid.Column>
                <Form>
                  <Form.Group widths="equal">
                    <Form.Select
                      name="typeOfBill"
                      label="Type Of Bill"
                      options={options}
                      placeholder="Type Of Bill"
                      onChange={this.onValueChange}
                      value={this.state.listOfData.typeOfBill}
                    />
                    <Form.Input
                      name="total"
                      label="Total"
                      placeholder="Total"
                      onChange={this.onValueChange}
                    />
                  </Form.Group>
                  <Form.Group widths="equal">
                    <Form.Field>
                      <label>From:</label>

                      <DatePicker
                        selected={this.state.listOfData.startDate}
                        onChange={date => this.handleChange(date, "startDate")}
                      />
                    </Form.Field>

                    <Form.Field>
                      <label>To:</label>
                      <DatePicker
                        selected={this.state.listOfData.endDate}
                        onChange={date => this.handleChange(date, "endDate")}
                      />
                    </Form.Field>
                  </Form.Group>

                  <Form.Group widths="equal">
                    <Form.Field>
                      <label>{`Number of days: ${
                        this.state.listOfData.numberOfDays
                      }`}</label>
                    </Form.Field>
                    <Form.Field>
                      <label>{`Cost Per Day: ${
                        this.state.listOfData.costPerDay
                      }`}</label>
                    </Form.Field>
                  </Form.Group>

                  <Form.Group widths="equal">
                    <Form.Field>
                      <Form.Input
                        name="numberOfPeriods"
                        label="Number Of Periods to Add?"
                        placeholder="Enter number of periods to add"
                        onChange={this.onValueChange}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Button type="button" onClick={this.showPeriodForm}>
                        Add Periods
                      </Button>
                    </Form.Field>
                  </Form.Group>
                </Form>
              </Grid.Column>
            </Grid.Row>
            {/* <Grid.Row>
            <Grid.Column>
              {this.state.showPeriodForm && (
                <Period closePeriodForm={this.closePeriodForm} />
              )}
            </Grid.Column>
          </Grid.Row> */}
          </Grid>
        </Segment>
        <div>
          <Grid columns="three" divided>
            <Grid.Row>{this.state.showPeriodForm && periods}</Grid.Row>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}
