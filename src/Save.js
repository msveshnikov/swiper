import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import SaveIcon from "@material-ui/icons/Save";
import axios from "axios";
import fileDownload from "js-file-download";

const useStyles = makeStyles(() => ({
    icon: {
        position: "absolute",
        bottom: 0,
        left: 0,
        color: "gray",
    },
}));

const Heart = ({ url }) => {
    const classes = useStyles();

    const handleSaveClick = () => {
        axios
            .get(url, {
                responseType: "blob",
            })
            .then((res) => {
                fileDownload(res.data, "Swiper.jpg");
            });
    };

    return (
        <IconButton
            id="rewardId"
            aria-label="Like button"
            className={classes.icon}
            onTouchEnd={handleSaveClick}
            onClick={handleSaveClick}
        >
            <SaveIcon />
        </IconButton>
    );
};

export default Heart;
