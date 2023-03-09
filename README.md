<p align="center">
 <img src="./public/logo.jpg" width='200px'  alt="Logo" />
</p>

### Stack

![TypeScript](https://img.shields.io/badge/-TypeScript-%23007ACC?style=for-the-badge&logo=typescript&logoColor=white)

![Docker](https://img.shields.io/badge/-Docker-%232496ED?style=for-the-badge&logo=docker&logoColor=white)
![PNPM](https://img.shields.io/badge/-PNPM-%23282C34?style=for-the-badge&logo=pnpm&logoColor=white)
![Turbo](https://img.shields.io/badge/-Turbo-%23282C34?style=for-the-badge&logo=turbo&logoColor=white)

#### BackEnd
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)

#### FrontEnd
![React](https://img.shields.io/badge/-React-%23282C34?style=for-the-badge&logo=react&logoColor=61DAFB)
![NextJS](https://img.shields.io/badge/-NextJS-%23282C34?style=for-the-badge&logo=next.js&logoColor=white)
![MaterialUI](https://img.shields.io/badge/-MaterialUI-%23282C34?style=for-the-badge&logo=material-ui&logoColor=0081CB)
![StyledComponents](https://img.shields.io/badge/-StyledComponents-%23282C34?style=for-the-badge&logo=styled-components&logoColor=DB7093)



## Description

BookStore is a application that allows you to manage **books** and **authors**. 
It is a fullstack  application written in TypeScript.

The application is also equipped with a Dockerfile that allows you to run the application in a Docker container.
 [link readme backend](./apps/server/README.md)
 [link readme frontend](./apps/web/README.md)

## Requirements

- [Node.js](https://nodejs.org/en/)
- [pnpm](https://pnpm.io/)
- [PostgreSQL](https://www.postgresql.org/)

## Installation

```bash
$ pnpm install
```

## Running the app

```bash

# development
$ pnpm run dev

# production mode
$ pnpm run start:prod

# build
$ pnpm run build

#docker
$ docker build -t bookstore .
$ docker run -p 3000:3000 bookstore
##docker-compose
$ docker-compose up -d

## Test
pnpm run test
```
