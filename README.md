# User Management App

## Overview

This project is a User Management application built using React, Redux, and Axios. It allows users to create, edit, delete, and view user details. The app fetches data from a mock API provided by [JSONPlaceholder](https://jsonplaceholder.typicode.com/).

## Features

- **User Listing**: Displays a table of users fetched from the API.
- **Create User**: A modal form to create a new user.
- **Edit User**: A modal form to edit existing user details.
- **Delete User**: Confirmation modal to delete a user.
- **User Details**: A detailed view of individual user information.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Redux**: A predictable state container for JavaScript apps, used to manage user data.
- **Axios**: A promise-based HTTP client for the browser and Node.js.
- **React Router**: For navigation and routing between components.
- **React Toastify**: For displaying notifications.
- **Tailwind CSS**: For styling and responsive design.

## Folder Structure
# File Structure of User Management App

## src/
- **components/**  
  Contains reusable components used throughout the app.
  - **CreateModal.js**  
    Modal for creating a new user.
  - **DeleteModal.js**  
    Modal for confirming the deletion of a user.
  - **EditModel.js**  
    Modal for editing user details.
  - **shimmer/**  
    Folder for the shimmer loading component.
    - **Shimmer.js**  
      Component that displays a loading placeholder.
  - **UserDetail.js**  
    Component for displaying detailed information about a user.

- **pages/**  
  Contains page components representing different routes.
  - **Home.js**  
    Main page showing the user list.
  - **UserDetails.js**  
    Page for displaying a specific user's details.

- **redux/**  
  Contains Redux-related files.
  - **store.js**  
    Configures the Redux store.
  - **userSlice.js**  
    Redux slice for managing user state.

- **App.js**  
  Main application component that sets up routes.

- **index.js**  
  Entry point of the application, responsible for rendering the app.

- **index.css**  
  Global styles for the application.

