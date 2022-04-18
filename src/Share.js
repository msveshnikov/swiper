import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import ShareIcon from "@material-ui/icons/Share";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import Fab from "@material-ui/core/Fab";
import CheckIcon from "@material-ui/icons/Check";
import submitEvent from "./api";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        position: "absolute",
        bottom: 0,
        left: 70,
        alignItems: "center",
        opacity: 0.6,
    },
    wrapper: {
        margin: theme.spacing(1),
        position: "relative",
    },
    buttonSuccess: {
        backgroundColor: green[500],
        "&:hover": {
            backgroundColor: green[700],
        },
    },
    fabProgress: {
        color: green[500],
        position: "absolute",
        top: -6,
        left: -6,
        zIndex: 1,
    },
}));

const Share = ({ url }) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
    });

    const urlToFile = async (url) => {
        const response = await fetch(url);
        const blob = await response.blob();
        return new File([blob], `Swiper-${new Date().toISOString()}.jpeg`, { type: blob.type });
    };

    const handleShareClick = async () => {
        if (!navigator.share) {
            return;
        }
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            const file = await urlToFile(url);
            setSuccess(true);
            setLoading(false);
            submitEvent(url, "share");
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                navigator.share({
                    files: [file],
                    title: "Photo",
                    text: "Check out this photo",
                    url: "https://swiper.ml/",
                });
            }
        }
    };

    return (
        <div className={classes.root}>
            <div className={classes.wrapper}>
                <Fab
                    aria-label="Share photo"
                    className={buttonClassname}
                    onTouchEnd={handleShareClick}
                    onClick={handleShareClick}
                >
                    {success ? <CheckIcon /> : <ShareIcon />}
                </Fab>
                {loading && <CircularProgress size={68} className={classes.fabProgress} />}
            </div>
        </div>
    );
};

export default Share;
