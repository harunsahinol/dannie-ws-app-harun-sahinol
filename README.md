# Real-time Chat Application

This project is a real-time chat application developed using WebSocket technology, built with a Node.js backend and React frontend.

## Features

- 💬 Real-time messaging
- 👥 Active user list
- 🟢 User status indicators (online/offline)
- 📱 Responsive design
- 💾 Message storage with ArangoDB
- 📝 Logging with Winston

## Technologies

### Backend
- Node.js
- Express
- WebSocket (ws)
- ArangoDB
- TypeScript
- Winston (logging)

### Frontend
- React
- TypeScript
- Tailwind CSS
- WebSocket API

### Prerequisites
- Node.js (v14 or higher)
- ArangoDB install with Docker [ArangoDB link](https://github.com/arangodb/arangodb)
- npm

# Installation Guide

## Quick Start
After cloning or downloading the repository, follow these steps:

1. Navigate to the project directory in your terminal:
```bash
cd your-project-directory
```

2. Build and start the containers:
```bash
docker-compose up --build
```

3. Access the application at: `auth.localhost`

## Troubleshooting

### Certificate Error
If you encounter a certificate error, please refer to the solution in this video:
[Certificate Error Solution](https://youtu.be/J2dB96MUL8s?t=2293)

### Manual Database Setup
If the database doesn't initialize properly during startup, follow these steps to set it up manually:

1. Open `http://localhost:8529` in your browser
2. Log in with the following credentials:
   - Username: `root`
   - Password: `test123`
3. Create a new database named `chatapp`
4. Create a collection named `messages`
5. Create a new admin user with these credentials:
   - Username: `admin`
   - Password: `test123`
6. Configure permissions for the admin user:
   - Navigate to Permissions
   - Grant Administrate permission for `chatapp`
   - Click on `chatapp`
   - Grant read/write permissions for `messages`


## Feature Details

### Real-time Messaging
- Instant message delivery over WebSocket connection
- Message storage in database
- View message history

### User Management
- User login system
- Active user list
- User status indicators (online/offline)

### Data Security
- Secure message storage in ArangoDB
- Detailed logging with Winston
- Error handling and monitoring


## License

MIT

## Contact

[harun.sahinol@outlook.com]


