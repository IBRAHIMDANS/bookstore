# BookStore

<p align="center">
 <img src="./public/logo.jpg" width='200px'  alt="Logo" />
</p>

## Description

BookStore is a  application that allows you to manage your books. You can add, edit, delete, and search for books. You can also add books to your favorite list.

This turborepo uses [pnpm](https://pnpm.io) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `ui`: a stub React component library shared by both `web` and `docs` applications
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

## Features

- [x] Add a book
- [x] Edit a book
- [x] Delete a book
- [x] Search for a book
- [x] Add a book to your favorite list
- [x] Remove a book from your favorite list
- [x] View your favorite list
- [x] View all books
- [x] Login and Register with JWT, Facebook, Google
- [x] Review a book
- [x] View all reviews of a book
- [x] Shelving a book
- [x] View all shelved books
- [x] View all books in a shelf

## Requirements

- [Node.js](https://nodejs.org/en/) >= 14.0.0
- [pnpm](https://pnpm.io/installation) >= 6.0.0
- [Turbo CLI](https://turbo.build/repo/docs/getting-started/installation) >= 0.1.0

### SCRIPTS

To install all dependencies, run the following command:

```
FOr install all dependencies
$ pnpm install

Launch the app in development mode
$ pnpm run dev

Build the app for production
$ pnpm run build

Start the app in production mode
$ pnpm start

Lint the code
$ pnpm run lint

Format the code
$ pnpm run format

Run the tests
$ pnpm run test

Run the tests in watch mode
$ pnpm run test:watch
```

## License

[MIT](LICENSE)

## Author
**Ibrahima DANSOKO**
[Git](https://github.com/ibrahimdans)
[Linkedin](https://www.linkedin.com/in/ibrahimadansoko/)
