# GitHub Repository Explorer

GitHub Repository Explorer is a React application that allows users to search for GitHub users and view their repositories.

## Demo
[GitHub Repository Explorer](https://github-repo-explorer.netlify.app)

## Features

- Search for up to 5 users with a username similar to the entered value.
- Display repositories for the selected GitHub user.
- View repository details such as name, description, and stars.
- Simple and intuitive user interface.

## Technologies Used

- React: JavaScript library for building user interfaces.
- React Bootstrap: Bootstrap components for React.
- Axios: Promise-based HTTP client for making API requests.
- React Toastify: Toast message to show errors
- GitHub REST API: Used for retrieving user and repository data.

## Getting Started

Follow these instructions to get the project up and running on your local machine:

1. Clone the repository:

   ```shell
   git clone https://github.com/fatanaminullah/github-repository-explorer.git
   cd github-repository-explorer
   npm install
   ```

2. Install the dependencies:

    ```shell
    npm install
    ```

3. Set up the GitHub API access token:

- Visit https://github.com/settings/tokens and generate a new personal access token with the public_repo scope.
- Create a new file named .env.local in the project's root directory.
- Add the following line to the .env.local file, replacing <your-token> with your personal access token:

  ```shell
  REACT_APP_GITHUB_TOKEN=<your-token>
  ```

4. Start the development server:

    ```shell
    npm start
    ```
5. Open your browser and navigate to http://localhost:3000 to access the application.

