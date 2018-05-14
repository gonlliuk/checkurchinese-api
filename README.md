### Check ur chinese API

### Usage
* ``docker-compose up --build``

### Running
You must have runned your local MongoDB daemon at `:27017`
* ``make`` - run develop server
* ``make test`` - run local tests

### Default enpoints
* ``[GET]: /auth/:email`` - check if email exist
* ``[POST]: /auth/in`` - authorize user by `email` and `password`
* ``[POST]: /auth/up`` - create user by `email` and `password`
* ``[GET]: /user`` - get user
* ``[PATCH]: /user`` - update user
* ``[DELETE]: /user/session/:uuid`` - remove user session

### Test
``npm test``
