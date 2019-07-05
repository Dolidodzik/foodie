import React, { Component } from 'react';
import './Home.css';

class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      pos: "NULL",
      DropDownMenuVisible: false,
    };
    this.get_position();

    this.CallHomeApiRequest = this.CallHomeApiRequest.bind(this);
  }

  /* this function sets position to got object */
  get_position(){
    navigator.geolocation.watchPosition(
      (position) => {
        // Setting state to got postion
        this.setState({
          pos: position,
        })
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 5 },
    );
  }

  CallHomeApiRequest() {
    console.log(this.state.pos)
  }

  ShowSearchOptions() {

  }


  render() {

    return (
      <div className="home_component">

        <div className="containter">
          <div className="row">

            <header className="welcome col-12 p-5">
              <h2> Welcome to the <br/>[[app name]] </h2>
            </header>
            <div className="spacer col-1"></div>
              <header className="tip_sentance col-10 p-3">
                <h4> Here you can find nearby restaurants! </h4>
              </header>
            <div className="spacer col-1"></div>


            <div className="spacer col-3"></div>
            <div className="button_wraper col-6">
              <button className="search mt-4 p-2 px-5" onClick={this.CallHomeApiRequest}>
                Search!
              </button>
            </div>
            <div className="spacer col-3"></div>

            <div className="spacer col-2"></div>
              <div className="col-8 mt-5">

                <h5 onClick={this.ShowSearchOptions}>  Search options: <span className="dropdown_arrow"> &#9660; </span> <span className="colon"> : </span> </h5>

                {
                  this.state.DropDownMenuVisible?
                  <div className="options" show={this.state.DropDownMenuVisible ? 1 : 0}>
                    location, 99999, open_now=True, keyword="pizza", maxprice=4, minprice=2
                  </div>
                :null
                }

              </div>
            <div className="spacer col-2"></div>

          </div>
        </div>

      </div>
    );
  }

}

export default Home;
