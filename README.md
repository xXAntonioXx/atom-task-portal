# atom-task-portal

atom-task-portal is a simple task-todo web application built with Angular and deployed on Firebase Hosting. The app allows users to manage their tasks efficiently with user authentication powered by Firebase.

## Features

- **User Authentication:** Secure sign-up, login, and logout using Firebase Auth.
- **Task Management:** Create, edit, and delete tasks in a user-friendly interface.
- **Real-Time Updates:** Tasks are stored and updated in real-time using Firebase.
- **Responsive Design:** Works seamlessly on desktop and mobile devices.

## Tech Stack

- **Frontend:** Angular
- **Authentication & Hosting:** Firebase

## Getting Started

### Prerequisites

- Node.js & npm
- Angular CLI (`npm install -g @angular/cli`)
- Firebase CLI (`npm install -g firebase-tools`)

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/xXAntonioXx/atom-task-portal.git
    cd atom-task-portal
    ```
2. Install dependencies:
    ```sh
    npm install
    ```

### Development

To run the app locally:

```sh
ng serve
```

Visit `http://localhost:4200` in your browser.

### Deployment

To deploy to Firebase Hosting:

```sh
firebase deploy --only hosting
```

## Project Structure

- `src/app/` - Main Angular application code
- `src/environments/` - Environment configuration files
- `public/` - Static assets for Firebase Hosting

## License

This project is licensed under the MIT License.
