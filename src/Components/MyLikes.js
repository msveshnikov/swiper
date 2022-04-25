import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import useInfinite from "../hooks/useInfinite";
import { getLikes } from "../utils/api";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflow: "hidden",
        backgroundColor: theme.palette.background.paper,
    },
    photo: {
        cursor: "pointer",
    },
    icon: {
        color: "rgba(255, 255, 255, 0.54)",
    },
}));

const MyLikes = () => {
    const classes = useStyles();

    const [photos, setPhotos] = useState();
    const [margin] = useInfinite(10, 0.85, 5);

    useEffect(() => {
        const fetchData = async () => {
            setPhotos(await getLikes());
        };

        fetchData().catch(console.error);
    }, []);

    return photos ? (
        <Container component="main" maxWidth="md">
            <div className={classes.root}>
                <GridList cellHeight={250}>
                    {photos.slice(0, margin).map((p, index) => (
                        <GridListTile cols={index % 5 ? 1 : 2} key={p.photoUrl.split("?")[0]}>
                            <img className={classes.photo} src={p.photoUrl.split("?")[0] + "/250x250"} alt="RR" />
                            <GridListTileBar subtitle={<span>{new Date(p?.createdAt).toLocaleDateString()}</span>} />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        </Container>
    ) : null;
};

export default MyLikes;
