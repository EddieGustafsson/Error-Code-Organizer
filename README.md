# ECO: Error Code Organizer
![Client](https://github.com/EddieGustafsson/Error-Code-Organizer/workflows/Client/badge.svg)

This project is under development, therefore some placeholder code can be found and important functions non-existent.
No public documentation will be provided as of now.

## Table of contents
* [Demo pictures](#demo-pictures)
    * [Projects](#projects)
    * [Project details](#project-details)
    * [Project activity](#project-activity)
    * [Project settings](#project-settings)
    * [Login](#login)
* [Prerequisites](#prerequisites)
    * [Node.js](#node.js)
    * [Docker](#docker)
    * [MongoDB Cluster](#mongodb-cluster)
* [Install](#install)
    * [Production build](#production-build)
    * [Development build](#development-build)

## Demo pictures
### Projects
![](https://i.imgur.com/nP45Zbs.png)

### Project details
![](https://i.imgur.com/8IhYfVO.png)

### Project activity
![](https://i.imgur.com/mFjRRt3.png)

### Project settings
![](https://i.imgur.com/MVKmRRo.png)

![](https://i.imgur.com/qxki5xF.png)

### Login
![](https://i.imgur.com/VwlJ2ax.png)

## Prerequisites
### Node.js
Download the Node.js source code or a pre-built installer for your platform [here](https://nodejs.org/en/download/).

### Docker
Install Docker by following the steps [here](https://www.docker.com/get-started).

### MongoDB Cluster
ECO application uses a mongoDB cluster, therefore you need to create your own mongoDB localy or use a [mongoDB atlas cluster](https://www.mongodb.com/download-center).

## Install
### Production build
This project is not yet fully configured to run a production build using the existing docker-compose. Although you can't run the production build via docker-compose, you can successfully run and build the individual docker container. To build a specific docker container image, do the following:

#### 1. Select a service to build
The project contains three important folders - client, server and nginx. These folders specify each ECO service and contain one file called Dockerfile.

#### 2. Build the service docker image
Run the following commands to start a container based on the selected client service:

```cd ./client```

```docker run --publish 80:80 --detach --name bb eco-client:1.0.0```

#### 3. Visit the running docker image
Visit your ECO application in a browser at localhost:80.

### Development build
To start each service in the development state follow these steps:

#### 1. Select a service to run in development state
The project contains three important folders - client, server and nginx - select and navigate into one.

#### 2. Install dependencies
Run the the following command in a command line:

```npm install```

#### 3. Setup enviroment variables
##### Client
1. Create a .env file in the client folder
2. Type the following variables in the file:
```env
REACT_APP_BASE_API=url-to-the-server
```

##### Server
1. Create a nodemon.json file in the server folder
2. Type the following variables in the file:

```json
{
    "env":{
        "MONGO_ATLAS_USERNAME": "your-username",
        "MONGO_ATLAS_PWD": "your-password",
        "HOST": "localhost",
        "PORT": "8000",
        "JWT_KEY": "your-own-jwt-key",
        "CORS_ORIGIN": "url-to-the-server"
    }
}
```

#### 4. Start the service
To start the selected service type this in a command line:

```npm start```
