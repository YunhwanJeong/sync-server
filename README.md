# How to run
```
1. npm install

2. Fill the following fields in the .env and tests/.env.test files -> DB_NAME, DB_APP_NAME, DB_HOST, DB_USER, DB_USER_PWD

3. npm run start

4. access to http://localhost:3000/trigger-sync

For testing: npm run test
```

# Folder structure
```
/project-root
│
├── /app -> domain logic
│  └── controllers
│  └── exceptions
│  └── middleware
│  └── models
│  └── services
│  └── validators
├── /bin -> entry point
│  ├── app.ts
│  ├── server.ts
├── /config -> runtime configuration and modules
│  ├── axios.ts
│  ├── database.ts
│  ├── logger.ts
├── /start -> import during the boot lifecycle
│  ├── env.ts
│  ├── routes.ts
│  ├── validator.ts
├── /tests -> application tests
│  ├── setup.ts
│  └── e2e
│  └── integration
│  └── unit
│
├── .gitignore
├── README.md
├── package.json
└── tsconfig.json
```

# Model Design
- MenuRenderTree
  - To make it easier and faster to provide responses when rendering kiosk menus, I created a tree structure from POS responses and stored them separately.
- The rest were saved in their original form with the posId to make it easier to get back into the POS API structure later when creating orders.

