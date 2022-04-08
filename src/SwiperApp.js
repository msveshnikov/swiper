// import the axios package
import axios from "axios";
// import the react-tinder-card package
import TinderCard from "react-tinder-card";
// import the react and a component
import React, { Component } from "react";
// import the uuid package
import { v4 as uuid } from "uuid";

class SwiperApp extends Component {
    //add a constructor
    constructor() {
        // add super to call the parent constructor
        super();
        // add state
        this.state = {
            photos: [],
            sessionId: uuid(),
            isLiked: false,
        };
        // add the click events
        this.handlePhotoClick = this.handlePhotoClick.bind(this);
        // the details method invoked when an image is clicked
        this.showImageDetails = this.showImageDetails.bind(this);
    }
}
