# Welcome to my NextJS shop

## Project idea

This is a simple learning project that I made with the intention to get into TypeScript. It's a simple shop, using which you can:

1. Register
2. Login
3. Browse and filter products
4. Search for products
5. Add products to cart
6. Change website theme

## Tech Stack

### Front-end

For the front-end I'm using [NextJS](https://nextjs.org/) with styled-components for the styles and TypeScript.

### Back-end

For the back-end I'm using NextJS's [API Routes](https://nextjs.org/docs/api-routes/introduction).

1. Validation- [Joi](https://github.com/sideway/joi)
2. Database - [Sqlite](https://www.npmjs.com/package/sqlite3)
3. Password hashing - [Bcrypt](https://www.npmjs.com/package/bcrypt)
4. Sessions - [JWT](https://github.com/auth0/node-jsonwebtoken)

## Why did I choose that specific tech stack?

### Front-end

Well, firstly I'm a ReactJS developer and this project was made with the intention for me to learn TypeScript. Then I chose styled-components, because I like the flexibility it gives me while writing CSS and at the same time both the logic and the style is in the same file, which makes it easy to read and understand.

### Back-end

I chose [API Routes](https://nextjs.org/docs/api-routes/introduction), since it's already integrated into NextJS and at the same time I don't have a lot of requirements, since the project was not meant to scale. Then for the database I chose Sqlite, since I only need a small database.

## Front-end 

### File structure

1. Components - `/components`
2. Context API - `/context`
3. Styles - `/styles`
4. Pages - `/pages`
5. Types - `/types`

## Back-end 

### File structure

1. API routes - `/pages/api`
2. Migrations - `/migrations`
3. Initial - `./database.js`
4. Database - `./database.sqlite`

### Server status codes

1. `success` - The operation was successful
2. `db-error` - There was an error in the database
3. `{something}-exists` - The thing we are trying to add already exists in the database
4. `invalid-data` - The data we are providing does not match the required data
5. `invalid-email` - There is no such user
6. `invalid-password` - User exists, but the password is wrong
7. `updated` - Databse item updated
8. `deleted` - Database item deleted


