# nodejs-jwt sample application setup 

'''
    npm init -y
    npm i express jsonwebtoken dotenv
    npm i --save-dev nodemon

'''

##  Update package.js  tp start 
'''
    "scripts": { 
        "devstart": "nodemon server.js",
        "devStartAuth": "nodemon authServer.js"
    }
'''


## Create token using at node shell
require('crypto').randomBytes(64).toString('hex')

