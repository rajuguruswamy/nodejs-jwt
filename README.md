# nodejs-jwt

npm init -y
npm i express jsonwebtoken dotenv
npm i --save-dev nodemon


package.js 
"scripts": { 
 "devstart": "nodemon server.js",
}


## create token using at node shell
require('crypto').randomBytes(64).toString('hex')

