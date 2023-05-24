<a href="https://jourloy.com/">
	<h1 align="center">
		QTIM Task
	</h1>
</a>

<p align="center">
	<a href="" target="_blank"><img src="https://img.shields.io/github/v/tag/Jourloy/QtimTask?color=red&label=version&style=for-the-badge&labelColor=000000"/></a>
</p>

<p align="center">Test task 😎</p>

## Table of Contents:

- [Task](#task)
- [Description](#description)
- [Getting Started](#getting-started)
- - [Installation](#installation)
- - - [.env](#evn)
- - [Test](test)
- [Running the app](#running-the-app)
- - [Yarn](#yarn)
- [Dev](#dev)
- - [Swagger](#swagger)

## Task

- [x] Написать CRUD для создания новостей, Read - открыты для всех, Create, Update, Delete - закрыты авторизацией
- [x] Авторизация JWT
- [x] Регистрация

## Description

App able store many refresh tokens, so user can log in from any device. User can't delete or update news which created by
other users

### How to improve:

- Add verify device for tokens
- Add roles for users (editor, guest, etc.)

## Getting Started

### Installation

```bash
$ yarn install
```

#### .evn

Don't forget create `.env` from `.env.sample` and add data

### Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

###### Warning - I don't work with tests in this app

### Running the app

#### Yarn
```bash
# Development
$ yarn start:dev

# Production
$ yarn start
```

## Dev

### Swagger

You can open local swagger documentation on http://localhost:3111/api

<h2 align="center">
	Technologies
</h2>

<div align="center">
	<a href="" target="_blank"><img src="https://img.shields.io/static/v1?label=&message=NEST.js&logo=nestjs&style=for-the-badge&labelColor=000000&color=000000"/></a>
	<a href="" target="_blank"><img src="https://img.shields.io/static/v1?label=&message=Swagger&logo=Swagger&style=for-the-badge&labelColor=000000&color=000000"/></a>
	<a href="" target="_blank"><img src="https://img.shields.io/static/v1?label=&message=PostgresSQL&logo=postgresql&style=for-the-badge&labelColor=000000&color=000000"/></a>
</div>
