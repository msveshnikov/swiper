import React, { Component } from "react";

import "./App.css";

const IMG_WIDTH = 400;
const IMG_HEIGHT = 700;

class App extends Component {
    wheelTimeout;
    transitionTimeout;
    lastTouch = 0;
    state = {
        imgs: [
            "https://images.unsplash.com/photo-1599832110430-da30b996c917?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
            "https://images.unsplash.com/photo-1600804889194-e6fbf08ddb39?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
            "https://images.unsplash.com/photo-1616891170504-77c9805e3357?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
            "https://images.unsplash.com/photo-1591592744991-4c43b3367b30?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
        ],
        currentIndex: 0,
        movement: 0,
        transitionDuration: "0s",
    };

    componentWillUnmount = () => {
        clearTimeout(this.transitionTimeout);
    };

    handleTouchStart = (e) => {
        this.lastTouch = e.nativeEvent.touches[0].clientX;
    };

    handleTouchMove = (e) => {
        const delta = this.lastTouch - e.nativeEvent.touches[0].clientX;
        this.lastTouch = e.nativeEvent.touches[0].clientX;

        this.handleMovement(delta);
    };

    handleTouchEnd = () => {
        this.handleMovementEnd();
        this.lastTouch = 0;
    };

    handleWheel = (e) => {
        clearTimeout(this.wheelTimeout);
        this.handleMovement(e.deltaX);
        this.wheelTimeout = setTimeout(() => this.handleMovementEnd(), 100);
    };

    handleMovement = (delta) => {
        clearTimeout(this.transitionTimeout);

        this.setState((state) => {
            const maxLength = state.imgs.length - 1;

            let nextMovement = state.movement + delta;

            if (nextMovement < 0) {
                nextMovement = 0;
            }

            if (nextMovement > maxLength * IMG_WIDTH) {
                nextMovement = maxLength * IMG_WIDTH;
            }

            return {
                movement: nextMovement,
                transitionDuration: "0s",
            };
        });
    };

    handleMovementEnd = () => {
        const { movement, currentIndex } = this.state;

        const endPosition = movement / IMG_WIDTH;
        const endPartial = endPosition % 1;
        const endingIndex = endPosition - endPartial;
        const deltaInteger = endingIndex - currentIndex;

        let nextIndex = endingIndex;

        if (deltaInteger >= 0) {
            if (endPartial >= 0.1) {
                nextIndex += 1;
            }
        } else if (deltaInteger < 0) {
            nextIndex = currentIndex - Math.abs(deltaInteger);
            if (endPartial > 0.9) {
                nextIndex += 1;
            }
        }

        this.transitionTo(nextIndex, Math.min(0.5, 1 - Math.abs(endPartial)));
    };

    transitionTo = (index, duration) => {
        this.setState({
            currentIndex: index,
            movement: index * IMG_WIDTH,
            transitionDuration: `${duration}s`,
        });

        this.transitionTimeout = setTimeout(() => {
            this.setState({ transitionDuration: "0s" });
        }, duration * 100);
    };

    render() {
        const { currentIndex, movement, transitionDuration, imgs } = this.state;
        const maxLength = imgs.length - 1;
        const maxMovement = maxLength * IMG_WIDTH;

        return (
            <div className="App">
                <div
                    className="main"
                    style={{
                        width: `${IMG_WIDTH}px`,
                        height: `${IMG_HEIGHT}px`,
                    }}
                    onTouchStart={this.handleTouchStart}
                    onTouchMove={this.handleTouchMove}
                    onTouchEnd={this.handleTouchEnd}
                    onWheel={this.handleWheel}
                >
                    <div
                        className="swiper"
                        style={{
                            transform: `translateX(${movement * -1}px)`,
                            transitionDuration: transitionDuration,
                        }}
                    >
                        {imgs.map((src) => {
                            // eslint-disable-next-line jsx-a11y/alt-text
                            return <img key={src} src={src} width="100%" height="100%" />;
                        })}
                    </div>
                    {movement !== 0 && (
                        <button
                            className="back move"
                            onClick={() => {
                                this.transitionTo(currentIndex - 1, 0.5);
                            }}
                        >
                            ←
                        </button>
                    )}
                    {movement !== maxMovement && (
                        <button
                            className="next move"
                            onClick={() => {
                                this.transitionTo(currentIndex + 1, 0.5);
                            }}
                        >
                            →
                        </button>
                    )}
                </div>
            </div>
        );
    }
}

export default App;
