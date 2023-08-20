import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import PlayIcon from "@material-ui/icons/PlayCircleFilled";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import Fab from "@material-ui/core/Fab";
import CheckIcon from "@material-ui/icons/Check";
import { getVideo } from "./Cards";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        position: "absolute",
        bottom: 0,
        left: 0,
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

const Open = ({ url }) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
    });

    const handleOpenClick = async () => {
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            const video = await getVideo(url);
            window.open(video);
            setSuccess(true);
            setLoading(false);
        }
    };

    return (
        <div className={classes.root}>
            <div className={classes.wrapper}>
                <Fab
                    aria-label="Save button"
                    className={buttonClassname}
                    onTouchEnd={handleOpenClick}
                    onClick={handleOpenClick}
                >
                    {success ? <CheckIcon /> : <PlayIcon />}
                </Fab>
                {loading && <CircularProgress size={68} className={classes.fabProgress} />}
            </div>
        </div>
    );
};

export default Open;
