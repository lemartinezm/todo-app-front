# TDT App Front

Simple ToDo App built with TypeScript, React and Chakra UI. Built for the final project of the OpenBootcamp React course. More information in the Features section.

## Table of contents
  - [Quick Start](#quick-start)
    - [Installation](#installation)
    - [Usage](#usage)
  - [Features](#features)
  - [Preview](#preview)
  - [License](#license)

## Quick Start

### Installation
1. Clone it:
    ```
    $ git clone https://github.com/lemartinezm/todo-app-front
    ```

2. Go into the project directory and run the command:
    ```
    $ npm install
    ```

3. For run in dev mode:
    ```
    $ npm run dev
    ```

For other scripts, check the package.json file.

### Usage

Before execution, you need to create an ".env" file in the root path of the project. This file should include (as shown):

```
VITE_API_URL = http://localhost:8000/api
```

- VITE_API_URL: for connection with backend.


Finally, don't forget to initialize your backend.

## Features
The features implemented are:
- Users registration
- Login
- CRUD for ToDos

For future versions:
- Add teams: include the possibility for teams creation and share ToDos between users that belongs to the team.
- CRUD for teams
- Create tests

## Preview
For preview, visit the [Deploy on Vercel](https://todo-app-front-six.vercel.app/).

## License
[MIT](LICENSE)