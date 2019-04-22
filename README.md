


<div style="width:100%">
	<div style="width:50%; display:inline-block">
		<p align="center">
		<img align="center" width="180" height="180" alt="" src="https://github.com/cometchat-pro/ios-swift-chat-app/blob/master/Screenshots/CometChat%20Logo.png">	
		</p>	
	</div>	
</div>

CometChat Web Reactjs Push Notifications sample app (built using **CometChat Pro**) is a sample app capable of recieve and send push notification for **user** and **group** messaging. 

## Table of Contents


1. [Screenshots](#Screenshots)

2. [Config Development Environment](#Config-your-Development-Environment)

2. [Config Chat App](#Config-Chat-App)

3. [Run the Sample](#Run-the-Demo-App)

4. [Contributing](#Contributing)


  
## Screenshots

<img align="center" src="https://github.com/cometchat-pro/web-reactjs-push-notifications-app/blob/master/screenshots/screenshot1.png" style="width:75%;"/>
<p align ="center"> Fig : Sending Push notification interface </p>
<br></br>
<img align="center" src="https://github.com/cometchat-pro/web-reactjs-push-notifications-app/blob/master/screenshots/screenshot2.png" style="width:75%;"/>
	<p align ="center"> Fig : Notification receieved  </p>
<br></br>


## Config Development Environment

Setup your development environment for **Reactjs** Sample. 

If you don't have node install, Please download appropriate version from official website: [Nodejs.org](https://nodejs.org/)

Once node and npm is installed successfully. You can verify from running following  command : 
```bash

node -v

```
```bash

npm -v

```


Now you are ready to sync application dependencies.  Please follow the following steps:



1. Install packages 

  

```bash

npm install

```

Please Check **package.json** file for the dependency list. 

<br></br>
  

## Config Chat App

If you want to put some changes into the demo app, you should build it using `webpack`. 
demo app uses Webpack version : 4+

> To know more about Webpack, visit Webpack official documentation : [HERE](https://webpack.js.org/concepts/)
  
Please change  `appId` and `apiKey` in *src/js/lib/cometchat/ccmanager.js* to the provided credentials.

 ![Studio Guide](https://github.com/CometChat-Pulse/javascript-reactjs-chat-app/blob/master/screenshots/code.png)   

<br></br>

## Run the Demo App


1. Test the demo app 

You can test the demo app with local server by running the following command.

```bash

npm run dev

```

Navigate to **localhost:5050** to check sample app.  You can update host in **package.json** file.   
  

2. Build the sample

  

When the modification is complete, you'll need to bundle the file using `webpack`. The bundled files are created in the `test` folder.

Please check `webpack.config.js` for settings.
  

```bash

npm run build

```

<br></br>

# Contribute 

Feel free to make a suggestion by creating a pull request.

