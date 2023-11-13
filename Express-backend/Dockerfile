FROM node:18-alpine
RUN npm install -g typescript
RUN npm install -g nodemon
RUN npm install -g ts-node
WORKDIR /usr/src/app
COPY package*.json .
#RUN npm install --production --silent && mv node_modules ../
RUN npm install && mv node_modules ../
COPY . .

# ENV PORT=8080
# ENV SECRET_KEY_JWT=$2b$10$bgidTQ6HczZumkDHZ828seKHHh2LyIt3OWmt5gBDoIE6nlXMkq2I
# ENV MONGO_URI=mongodb+srv://enrique:elmejor89@clusterguille.4in3fwr.mongodb.net/VET?retryWrites=true&w=majority
# ENV SIGNATURE_COOKIE=7ed15c64cf2cc2585fd0c2021a1d451daf8cfcca50516a24893d034e706a570caf3803709dcb756a96cbf64be16
# ENV EMAIL_USER=enriquecidoxd@gmail.com
# ENV EMAIL_PASS=cyfsfvkjmmblvaqq
# ENV GOOGLE_LOGIN_CLIENT_ID=850582077900-1pnhh814tlfksukviimbola4r1c5r996.apps.googleusercontent.com
# ENV GOOGLE_LOGIN_CLIENT_SECRET=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
EXPOSE 8080
# RUN chown -R node /usr/src/app
# USER node
USER root
RUN chmod -R 777 /usr/src/app/src/public
USER node
# CMD ["npm", "run", "dev"]
