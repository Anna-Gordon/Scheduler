# Interview Scheduler
  The Scheduler is a single page application(SPA) built with React. The client application communicates with an API server over HTTP, using the JSON format.
  
  UI components developed using Storybook. High test coverage includes Unit, Integration and E2E tests.

![Screenshot of booking interview form] (https://github.com/Anna-Gordon/Scheduler/blob/master/docs/bookInterviewForm.png?raw=true)
![Screenshot of confirmation onDelete] (https://github.com/Anna-Gordon/Scheduler/blob/master/docs/confirmOnDelete.png?raw=true)
![Screenshot of error message] (https://github.com/Anna-Gordon/Scheduler/blob/master/docs/error.png?raw=true)
## Setup

1. Install dependencies using the `npm install` command
2. Fork and clone the scheduler-api into a new directory and follow the README.md instructions to configure and run the API server
3. Navigate your browser to http://localhost:8000

## Running Webpack Development Server

```sh
npm start
```
## Running scheduler-api Server

development mode
```sh
npm start
```
error mode
```sh
npm run error
```
test mode
```sh
npm run test:server
```

## Running Jest Test Framework

```sh
npm test
```

## Running Cypress Test Framework

```sh
npm run cypress
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Libraries

- React
- Webpack, Babel
- Axios, Classnames
- Storybook, Jest, Testing Library, Cypress
