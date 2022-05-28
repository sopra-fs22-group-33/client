# SoPra FS22 - Client Template

## Getting started

Read and go through these Tutorials. It will make your life easier!

- Read the React [Docs](https://reactjs.org/docs/getting-started.html)
- Do this React [Getting Started](https://reactjs.org/tutorial/tutorial.html) Tutorial (it doesn’t assume any existing React knowledge)
- Get an Understanding of [CSS](https://www.w3schools.com/Css/), [SCSS](https://sass-lang.com/documentation/syntax), and [HTML](https://www.w3schools.com/html/html_intro.asp)!

Next, there are two other technologies that you should look at:

* [react-router-dom](https://reacttraining.com/react-router/web/guides/quick-start) offers declarative routing for React. It is a collection of navigational components that fit nicely with the application. 
* [react-hooks](https://reactrouter.com/web/api/Hooks) let you access the router's state and perform navigation from inside your components.

## Prerequisites and Installation
For your local development environment, you will need Node.js. You can download it [here](https://nodejs.org). All other dependencies, including React, get installed with:

```npm install```

Run this command before you start your application for the first time. Next, you can start the app with:

```npm run dev```

Now you can open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Notice that the page will reload if you make any edits. You will also see any lint errors in the console (use Google Chrome).

### Testing
Testing is optional, and you can run the tests with `npm run test`.
This launches the test runner in an interactive watch mode. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

> For macOS user running into a 'fsevents' error: https://github.com/jest-community/vscode-jest/issues/423

### Build
Finally, `npm run build` builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance: the build is minified, and the filenames include hashes.<br>

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).


> Thanks to Lucas Pelloni and Kyrill Hux for working on the template.


# shift planner SoPra FS22 Group 33

## Introduction
Many teams who are working in shifts are still using hand made plans to organize their work. This takes a lot of time for the team leader, who has to create the plan. The team members have to check the physical plan for changes on a regular basis. The goal of this project is to provide a software system which supports this process. A team leader can create a base plan where the team members get assigned automatically. Team members get their working plan directly into their calendars, and they can post their prefered shifts directly into the system. In case of a conflict, the team members can sort it
out in real time.

## Technologies
- Java 15 
- Gradle
- Spring Boot
- Sonarqube 
- Heroku
- Sendgrid e-mail API 
- optimizer lpsolve 
## High-level components


## Launch & Deployment

## Illustrations
In your client repository, briefly describe and illustrate the main user flow(s) of your interface. How does it work (without going into too much detail)? Feel free to
include a few screenshots of your application.

## Roadmap
- [ ] automated finalizing of calendars
- [ ] shift swaps
- [ ] individual constraints for team members (working hours per week, number of jokers etc.) 
- [ ] export calendar as .ics
- [ ] E-Mail validation
## Authors and acknowledgement
shift planner is created by vmjulia, UpstairsForest, eoeaee and grueezi

thanks to maettuu for guiding us through the semester. 

thanks to the SoPra team for your support and providing a cool course! 

## License
GNU GENERAL PUBLIC LICENSE Version 3 or later


