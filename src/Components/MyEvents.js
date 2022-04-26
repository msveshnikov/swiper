import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { ImageList, ImageListItem, ImageListItemBar } from "@material-ui/core";
import useInfinite from "../hooks/useInfinite";
import { getEvents } from "../utils/api";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflow: "hidden",
        backgroundColor: theme.palette.background.paper,
    },
}));

const MyEvents = ({ eventType }) => {
    const classes = useStyles();

    const [photos, setPhotos] = useState();
    const [margin] = useInfinite(10, 0.85, 5);

    useEffect(() => {
        const fetchData = async () => {
            const photos = await getEvents(eventType);
            setPhotos([...new Map(photos.map((item) => [item["photoUrl"], item])).values()]);
        };

        fetchData().catch(console.error);
    }, [eventType]);

    return (
        photos && (
            <Container component="main" maxWidth="md">
                <div className={classes.root}>
                    <ImageList rowHeight={250}>
                        {photos.slice(0, margin).map((p, index) => (
                            <ImageListItem cols={index % 5 ? 1 : 2} key={p.photoUrl.split("?")[0]}>
                                <img className={classes.photo} src={p.photoUrl.split("?")[0] + "?h=400"} alt="RR" />
                                <ImageListItemBar
                                    style={{ height: 20 }}
                                    subtitle={<span>{new Date(p?.createdAt).toLocaleDateString()}</span>}
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
            </Container>
        )
    );
};

export default MyEvents;
