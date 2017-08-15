import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions/index';

class PostsNew extends Component {
  renderField(field) {
    //const { meta: { touched, error } } = field;
    //^^ can be used so that instead of field.meta.touched - it could just be touched
    //pulling meta off the field object, and touched and error off the meta object
    const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input {...field.input}
               type="text"
               className="form-control" />
        <div className="text-help">
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    )
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });

  }

  render() {
    //lecture 137
    const { handleSubmit } = this.props;
    // ?? const handleSubmit = this.props.handleSubmit;

    return (
      <div>
        <h3>Create a new post</h3>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field name="title"
                 label="Title"
                 component={this.renderField} />
          <Field name="categories"
                 label="Categories"
                 component={this.renderField} />
          <Field name="content"
                 label="Content"
                 component={this.renderField} />
          <button type="submit" className="btn btn-secondary">Save</button>
          <Link to="/" className="btn btn-secondary">Cancel</Link>
        </form>
      </div>
    );
  }
}

function validate(values) {
  //console.log(values); // {object of values entered into the form}
  const errors = {};

  //validate inputs from 'values'
  if(!values.title) {
    errors.title = "Enter a title";
  }

  if(!values.categories) {
    errors.categories = "Enter at least one category";
  }

  if(!values.content) {
    errors.content = "Enter some content";
  }

  //if errors is empty reduxForms will assume the form is fine to submit
  //but if there are properties - reduxForms assumes form is invalid
  return errors;
}

export default reduxForm({
  form: 'PostsNewForm',
  validate: validate
})(
  connect(null, { createPost })(PostsNew)
);
