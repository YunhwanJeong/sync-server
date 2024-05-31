# How to run
```
1. Create .env and .env.test files next to the .env.example files and fill in the variables

2. npm install

3. npm run start

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
