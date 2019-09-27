import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";

function ManageCoursePage(props) {
  useEffect(() => {
    if (props.courses.length === 0) {
      props.loadCourses().catch(error => {
        alert("Loading courses failed" + error);
      });
    }
    if (props.authors.length === 0) {
      props.loadAuthors().catch(error => {
        alert("Loading authors failed" + error);
      });
    }
  }, []);

  return (
    <>
      <h2>Manage Courses</h2>
    </>
  );
}

ManageCoursePage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    courses: state.courses,
    authors: state.authors
  };
}

const mapDispatchToProps = {
  loadCourses: courseActions.loadCourses,
  loadAuthors: authorActions.loadAuthors
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCoursePage);
