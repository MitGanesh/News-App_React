import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps = {
    country: 'in',
    category : 'general'
  }

  static propTypes = { 
    country: PropTypes.string,
    category : PropTypes.string,
  }

  constructor() {
    super();
    this.state = {
      article: [],
      loading: false,
      page: 1,
    }
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=75c223c05e974a1ea991754a7946ff2a`;
    this.setState({loading : true})
    let response = await fetch(url);
    let data = await response.json();
    // console.log(data);

    this.setState({
      article: data.articles,
      totalResults: data.totalResults,
      loading: false
    })
  }

  handlePrevClick = async () => {
    // console.log("Previous");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=75c223c05e974a1ea991754a7946ff2a&page=${this.state.page - 1}&pageSize=20`;
    this.setState({loading : true})
    let response = await fetch(url);
    let data = await response.json();
    // console.log(data);
    
    this.setState({
      page: this.state.page - 1,
      article: data.articles,
      loading : false
    })
  }

  handleNextClick = async () => {
    // console.log("Next");
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / 20))) {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=75c223c05e974a1ea991754a7946ff2a&page=${this.state.page + 1}&pageSize=20`;
      this.setState({loading : true})
      let response = await fetch(url);
      let data = await response.json();
      console.log(data);

      this.setState({
        page: this.state.page + 1,
        article: data.articles,
        loading : false
      })
    }
  }

  render() {
    return (
      <div className="container my-3">
        <center>
          <h2 style={{margin: '30px 0px'}}>Newsweek - Top Headlines</h2>
          {this.state.loading && <Spinner/>}
        </center>
        <div className="row">
          {!this.state.loading && this.state.article.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title ? element.title.slice(0, 44) : ""} description={element.description ? element.description.slice(0, 104) : ""} imgUrl={element.urlToImage} newsUrl={element.url} />
            </div>
          })}
        </div>
        <div className="container d-flex justify-content-between my-3">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 20)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News