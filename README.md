# Frontend
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


# Backend

The backend is built using AWS Amplify. In order to run the backend locally, you need to install the Amplify CLI. You can do this by running the following command:

```bash
npm install -g @aws-amplify/cli
```

Once you have the CLI installed, you need to configure it to use your AWS account. You can do this by running the following command:

```bash
amplify configure
```

This will open a browser window where you can login to your AWS account. Once you have logged in, you will need to create a new IAM user. You can do this by clicking on the "Create new user" button. You will need to give the user a name and select "Programmatic access" as the access type. On the next screen, you will need to select "Attach existing policies directly" and then select "AdministratorAccess" from the list of policies. On the next screen, you will need to copy the access key ID and secret access key. You will need to paste these into the terminal window where you ran the `amplify configure` command. You will also need to enter a region name and a user name. You can use the default values for these. Once you have entered all of the information, you will need to run the following command:

```bash
amplify init
```

This will create a new Amplify project in your AWS account. You can now run the following command to start the backend:

```bash
amplify mock
```

This will start the backend on port 20002. You can now run the following command to start the frontend:

```bash
npm start
```

