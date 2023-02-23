# React Project

### Task: Create a Pokedex website

Create a website that lists all the pokemons, and when you select a pokemon you'll be able to see his stats.
You will also need to create a simple form that will ask the user for full name and birth date before he can access the content of the website.

API BASE URL: **https://pokeapi.co/api/v2/** 
**Example of a request**:
```
Method -> GET 
URL With Params ->  https://pokeapi.co/api/v2/pokemon?limit=1118 # This will get you a json of all pokemons that exist in the API.
```

For more details about how the api works - **https://pokeapi.co/docs/v2**


#### How To Get Started
***
1) Create a new React project with typescript using ``npx create-react-app pokedex --template typescript``
2) You should be a collaborator in this Repo. Please create a branch with your name and push there your work. also create a Pull Request from your branch into main branch. 
3) Upload your code to codesandbox and post the link in your pr, so we can see the deployed product.

#### Technologies required for this task 
***
- **React**
- **Typescript**
- **Chakra UI**
- **React Router**


#### Tasks
***
- [x] **Form** Create a form page that contains 2 pages 
  - [x] First page asks the user for **Full Name**
  - [x] Second page asks the user for **Birth Date**
  - [x] All data should be saved inside **Local Storage**!
  - [x] If the user only completed the step of **Full Name** he should always be redirected to **Birth Date** page (even if he manipulates the url string)
  - [x] After the user completed to fill in the details redirect him to pokemons list page!
- [x] **Pokemon List** Create a page that lists all the pokemons
  - [x] Display All Pokemons Only 12 Pokemons A Page!, should all be displayed and spread nicely
  - [x] Have pagination so a user can move between pages and see all the different kinds of pokemons
  - [x] Make sure the website is responsive!
  - [x] Add an option to select a specific pokemon to see all of the details about this pokemon => Everything you need is located in the API and in the   docs, for information to show on the pokemon check Notes.3
  - [x] Add A Search bar that filters by pokemon names


#### Notes
***
1) Based on **Local Storage** you should decide if to show the **Full Name** route, if **Local Storage** contains **Full Name**, show the **Birth Date** route, only if both properties exists in **Local Storage**, show the **Pokemons List** route.
2) **In this repository you will find  snapshots from a demo app I created, you can use them as reference for how your should app be structured** 
3) **You can find the pokemon image in the pokemon object under the property of ``sprites.front_default``**
4) **Information you need to show about the pokemon: ``Health,Weight,Abilites,Stats`` (You can reference the ``modal_screen.png`` file located in this github repo)**
5) On load you should fetch with one call all the pokemons index data [{id, url}] . this way when you work per page (pagination) you can fetch some urls only of the pokemons you want to show in this page.
6) Use prettier as code formatter. (Better to add es-lint as well)
7) Don't use ts-ignore.
8) Don't use any type.

### Design
https://www.figma.com/proto/6Q1kG7P3kZZq6kPjx0KbTh/Pokemon?page-id=0%3A1&node-id=301%3A7&viewport=241%2C48%2C0.32&scaling=min-zoom&starting-point-node-id=301%3A7

### Design Editor
https://www.figma.com/file/6Q1kG7P3kZZq6kPjx0KbTh/Pokemon?node-id=301%3A7

