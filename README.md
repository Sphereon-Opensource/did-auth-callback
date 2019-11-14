# did-auth-callback
Test Microservice that receives and displays the signed JWT token

## How it works
Start the server by running `npm start`  
This will return a link that must be added to the `callbackUrl` of a Disclosure request in combination with `/callback`  
Once the Disclosure Response has been sent out via the mobile phone the home page can be refreshed to find the JWT Token.  
