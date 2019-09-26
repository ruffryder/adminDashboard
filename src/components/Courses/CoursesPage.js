import React, { Component } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from "prop-types";

class CoursesPage extends Component {
  state = {
    course: {
      title: ""
    }
  };

  handleChange = e => {
    const course = { ...this.state.course, title: e.target.value };
    this.setState(prevState => {
      return { ...prevState, course };
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.createCourse(this.state.course);
    this.setState({
      course: { title: "" }
    });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Courses</h2>
        <h3>Add Course</h3>
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.course.title}
        />
        <input type="submit" value="Save" />
        {this.props.courses.map(course => {
          return <div key={course.title}>{course.title}</div>;
        })}
      </form>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  createCourse: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    courses: state.courses
  };
}

const mapDispatchToProps = dispatch => {
  return {
    createCourse: course => dispatch(courseActions.createCourse(course))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesPage);
