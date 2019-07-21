import React, { Component } from "react";
import { Form, Button, Segment } from "semantic-ui-react";

export default class TalentDetail extends Component {
  render() {
    return (
      <Segment>
        <Form>
          <Form.Group unstackable widths={2}>
            <Form.Input
              name="name"
              label="First name"
              placeholder="First name"
              onChange={this.props.onValueChange}
            />
            <Form.Input
              name="lastName"
              label="Last name"
              placeholder="Last name"
              onChange={this.props.onValueChange}
            />
          </Form.Group>
          <Form.Group widths={2}>
            <Form.Input
              name="currentJob"
              label="Current Job"
              placeholder="Current Job"
              onChange={this.props.onValueChange}
            />
            <Form.Input
              name="company"
              label="Company"
              placeholder="Company"
              onChange={this.props.onValueChange}
            />
          </Form.Group>
          <Form.Group widths={2}>
            <Form.Input
              name="phone"
              label="Phone"
              placeholder="Phone"
              onChange={this.props.onValueChange}
            />
            <Form.Input
              name="email"
              label="Email"
              placeholder="Email"
              onChange={this.props.onValueChange}
            />
          </Form.Group>

          <Form.TextArea
            label="Experience"
            name="experienceDescription"
            placeholder="Tell us more about you..."
            onChange={this.props.onValueChange}
          />

          <Button type="submit" onClick={this.props.save}>
            Add Talent
          </Button>
          <Button type="button" onClick={this.props.closeDetailForm}>
            Close
          </Button>
        </Form>
      </Segment>
    );
  }
}
