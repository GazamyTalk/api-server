# Required Database
- login database: mysql
- main database: mongodb
- chat database: mongodb
- session store: redis

# Login Database Initialization SQL Query
```
create table users(
    userid int auto_increment primary key,
    username varchar(40) not null,
    password varchar(64) not null);
```

# Environment Varaibles
- `LOGIN_DB_HOST`: host of login database
- `LOGIN_DB_PORT`: port of login database
- `LOGIN_DB_USER`: user of login database
- `LOGIN_DB_PASSWORD`: password of login database
- `LOGIN_DB_DATABASE`: database of login database
- `MAIN_DB_URI`: uri of main database
- `CHAT_DB_URI`: uri of chat database
- `SESSION_STORE_URL`: url of session database
- `SESSION_SECRET`: secret of session
- `SERVER_DOMAIN`: domain of server
- `DEFAULT_USER_IMAGE_PATH`: default url path of user image
- `DEFAULT_ROOM_IMAGE_PATH`: default url path of room image
- `DEFAULT_USERNAME_MAX_LENGTH`: default max length of username
- `DEFAULT_ROOM_NAME`: default name of room