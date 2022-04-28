# Swiper

Photo sliding app.
Just swipe to next photo, or double tap to like :)

Demo:
https://swiper.ml/

# Server setup (just for fun :)

-   adjust server/config.js
-   install docker, docker-compose
-   cd server
-   docker build . -t extender777/swiper
-   docker push extender777/swiper

On server:

-   adjust docker-compose.yml
-   docker-compose up -d
-   Nginx reverse proxy to 4000

Or:

-   use GitHab Actions (create secrets)

TODO:

-   containerize Nginx

Nginx config:

    server {
        server_name swiper.ml www.swiper.ml;
        root /var/www/html;
        index index.html index.htm;

        location /api/ {
        proxy_pass	http://localhost:4000/;
        }

        location / {
            try_files $uri $uri/ =404;
        }

    }

