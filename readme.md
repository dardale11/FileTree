# File Viewer - Akamai CSI – Frontend Home Assignment

## Introduction

This project is a file viewer application built using the Angular framework and Express.js. It provides a tree structure view of files and folders and allows users to search for items within the file system.

## Design

### Client Side

The client-side of the application utilizes Angular Material for the UI components, including the Tree component. The file tree structure is represented by the `FileSystemNode` interface, which consists of properties like `type` (either 'Folder' or 'File'), `name`, and `children` (an array of `FileSystemNode`).

To optimize performance, the client-side implements a caching mechanism using the Cache Service. It helps reduce unnecessary server requests by storing previous search results.

Additionally, the application incorporates a debounce strategy for the search functionality. It delays the API call until the user finishes typing, preventing unnecessary partial or unwanted requests.

The Angular app follows a modular structure with the following components:

- Container Component: Contains the SearchBar and TreeView components.
- SearchBar Component: Renders the search input field and triggers the search functionality.
- TreeView Component: Displays the file system tree structure using the Angular Material Tree component.

The app is designed with mobile responsiveness in mind and includes CSS media queries for optimal viewing on different screen sizes.

### Server Side

The server provides a single API endpoint `/files` that accepts a query parameter `q` for filtering. The filtering method iterates over the file tree and returns items whose names have a prefix that matches the query.

## Installation

To install and run the project, follow these steps:

1. Clone the repository: `git clone https://github.com/dardale11/file-viewer.git`
2. Change to the client directory: `cd client/file-viewer`
3. Install dependencies: `npm install`
4. Start the client: `ng serve`
5. Change to the server directory: `cd ../../server`
6. Install dependencies: `npm install`
7. Start the server: `node server.js`
8. View the app at `http://localhost:4200`
