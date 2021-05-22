# Steps:- https://www.electronjs.org/docs

    1. npm init -> starts from main.js
    2. install electron as devDependecies -> npm i -D electron
    3. Add in scripts -> "start":"electron .",
    4. create main.js
    5. Start the project -> npm start

# Note:

    - if any dependency occur error like:
        - Must use import to load ES Modules
    - then we can try to decrease the module version. It may re resolved

# To build

    * Windows:
        - npm run package-win
     * Mac:
        - npm run package-mac
     * Linux:
        - npm run package-linux

# Electron React:
    - my_style: (electron-react-starter)
	- npx create-react-app [app_name]
	- npm install electron concurrently wait-on cross-env
	- npm run electron:serve

    - brad-simple electron react
    - create-react-app -> not recommended
    - electron forge
    - electron-react-boilerplate
