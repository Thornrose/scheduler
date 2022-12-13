# Interview Scheduler

This project was our first deep-dive into using the react library / framework, and also a major bump in testing experience, writing unit, integration, and end-to-end tests with Jest and Cypress. We explored many key concepts of using react, including but not limited to JSX, useState, useEffect, and custom hooks. While the design / CSS was provided for us, the Scheduler project proved to be another great exercise in modular coding and full-stack development.

![scheduler-main](https://raw.githubusercontent.com/Thornrose/scheduler/master/docs/scheduler-main.png)
![scheduler-form](https://raw.githubusercontent.com/Thornrose/scheduler/master/docs/scheduler-form.png)
![scheduler-cypress-testing](https://raw.githubusercontent.com/Thornrose/scheduler/master/docs/scheduler-cypress-testing.png)

## Setup

- Clone this repo.
- From the provided [scheduler API](https://github.com/lighthouse-labs/scheduler-api), clone the repo and follow the readme steps .
- In both the scheduler and scheduler-api directories, install dependencies with `npm install`.
- From the API directory, start the API in one of two modes:
  - `npm start` will start the API functioning as normal.
  - `npm run error` will start the API but force errors to test error handling.
- From the scheduler directory, start the scheduler app (in a separate console window) with `npm start`.
  - to run jest test suites, use command `npm test`.
  - to run storybook, use command `npm run storybook`.
