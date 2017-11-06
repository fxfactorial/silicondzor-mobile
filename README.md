# silicondzor

This is an `expo` app.

# Building

The application assume the existence of a `credentials.json` file in
the root of the application. Its structure should look like:

```
{
  "firebase":{
    "apiKey": "<YOUR-API-KEY>",
    "authDomain": "<YOUR-AUTH-DOMAIN>",
    "databaseURL": "<YOUR-DATABASE-URL>",
    "storageBucket": "<YOUR-STORAGE-BUCKET>"
  }
}
```

Do `yarn` in the root of the freshly cloned application to download
dependencies. Then to start the packager:

```
$ yarn start
```

Run on the iOS simulator with: 

```
$ yarn ios
```

Run on the ALREADY running Android simulator with

```
$ yarn android
```
