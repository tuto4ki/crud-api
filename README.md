# crud-api


### Prerequisites

1. Clone repo locally: https://github.com/tuto4ki/crud-api

```bash
git clone git@github.com:tuto4ki/crud-api.git
```
2. Go to branch `develop`

```bash
git checkout develop
```

3. To install all dependencies

```bash
npm install
```
4. Run develop version

```bash
npm run start:dev
```

5. Check server

---

**POST**/**PUT** requests with Postman:
send the request `body` by selecting `raw` and insert it into the field, for example:

```bash
{
    "username": "Tamara",
    "age": 64,
    "hobbies": ["Music", "Dancing"]
}
```

---
## Implementation details

1. Endpoint `api/users`:
    - **GET** `api/users` get all persons
    - **GET** `api/users/{userId}` get person with `{userId}`
    - **POST** `api/users` create record about new user and store it in database
    - **PUT** `api/users/{userId}` update existing user
    - **DELETE** `api/users/{userId}` delete existing user from database

2. Users have following properties:
    - `id` — unique identifier (`string`, `uuid`) generated on server side
    - `username` — user's name (`string`, **required**)
    - `age` — user's age (`number`, **required**)
    - `hobbies` — user's hobbies (`array` of `strings` or empty `array`, **required**)

3. Requests to non-existing endpoints: server answer with `status code` **404** and message `Route not found`

4. Errors on the server side that occur during the processing of a request: server answer with `status code` **500** and message `Server error`

5. There 2 modes of running application (**development** and **production**):
    - The application is run in development mode

    ```bash
    npm run start:dev
    ```
    
    - The application is run in production mode

    ```bash
    npm run start:prod
    ```
