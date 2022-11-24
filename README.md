# Pokelist

## App requirements:

Make a web app using Laravel + Vue with the following requirements:
- User Authentication and Sign-up
- Once the user is logged in, they will see all the available pokemon from https://pokeapi.co/ API
- The user can choose their favorite pokemon from the list of pokemon.
- The user can choose 3 pokemon that they like.
- The user can choose 3 pokemon that they hate.
- The user can see the list of other users, their favorite liked, and hated pokemon.
- The project must then be contained in a git repository (Github/GitLab/bitbucket/etc.).
- The user must be able to update his first name, last name, and birthday.
- Feel free to add more fields that you like.
- Feel free to create your own design (showcase your design skills)
- Feel free to choose the CSS/front-end UI library of your choice.


## Local Development

### Requirements:

- Docker & docker-compose
- nvm or nodejs v14 or higher

### Setup

- After cloning repo
- cd into the project root folder, then inside `laradock`
- Execute following syntaxes unto the terminal

```
$ docker-compose build nginx mysql workspace php-fpm
$ docker-compose up -d nginx mysql workspace php-fpm
$ docker-compose exec workspace bash
$ npm run dev (while inside the container)
```
