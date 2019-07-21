import React, { Component } from "react";
import { Form, Button, Grid } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

export default class Period extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listOfData: {
        numberOfPeople: 0,
        startDate: new Date(),
        endDate: new Date(),
        numberOfDays: 0,
        costPerDay: 0,
        total: 0,
        people: []
      }
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.save = this.save.bind(this);
    this.calculateData = this.calculateData.bind(this);
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

  render() {
    return (
      <React.Fragment>
        <Grid.Column>
          <Form>
            <Form.Group widths="equal">
              <Form.Input
                name="numberOfPeople"
                label="Number Of People"
                placeholder="Number Of People"
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

            <Button type="button" onClick={this.props.closePeriodForm}>
              Close
            </Button>
          </Form>
        </Grid.Column>
      </React.Fragment>
    );
  }
}
