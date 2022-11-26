<<<<<<< HEAD
# ReservationSystem
UH Computer Science project for a restaurant's reservation system - Group 15

DEV GUIDE

Installation:

    1 ) Install git - https://git-scm.com/downloads
        git --version

    2) If using VSCode, install extensions:
        GitHub
        GitHub Pull Requests and Issues
        Live Server

    3) In the bottom left, click the profile icon and sign into GitHub

    4) Change your default terminal to git bash
        Ctrl + Shift + P -> Terminal: Select Default Shell -> Git Bash


Git Hub:

    SETUP

    1 ) Set your global variables
        git config --global user.name "<username>"
        git config --global user.email "<email>"

    2 ) Need help with an action?
        git help <verb>

    3 ) Open terminal through VSCode in your parent directory, your path should look like:
        C://something/Coding

    4 ) Clone our remote repository to your parent directory
        git clone https://github.com/CobyWalters/ReservationSystem

    5 ) Open your project directory
        cd ReservationSystem
        
    5 ) Create a .gitignore file to specify local files not intended for pushing (optional)
        touch .gitignore

    STAGING AREA (building your commit)

    1 ) View the status of your staging area
        git status
    
    2 ) Add a specific file to the staging area
        git add filename
    
    3 ) Add all files to the staging area (except the ones specified in .gitignore)
        git add -A

    4 ) Remove  a file from the staging area
        git reset filename
    
    5 ) Remove all files from the staging area
        git reset
    
    6 ) View your changes to the code
        git diff

    7 ) Once you are happy with your staging area, initialize a commit
        git commit -m "<commit_message>"

    BRANCHES
    1 ) Create a branch for your desired featu
        git branch <branch_name>
    
    2 ) Designate that as your current working branch
        git checkout <branch_name>

    3 ) View all (local and remote) branches
        git branch -a

    PUSHING CHANGES

    1 ) Pull any new changes from the main branch before pushing
        git pull origin main

    2 ) To push your branch to the main branch:
        git push -u origin <branch_name>

    3 ) To push the entire local repository:
        git push origin main

    FINALLY

    1 ) To stop tracking this project with git:
        rm -rf .git


Local Host:

    1 ) Local host (https://localhost:5000)
        nodemon app.js 
=======
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
>>>>>>> ff12b80fdb7635baaf3d66884b8b55ada2dde937
