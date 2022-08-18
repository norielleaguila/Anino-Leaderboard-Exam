# Anino Leaderboard API

This leaderboard API uses ActionHero JS and Cloud Firestore to generate users, leaderboards, and leaderboard entries.

*[actionhero@26.1.2](https://www.npmjs.com/package/actionhero/v/26.1.2)*

*[firebase-admin@11.0.1](https://www.npmjs.com/package/firebase-admin)*

## Quick Start

You will need to have node and npm installed.

```powershell
# install all dependencies and generate deployment files
npm install
npm run build
```

Next, create a *keys* folder inside the *dist* folder.

Unzip *firestore-key.zip* and place it in dist/keys.

```powershell
# start the application
npm start
```

## API Endpoints

1. POST /user
    - CMD
        
        ```powershell
        curl -d "name=jane" http://localhost:8080/user
        ```
        
    - Application Result
        
        ```json
        {
          "user": {
            "_id": "dsSzYAZu0Q9v5WWNTilB",
            "name": "rei"
          }
        }
        ```
        
2. GET /user/:_id
    - CMD
        
        ```powershell
        curl http://localhost:8080/user/dsSzYAZu0Q9v5WWNTilB
        ```
        
    - Application Result
        
        ```json
        {
          "user": {
            "_id": "dsSzYAZu0Q9v5WWNTilB",
            "name": "rei"
          }
        }
        ```
        
3. POST /admin/leaderboard
    - CMD
        
        ```powershell
        curl -d "name=test leaderboard" http://localhost:8080/admin/leaderboar
        ```
        
    - Application Result
        
        ```json
        {
          "board": {
            "_id": "MNqrMmaMfv24T9aPiste",
            "name": "test leaderboard"
          }
        }
        ```
        
4. GET /leaderboard/:_id?per_page=x&page=y
    - CMD
        
        ```powershell
        curl http://localhost:8080/leaderboard/hJL1E6SxbojytH6DIiKJ?per_page=4&page=1
        ```
        
    - Application Result
        
        ```json
        {
          "board": {
            "_id": "hJL1E6SxbojytH6DIiKJ",
            "name": "WatchMojo Top 10",
            "entries": [
              {
                "score": 90,
                "user_id": "ELYDfLFZiyPHcsAh8ft7",
                "scored_at": "2022-08-18T18:49:27.667Z",
                "rank": 0,
                "name": "nori5"
              },
              {
                "score": 90,
                "user_id": "aKc3IubTig4j3WJJEVyg",
                "scored_at": "2022-08-18T18:49:33.270Z",
                "rank": 1,
                "name": "bob5"
              },
              {
                "score": 80,
                "user_id": "9780HNiCZbMsnWjkMGyv",
                "scored_at": "2022-08-18T18:49:27.205Z",
                "rank": 2,
                "name": "john4"
              },
              {
                "score": 80,
                "user_id": "ZbCNrUbXGs3KnJmU6d7f",
                "scored_at": "2022-08-18T18:49:32.811Z",
                "rank": 3,
                "name": "john1"
              }
            ]
          }
        }
        ```
        
5. PUT /leaderboard/:_id/user/:user_id/add_score
    - CMD
        
        ```powershell
        curl -d "score_to_add=30" http://localhost:8080/leaderboard/hJL1E6SxbojytH6DIiKJ/user/jAoqANMS3wXRIU6AQvqh/add_score
        ```
        
    - Application Result
        
        ```json
        {
          "entry": {
            "_id": "jAoqANMS3wXRIU6AQvqh-hJL1E6SxbojytH6DIiKJ",
            "board_id": "hJL1E6SxbojytH6DIiKJ",
            "score": 60,
            "scored_at": "2022-08-18T18:49:34.633Z",
            "user_id": "jAoqANMS3wXRIU6AQvqh"
          }
        }
        ```