# Conscious Game Engine Content Tool

The conscious content tool is a tool to create content in the form of a data structure that can be imported by the conscious game engine to create thought-driven point-and-click adventure games. The game engine can be found as a [GitHub repository](https://github.com/waackph/conscious-game) and a prototype game created with the conscious game engine and the conscious content tool can be seen on the [itch.io-project page](https://waackph.itch.io/getting-up-is-hard).

## Quickstart

After running setup.

Start backend (folder backend-project): `npm run app`

Start frontend (folder frontend-project): `npm start`

Print/export mongodb (in python): `python3 check_mongodb_collection.py <collection_name> <print||export>`<br>
Example: `python3 check_mongodb_collection.py rooms export`

### Assumed folder structure for a game

The assets are in `frontend-project/public/static/`. In that folder the tree may be as follows:

```
clear_out/
    rooms/
        dining_room/
            backgrounds/
            objects/
            characters
        living_room/
            backgrounds/
            objects/
            characters
        corridor/
            backgrounds/
            objects/
            characters
```

## General explanation of conscious game engine objects

The conscious game engine has 3 different types of general objects in the world:
1. rooms: A closed part of the game. Rooms are connected by door-items. A room has items and characters and a background.
2. items: An item is an object in a room that can be interacted with in some way. 
3. characters: A character is something that can at least say something, but can also run a dialog with the protagonist.

Note, that items and characters are things. Things in its abstract form are not much more than sprites represented in the game world. Hence, a background of a room is a thing. Everything that is more important in the world and has more functionality in a room is either an item or character.
Also, both, items and characters, must have a Thought-Graph, that leads to some interaction.

See more about the content-tool on the itch.io-project page [here](https://waackph.itch.io/conscious-content-tool).

An examplary created data structure is `conscious_content_data_mod.json`. It contains the content of the prototype game [getting up is hard](https://waackph.itch.io/getting-up-is-hard).

## Setup

### react

(Source of code: https://reactjs.org/tutorial/tutorial.html)

Start a new project with pre setup: `npx create-react-app game-content-tool`

`npm install --save react-router-dom`

`npm install --save axios`

Axios is a lightweight HTTP client based similar to a Fetch API. Axios is a promise-based async/await library for readable asynchronous code. We can easily integrate with React, and it is effortless to use in any front-end framework.<br>
-> We’ll call our APIs through Axios.

If host error, add local variable: HOST=localhost

Start using `npm start` Or: `yarn start`

### Express & NodeJS

(Source: https://blog.logrocket.com/mern-stack-tutorial/)

`npm i express mongoose body-parser bcryptjs validation`

- bcryptjs is a password hashing function designed by Niels Provos and David Mazières
- body-parser allows us to get the data throughout the request
- express is our main framework
- mongoose is used to connect/interact with MongoDB
- validation (as its name implies) is used for validation

`npm i -D nodemon`
- nodemon is a utility that will monitor for any changes in your source and automatically restart your server.

Modify package.json so nodemon will update server side stuff if some code changed.

Add `app.js` File and set port and index route entry point.

To interact with react frontend and dont vandalate CORS policy `npm install cors` needs to be installed.

Execute express application: `npm run app`

### MongoDB

Docker instance of mongo db: `docker run -d --name conscious_db -p 127.0.0.1:5012:27017 -v /home/phil/Desktop/stuff/projects_game/06_Game_Implementation/Game-Content-Tool/backend-project/conscious_db_data:/data/db -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=rootpw mongo:5.0.5`
