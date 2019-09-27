import React, { Component } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";
import Spinner from "../Common/Spinner";

class CoursesPage extends Component {
  state = {
    redirectToAddCoursePage: false
  };
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
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2>Courses</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add Course
            </button>
            <CourseList courses={this.props.courses} />
          </>
        )}
      </>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
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
    authors: state.authors,
    loading: state.apiCallsInProgress > 0
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
