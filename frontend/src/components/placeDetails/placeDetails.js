import React, {Component} from 'react';
import './placeDetails.css'

/* Importing axois */
import axios from 'axios';

/* Importing animations */
import Fade from 'react-reveal/Fade';

/* Imporintg lightbox */
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';


import Gallery from 'react-grid-gallery';


export default class placeDetails extends Component {

    getInitialState(){
      /* Getting data from api */
      this.GetDetailsFromApi();
    }

    constructor(props) {
      super(props);
      this.state ={
        data: "initial_value",
        ReviewsVisible: false,
        GalleryShown: false,
      }
    }

    /* This function handles clicks of reviews header */
    ReviewsHeaderClick() {
      let value = this.state.ReviewsVisible;
      this.setState({
        ReviewsVisible: !value
      })
    }

    GalleryHeaderClick(){
      let value = this.state.GalleryShown;
      this.setState({
        GalleryShown: !value
      })
      this.GetGalleryLinks();
    }

    GetGalleryLinks(){

      console.log("GET GALLERY :LINKS")

      /* Getting ID of requested place */
      let place_id = this.props.location.state.PlaceId;

      /* Setting up URL */
      let url = "http://localhost:8000/api/image_gallery/"+place_id;

      /* Requesting my backend to get images links list */
      /* Requesting my backend */
      axios({
        method: 'get',
        url: url,
        headers: {
          "content-type": "application/json"
        }
      }).then((response) => {

        /* Getting data */
        let data = response.data[0].json_data;

        let final_data = [];

        for (var i = 0; i < data.length; i++) {
            //console.log(data[i]);
            /* Every photo will be represented by one object with various propeties  */
            let object = new Object();

            /* Setting propeties under names that are compatible with "react-grid-gallery" library  */
            object.src = data[i].img_url.substring(17);
            object.thumbnailWidth = data[i].width;
            object.thumbnailHeight = data[i].height;
            object.thumbnail = data[i].img_url;

            /* Setting up id/number of image */
            object.image_number = i;

            /* pushing set data */
            final_data.push(object);
        }
        console.log(final_data)
        /* Sending got data to sessionStorage as JSON string, and setting details to correct one */
        localStorage.setItem("place_gallery_data", JSON.stringify(final_data));
        let images = JSON.parse(localStorage.getItem("place_gallery_data"));
        console.log(images)

      }).catch(function (error) {
        console.log(error)
      });
      this.forceUpdate()
    }

    BackToPlacesList(){
      /* Changing view and sending data */
      console.log(this.props.location.state.PlacesListData)
      this.props.history.push({
        pathname: '/placesList',
        state: {
          WhatToLoad: null,
          PlacesListData: this.props.location.state.PlacesListData,
        }
      })
    }

    render() {

      /* Setting data */
      let data = this.props.location.state.PlaceDetailsData;
      console.log(data)
      let images = JSON.parse(localStorage.getItem("place_gallery_data"));
      console.log(images);


      const IMAGES =
      [{
              src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
              thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
              thumbnailWidth: 320,
              thumbnailHeight: 174,
              isSelected: true,
              caption: "After Rain (Jeshu John - designerspics.com)"
      },
      {
              src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
              thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
              thumbnailWidth: 320,
              thumbnailHeight: 212,
              tags: [{value: "Ocean", title: "Ocean"}, {value: "People", title: "People"}],
              caption: "Boats (Jeshu John - designerspics.com)"
      },

      {
              src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
              thumbnail: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
              thumbnailWidth: 320,
              thumbnailHeight: 212
      }]


      /* This function returns html with reviews */
      function Reviews(props) {

          const content = props.reviews.map((review) =>
            <div key={review.id} className="mt-5">

                <header>
                  <h4 id={review.place_id} onClick={review.getComponent}> {review.name} </h4>
                </header>
                <div className="info mt-3 px-4">
                  <a href={review.author_url} target="_blank"> {review.author_name} </a> <br/>
                  <div className="mt-2"> {review.text} </div> <br/>
                  <div> <b>Rating:</b> {review.rating} </div> <br/>
                </div>

            </div>
          );

        return (
          <div>
            {content}
          </div>
        );
      }

      return (
        <div className="place_details_component">
          <div className="containter">
            <div className="row">

                <div className="spacer col-1"></div>
                  <header className="col-10 p-3 py-5">
                    <h2> Details of
                      <div className="place_name"> {data.name}!</div>
                    </h2>
                  </header>
                <div className="spacer col-1"></div>

                <a onClick={this.BackToPlacesList.bind(this)} className="col-12 mt-3" href=""> Back to places list! </a>
                <a href={"/"} className="col-12 mb-4"> Back to home! </a>


                <div className="col-12"> <b>Address:</b> {data.vicinity} </div>
                <div className="col-12"> <b>Website:</b> {data.website} </div>
                <div className="col-12"> <b>Phone:</b> {data.formatted_phone_number} </div>
                <div className="col-12 mb-5"> <b>Excat address:</b> {data.formatted_address} </div>


                <div className="col-12"> <b>Rating:</b> {data.rating} </div>
                <div className="col-12"> <b>Number of ratings:</b> {data.user_ratings_total} </div>
                <div className="col-12" onClick={this.ReviewsHeaderClick.bind(this)}>
                  <b>Reviews:</b>
                  { this.state.ReviewsVisible && <span className="up_arrow"> &#9650; </span> }
                  { !this.state.ReviewsVisible && <span className="dropdown_arrow"> &#9660; </span> }
                </div>
                <Fade when={this.state.ReviewsVisible}>
                  { this.state.ReviewsVisible &&
                    <Reviews reviews={data.reviews} className="" getComponent={this.getComponent}/>
                  }
                </Fade>

                <header className="col-12 mt-5 px-5" onClick={this.GalleryHeaderClick.bind(this)}>
                  <span className="gallery_header"> Photos linked with this place: </span>
                  { this.state.GalleryShown && <span className="up_arrow"> &#9650; </span> }
                  { !this.state.GalleryShown && <span className="dropdown_arrow"> &#9660; </span> }
                </header>


                <div className="col-12">
                  <Gallery images={IMAGES}/>
                </div>

            </div>
          </div>
        </div>
      );
    }

  }
