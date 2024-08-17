
# LMS Demo


## Demo Video for Front End

https://drive.google.com/file/d/1Ctmzbt9eJoBvroGfv-XYNktMtEzC-2wm/view?usp=sharing

## Code Link for Backend 

https://github.com/varungidwani91/tutor_app/tree/main

## Prerequisites
- Node.js (version compatible with the project)
- Yarn package manager

## Installation

1. Clone the repository: https://github.com/prabeer451/courseapp_frontend.git

2. Install dependencies:
```bash
yarn install
```
3. To start the development server:
```bash
yarn start
```
This command builds the app for production to the `build` folder.

## Additional Scripts

- `yarn preview`: Runs the built app in preview mode
- `yarn lint`: Runs the linter to check for code style issues
- `yarn lint:fix`: Automatically fixes linter issues where possible
- `yarn prettier`: Formats the code using Prettier

## Technologies Used

- React 18.x
- Material-UI (MUI) 5.x
- Redux Toolkit
- React Router 6.x
- Formik
- Axios
- ApexCharts
- Emotion (for styling)

## Configuration

The main configuration file is located at `src/config.js`. You can modify settings such as:

- Default path: '/login'
- Font family: 'Public Sans', sans-serif
- Language: 'en'
- Theme mode: 'light'
- Color preset: 'default'
- Theme direction: 'ltr'

## API Configuration

API endpoints can be configured in `src/api/menu.js`. The current setup includes:

```javascript
export const endpoints = {
  key: 'api/menu',
  master: 'master',
  dashboard: '/dashboard' // server URL
};


This command runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Building for Production

To create a production build:

yarn build
