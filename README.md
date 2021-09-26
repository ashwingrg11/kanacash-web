# Transfa Pay (SPA)

**Transfa Pay (SPA)** is the online money transfer web app which allows you to transfer money from USA to the other countries. This web application offers you the convenience of sending money instantly and securely from various payment methods to all major banks and agents.

© 2020. All Rights Reserved.

## Technology Stack
- React

## Getting Started
- Clone the repo and run `npm install` or `yarn install` in the root of the folder.
- Copy .env.example file and rename it to .env
- Run `npm start` command to run the app.

## Prerequisites

```sh
- Node, Watchman
- Npx
- Web browser
```

## Built With
- [Create React App](https://github.com/facebook/create-react-app).
- [Npm](https://www.npmjs.com/) - Dependency Management

## Dependencies

```sh
"@testing-library/jest-dom": "^4.2.4",
"@testing-library/react": "^9.3.2",
"@testing-library/user-event": "^7.1.2",
"axios": "^0.19.2",
"enzyme": "^3.11.0",
"enzyme-adapter-react-16": "^1.15.2",
"prop-types": "^15.7.2",
"react": "^16.13.1",
"react-dom": "^16.13.1",
"react-redux": "^7.2.0",
"react-router-dom": "^5.2.0",
"react-scripts": "3.4.1",
"react-test-renderer": "^16.13.1",
"redux": "^4.0.5",
"redux-devtools-extension": "^2.13.8",
"redux-thunk": "^2.3.0",
"styled-components": "^5.1.1"
```
## Folder Structure

```sh
machnet-spa/
|-- src/
    |-- assets/
    |-- components/
    |-- config/
    |-- containers/
    |-- pages/
    |-- services/
    |-- store/
    |-- utils/
    |-- routes.js
```
Each of these directories have special types of files and logics:

**` assets/ `**\
The assets folder contains images, relevant files and css folder for styling. In this project architecture, we are using global styling with CSS file. CSS styles via styled components will be included in each component. We should consider locating a default or shared styling here.

**` components/ `**\
The components folder contains a collection of UI Stateless components. Shouldn't store state. Most components in this directory will be function-based components. Stuff like buttons, inputs, labels and all presentational components goes here. This components can also accept functions as props and dispatch events, but no state should be held inside.\
Each component has a test file to help us maintain them because they used widely in the project.

**` config/ `**\
Configuration files in this folder provide an easy way to set options required by parts of our application to work. It basically detects the current environment of the project from .env file and configures accordingly. 

**` containers/ `**\
It contains a reusable components that used in the pages.\
The difference is that components in containers folder reflect parts of a page, like footer, sidebar, and header, while the components folder contains standalone UI components like button, form, or input field.\
Sometime, A component here in containers can use some components from the components folder.

**` pages/ `**\
The pages folder reflects the routes of the application. Each component inside this folder has its own route.\
A page component will contain children from components folder, containers folder, or its own subfolder. It has its own state, and usually call some services as well.

**` services/ `**\
Most of the time, a service used to manage API integrations. So, it is separated from logic in the component.\
Service is not a react component. It is simply a javascript function to manage API integration based on the type of data/configurations and returns axios instance.

**` store/ `**\
Inside it, there are actions and reducers subfolder to manage redux states.\
Mostly, the actions and reducers will be called in the page components so they usually named based on pages that use them. Action creators and redux thunk will handle the asynchronous http requests.

**` utils/ `**\
The utils folder is just a place to locate some utility functions that used repeatedly in the project. Files in the utils folder should only contain some functions like date formatting, string conversion, etc.

**` routes.js `**\
All routes of the appliction are defined here in routes component, which are located in the src/ directory. These routes are assigned to the pages and serve the associated page components.

## Running the tests
-

## Test files

## ToDos