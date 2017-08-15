import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSinglePost, deletePost } from '../actions/index';
import { Link } from 'react-router-dom';

class PostsShow extends Component {
  componentDidMount() {
    //provided by react-router, params lists wildcard tokens inside url (:id)
    const { id } = this.props.match.params;
    this.props.fetchSinglePost(id);
  }

  onDeleteClick() {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }

  render() {
    //posts[this.props.match.params.id]; -- the post we want to show
    //this.props === ownProps
    const { post } = this.props;

    if(!post) {
      return <div>Loading ... </div>;
    }

    return (
      <div>
        <Link to="/" className="btn btn-secondary">Back To Index</Link>
        <button className="btn btn-secondary pull-xs-right"
                onClick={this.onDeleteClick.bind(this)}>
          Delete
        </button>

        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

//first argument is application state
// second argument is ownProps - props object that is going to PostsShow
function mapStateToProps({ posts }, ownProps) {
  return {post: posts[ownProps.match.params.id]};
}


export default connect(mapStateToProps, { fetchSinglePost, deletePost })(PostsShow);