# ExpressJs_Postgres

# --> Installation Setup

# step 1: In Terminal

    -- cd project_folder

    -- npm init -y

    -- npm install express cors dotenv helmet morgan compression pg

    -- npm install -D nodemon

# step 2: create a file (server.js)

project_folder/
│
├── node_modules/
│
├── package-lock.json
├── package.json
│
└── server.js


# step 3: Edit package.json
    In package.json file, 
        -- change the "main":"index.js" to "server.js"
        -- Add "type": "module"
        Inside the "scripts" : {
            -- Add "start" and "dev"
        }
    as shown as below: -->

{
  "main": "server.js",  
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
}

