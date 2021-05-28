# Progressive Web Apps
Progressive web apps are web applications built with technologies that make them behave like native apps. A benefit of progressive web apps is the ability to work smoothly when network coverage is unreliable. Also, unlike native apps, no installation is required, but they are faster than typical web apps.

[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

## Angular Starting From Scratch
First let’s create a new project by using Angular CLI on your system. Using Angular CLI 1.5 (which is the current version) is not sufficient in this case as service worker support for Angular 5 is added in version 1.6. If you haven’t installed Angular CLI 1.6 on your system yet you can do so by using the following command:

```sh
$ npm install -g @angular/cli@next
```
Next, a new project can be created with by using command:
```sh
$ ng new angularpwa --service-worker
```
A new directory angularpwa is created, the project template is downloaded and dependencies are installed automatically. Furthermore the Angular 5 service worker functionality is activated and the package @angular/service-worker is installed as part of the dependencies.
You can check that the service worker activation was done by opening file .angular-cli.json and search for the following configuration setting:
```sh
"serviceWorker": true
```
This is telling Angular CLI to add a service worker when building the application.

## Trying Out The Default Service Worker
Let’s try out the default service worker.
If you’re starting up the development web server with
```sh
$ ng serve
```
and check the Application tab in the Chrome Developer Tools you’ll notice that no service worker is active. The reason is that Angular CLI is not activating the servicer worker when we’re in development mode. Instead you first have to build your application for production by using:
```sh
$ ng build --prod
```
The production build of the application is made available in the dist subfolder. To make the content of the dist server available via a web server you can use any static web server like http-server.

Now you can start http-server right inside the dist folder:
```sh
$ http-server
```
