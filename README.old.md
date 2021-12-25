![Image description](https://i1.faceprep.in/ProGrad/prograd-logo.png)

# ProGrad Lab | REACT HOOKS - PROHOOKS

## Learning Goals

In this exercise, the goal is to learn routing,hooks and OKTA authentication in react:

- Axios,
- React Hooks
- OKTA Authentication

## Getting started

1. Fork this repo
2. Clone this repo

Whenever you create a first significant change, you should make your first commit.

3. Follow these [guidelines to add, commit and push changes](https://github.com/FACEPrep-ProGrad/general-guidelines-labs-project-builders.git).

In the end of this document, you will find guidelines on how to submit the exercise.

## Instructions
In this lab we will try to work with hooks in react. The main idea of this lab is to understand react hooks in detail and also fetch data from external API, process it and display it. We will also try to integrate `OKTA` authetication in our code. 
We have three components.

**Remember you cannot use hooks in class component**. All which are mentioned below are functional components.
- App Component
- HomeComponent
- Search Component

```API DETAILS
const baseUrl = 'http://openlibrary.org';
```

Kindly see the output:
![Image description](https://i1.faceprep.in/ProGrad/hooks-1.png)
![Image description](https://i1.faceprep.in/ProGrad/hooks-2.png)
![Image description](https://i1.faceprep.in/ProGrad/hooks-3.png)
![Image description](https://i1.faceprep.in/ProGrad/hooks-4.png)
![Image description](https://i1.faceprep.in/ProGrad/hooks-5.png)
![Image description](https://i1.faceprep.in/ProGrad/hooks-6.png)
### PROGRESSION 1 | PARENT COMPONENT

The app component extends both home component and search component. 

Check the output for your reference.
![Image description](https://i1.faceprep.in/ProGrad/hooks-1.png)

### PROGRESSION 2 | AUTHENTICATION USING OKTA

Real-life web applications require access control. Some parts of the application should be restricted to a limited number of users. Creating your own user management and securing your application is difficult and requires a lot of expertise. Okta allows you to set up authentication with just a few lines of code.

If you haven’t done so already, register for a free account at developer.okta.com. Select Create Free Account and fill in the forms to complete the registration process. Once you are done and logged in, you will see your Okta Developer Console.

```
Tip: You can also create an account using the Okta CLI and okta register. To create an app, run okta apps create and use the settings below.
```
This is the place where you register your application by selecting Applications > Add Application. On the next screen, choose Single Page App and click Next.
![Image description](https://i1.faceprep.in/ProGrad/okta-1.png)

On the following screen, you can edit the application settings. For React applications running in developer mode, the port number should be 3000. You also need to change the base URI to http://localhost:3000. Finally, set the Login redirect URI to http://localhost:3000/callback. Once you have completed the form, you will be given a Client ID. This needs to be pasted into your JavaScript code.
![Image description](https://i1.faceprep.in/ProGrad/okta-2.png)

To make use of Okta in your React app, open the terminal in your project directory, and install the Okta React SDK with the React router by running the following commands.
```
npm install -E @okta/okta-react@3.0.4 react-router-dom@5.2.0
```

In src/App.js, add the imports for these two packages to the top of the file.
```
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { LoginCallback, SecureRoute, Security } from '@okta/okta-react';
import { Home } from './Home';
```

The router is responsible for looking at the route part of the URL and selecting the right React component to render. To add the router to your application, replace the component returned in the render() function with the code below.

```
<div className="App">
  <Router>
    <header>
      <div>Books with Hooks</div>
      <ul className="menu"><li><Link to="/">Home</Link></li><li><Link to="/search">Search</Link></li></ul>
    </header>
    <Security issuer='https://{YourOktaDomain}/oauth2/default'
              clientId='{ClientId}'
              redirectUri={window.location.origin + '/callback'}
              pkce={true}>
      <Route path='/' exact={true} component={Home}/>
      <SecureRoute path='/search' exact={true} component={Search}/>
      <Route path='/callback' component={LoginCallback}/>
    </Security>
  </Router>
</div>
```

Here {YourOktaDomain} is your Okta developer domain. You can find this on the Okta dashboard tab. {ClientId} is the client ID that you obtained earlier when you registered the application. I have added a reference to a Home component. 


Check the output for your reference.
![Image description](https://i1.faceprep.in/ProGrad/hooks-1.png)
![Image description](https://i1.faceprep.in/ProGrad/hooks-2.png)
![Image description](https://i1.faceprep.in/ProGrad/hooks-3.png)


### PROGRESSION 3 | SIGN IN AND SIGN OUT
Implement this by creating a new file src/Home.js and use the below code as an reference.

```
import React from 'react';
import { useOktaAuth } from '@okta/okta-react';

export function Home() {
  const { authState, authService } = useOktaAuth();

  const login = () => { authService.login('/'); }
  const logout = () => { authService.logout('/'); }

  const userText = authState.isAuthenticated
    ? <div><p>You are signed in!</p><button onClick={ logout }>Logout</button></div>
    : <div><p>You need to sign in to use the application!</p><button onClick={ login }>Sign In</button></div>;

  return <div className="page-home"><h1>Welcome to Books with Hooks</h1>{ userText }</div>;
}
```

Check the output for your reference.
![Image description](https://i1.faceprep.in/ProGrad/hooks-1.png)
![Image description](https://i1.faceprep.in/ProGrad/hooks-2.png)
![Image description](https://i1.faceprep.in/ProGrad/hooks-3.png)
![Image description](https://i1.faceprep.in/ProGrad/hooks-4.png)


### PROGRESSION 4 | SEARCH 
Your task in this progression to fetch data based on the search parameter.

Check the output for your reference.
![Image description](https://i1.faceprep.in/ProGrad/hooks-6.png)


### PROGRESSION 5 | STYLES

Add the below style to your app.css.
```
.App header {
  background-color: #282c34;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: white;
  padding: 0.5rem 1rem;
}

ul.menu {
  list-style: none;
}

ul.menu li {
  display: inline;
  padding: 12px;
}

ul.menu a {
  color: #ffffff;
}

.page-home {
  text-align: center;
}

.content {
  text-align: left;
  display: inline-block;
  background-color: #ffffff;
  width: 100%;
  max-width: 1232px;
  padding: 16px;
  box-sizing: border-box;
}

h1 {
  text-align: center;
}

.books table {
  width: 100%;
}

.title-col {
  max-width: 60%;
}

.search-input {
  padding: 4px;
  text-align: center;
}

.search-input input {
  display: inline-block;
  width: 50%;
}
```

## Submission

If you didn't add, commit and push the changes you made, this is the last call. :smile:

please share your github links with your Mentors. Your Mentor's will check up your work and provide feedback. 

## Summary

If you managed to do it, good job! :trophy:

We are proud of you!

Happy Coding ProGrad ❤️!

