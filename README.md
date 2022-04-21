# Swiper

Photo sliding app.
Just swipe to next photo, or double tap to like :)

Demo:
https://swiper.ml/

# Server setup

* adjust server/config.js
* install docker, docker-compose
* cd server
* docker build . -t extender777/swiper
* docker push extender777/swiper    

On server:

* adjust docker-compose.yml
* docker-compose up -d
* NGINX reverse proxy to 4000