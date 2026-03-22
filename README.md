# URL Shortening Service

URL shortening service built with Node.js, Express and MongoDB.

## Installation

```bash
npm install
```

## Configuration

Create a `.env` file with the following variables:

```
PORT=3000
MONGODB_CONNECTION_STRING=mongodb://localhost:27017/url-shortener
CLIENT_URL=http://localhost:3000
```

## Running the Application

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

## API Endpoints

### Create Short URL

```
POST /shorten
Body: { "url": "https://example.com" }
Response: { "url": "...", "shortCode": "abc123", ... }
```

### Redirect to Original URL

```
GET /:shortCode
Response: Redirect 302
```

### Get URL Information

```
GET /shorten/:shortCode
Response: { "url": "...", "shortCode": "...", ... }
```

### Update Original URL

```
PUT /shorten/:shortCode
Body: { "url": "https://new-url.com" }
Response: { "url": "...", "shortCode": "...", ... }
```

### Delete URL

```
DELETE /shorten/:shortCode
Response: { "message": "URL deleted successfully" }
```

### Get URL Statistics

```
GET /shorten/:shortCode/stats
Response: { "accessCount": 42, ... }
```

## Project Structure

```
src/
  config/         # Database configuration
  controllers/    # Business logic
  models/         # Mongoose models
  routes/         # API routes
  server.ts       # Entry point
```

## Technologies

- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- Short code encoding: Base62
