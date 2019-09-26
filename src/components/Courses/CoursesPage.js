import React, { Component } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseList from "./CourseList";

class CoursesPage extends Component {
  componentDidMount() {
    if (this.props.courses.length === 0) {
      this.props.loadCourses().catch(error => {
        alert("Loading courses failed" + error);
      });
    }
    if (this.props.authors.length === 0) {
      this.props.loadAuthors().catch(error => {
        alert("Loading authors failed" + error);
      });
    }
  }
  render() {
    return (
      <>
        <h2>Courses</h2>
        <h3>Add Course</h3>

        <CourseList courses={this.props.courses} />
      </>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map(course => {
            return {
              ...course,
              authorName: state.authors.find(
                author => author.id === course.authorId
              ).name
            };
          }),
    authors: state.authors
  };
}

const mapDispatchToProps = dispatch => {
  return {
    loadCourses: () => dispatch(courseActions.loadCourses()),
    loadAuthors: () => dispatch(authorActions.loadAuthors())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesPage);
