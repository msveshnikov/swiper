FROM  node:18-alpine 

ENV NODE_ENV production

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

# If you are building your code for production
RUN npm ci --only=production

EXPOSE 4000
CMD [ "node", "index.js" ]
