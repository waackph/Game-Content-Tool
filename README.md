
# Setup

## react

(Source of code: https://reactjs.org/tutorial/tutorial.html)

Start a new project with pre setup: `npx create-react-app game-content-tool`

`npm install --save react-router-dom`

`npm install --save axios`

Axios is a lightweight HTTP client based similar to a Fetch API. Axios is a promise-based async/await library for readable asynchronous code. We can easily integrate with React, and it is effortless to use in any front-end framework.<br>
-> We’ll call our APIs through Axios.

If host error, add local variable: HOST=localhost

Start using `npm start` Or: `yarn start`

## Express & NodeJS

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

## MongoDB

`docker run -d --name conscious_db -p 127.0.0.1:5012:27017 -v /home/phil/Desktop/stuff/projects_game/06_Game_Implementation/Game-Content-Tool/backend-project/conscious_db_data:/data/db -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=rootpw mongo:5.0.5`

# Syntax and Rules

- To add state, add a constructor to a component class with this.state which is a dictionary holding changable variables

-----------

Begin auto-generated readme

-----------

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
