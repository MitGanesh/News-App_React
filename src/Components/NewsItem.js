import React, { Component } from 'react'

export class NewsItem extends Component {
  // constructor(){
  //   super();
  // }

  render() {
    let { title, description , imgUrl , newsUrl } = this.props;
    return (
      <div className="my-2">
        <div className="card" style={{ width: "18rem" }}>
          <img src={imgUrl?imgUrl:"https://static.tnn.in/thumb/msid-92842078,imgsize-100,width-1280,height-720,resizemode-75/92842078.jpg"} className="card-img-top" alt="" />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem