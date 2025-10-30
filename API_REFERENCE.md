# API Reference Guide

## Base URL
```
http://localhost:8080
```

## Authentication
All endpoints (except `/auth/login`) require:
```
Authorization: Bearer <accessToken>
```

---

## Auth Endpoints

### POST /auth/login
Login with email or phone
```bash
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d {
    "identifier": "admin@garudaverify.in",
    "password": "Admin@123"
  }
```

**Response:**
```json
{
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "user": {
    "id": "user123",
    "name": "Admin User",
    "role": "ADMIN",
    "email": "admin@garudaverify.in",
    "orgId": "org123"
  }
}
```

**Status Codes:**
- `200` - Success
- `401` - Invalid credentials
- `400` - Missing fields

---

## User Endpoints

### GET /users/me
Get current user profile

```bash
curl http://localhost:8080/users/me \
  -H "Authorization: Bearer <token>"
```

**Response:**
```json
{
  "id": "user123",
  "name": "Admin User",
  "email": "admin@garudaverify.in",
  "phone": "+919876543210",
  "role": "ADMIN",
  "orgId": "org123",
  "org": {
    "id": "org123",
    "name": "Garuda Verify",
    "type": "INTERNAL"
  },
  "isActive": true,
  "createdAt": "2024-01-15T10:30:00Z"
}
```

---

### GET /users/agents
List all field agents (Admin only)

```bash
curl "http://localhost:8080/users/agents?orgId=org123" \
  -H "Authorization: Bearer <token>"
```

**Query Parameters:**
- `orgId` (optional) - Filter by organization

**Response:**
```json
[
  {
    "id": "agent1",
    "name": "John Doe",
    "email": "john@garudaverify.in",
    "phone": "+919876543210",
    "orgId": "org123",
    "isActive": true,
    "assignments": [
      { "id": "assign1", "status": "IN_PROGRESS" }
    ]
  }
]
```

---

### GET /users/clients
List all clients (Admin only)

```bash
curl http://localhost:8080/users/clients \
  -H "Authorization: Bearer <token>"
```

**Response:**
```json
[
  {
    "id": "client1",
    "name": "ACME Corp",
    "email": "client@acme.com",
    "phone": "+919876543210",
    "org": {
      "id": "org456",
      "name": "ACME Corporation"
    },
    "isActive": true
  }
]
```

---

### GET /users/:id
Get specific user (Admin only)

```bash
curl http://localhost:8080/users/user123 \
  -H "Authorization: Bearer <token>"
```

**Response:** Same as `/users/me`

---

## Request Endpoints

### GET /requests
List verification requests

```bash
curl "http://localhost:8080/requests?skip=0&take=20&status=IN_PROGRESS&search=John" \
  -H "Authorization: Bearer <token>"
```

**Query Parameters:**
- `skip` (default: 0) - Pagination offset
- `take` (default: 20, max: 100) - Items per page
- `status` (optional) - Filter: DRAFT, ASSIGNED, IN_PROGRESS, ON_HOLD, COMPLETED, REJECTED
- `search` (optional) - Search subject name, ID, or loan ref

**Response:**
```json
{
  "data": [
    {
      "id": "req1",
      "type": "loan",
      "status": "IN_PROGRESS",
      "priority": "HIGH",
      "subjectName": "John Doe",
      "subjectPhone": "+919876543210",
      "subjectAddress": "123 Main St",
      "city": "Mumbai",
      "state": "Maharashtra",
      "pincode": "400001",
      "loanRefNo": "LOAN123",
      "requester": { "id": "user1", "name": "Admin" },
      "clientOrg": { "id": "org1", "name": "ACME" },
      "assignments": [{ "id": "a1", "agentId": "agent1" }],
      "evidences": [{ "id": "e1", "kind": "PHOTO" }],
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-16T14:00:00Z",
      "dueAt": null,
      "closedAt": null
    }
  ],
  "pagination": {
    "total": 150,
    "skip": 0,
    "take": 20,
    "pages": 8
  }
}
```

**Access Control:**
- ADMIN: Can see all requests
- CLIENT: Can only see their organization's requests
- FIELD: Can only see assigned requests

---

### POST /requests
Create new verification request (Client/Admin only)

```bash
curl -X POST http://localhost:8080/requests \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d {
    "type": "loan",
    "requesterId": "user1",
    "clientOrgId": "org1",
    "subjectName": "John Doe",
    "subjectPhone": "+919876543210",
    "subjectAddress": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001",
    "loanRefNo": "LOAN123",
    "priority": "HIGH"
  }
```

**Request Body:**
- `type` (required) - loan, insurance_pre, insurance_post, vehicle_inspection, vehicle_valuation, asset_verification, vendor_hub_verification, documents_collection
- `requesterId` (required) - User ID creating request
- `clientOrgId` (optional) - Client organization ID
- `subjectName` (required) - Person/entity being verified
- `subjectPhone` (optional) - Contact number
- `subjectAddress` (optional)
- `city` (optional)
- `state` (optional)
- `pincode` (optional)
- `loanRefNo` (optional) - Loan reference number
- `priority` (optional) - LOW, NORMAL, HIGH, URGENT

**Response:** Created request object

---

### GET /requests/:id
Get specific request

```bash
curl http://localhost:8080/requests/req1 \
  -H "Authorization: Bearer <token>"
```

**Response:** Request object with all relationships

---

### PATCH /requests/:id
Update request (Admin only)

```bash
curl -X PATCH http://localhost:8080/requests/req1 \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d {
    "status": "COMPLETED",
    "priority": "URGENT"
  }
```

**Request Body:** Any request fields to update

---

## Assignment Endpoints

### POST /assignments
Create assignment (Admin only)

```bash
curl -X POST http://localhost:8080/assignments \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d {
    "requestId": "req1",
    "agentId": "agent1"
  }
```

**Response:**
```json
{
  "id": "assign1",
  "requestId": "req1",
  "agentId": "agent1",
  "status": "ASSIGNED",
  "assignedAt": "2024-01-16T10:00:00Z",
  "startedAt": null,
  "completedAt": null,
  "notes": null,
  "agent": { "id": "agent1", "name": "John Agent" },
  "request": { "id": "req1", "subjectName": "John Doe" }
}
```

---

### GET /assignments/my-assignments
Get field agent's assignments

```bash
curl "http://localhost:8080/assignments/my-assignments?status=IN_PROGRESS&skip=0&take=20" \
  -H "Authorization: Bearer <token>"
```

**Query Parameters:**
- `status` (optional) - ASSIGNED, IN_PROGRESS, COMPLETED, CANCELLED
- `skip` (default: 0)
- `take` (default: 20)

**Response:** Paginated assignments with request details

---

### GET /assignments/:id
Get assignment details

```bash
curl http://localhost:8080/assignments/assign1 \
  -H "Authorization: Bearer <token>"
```

**Response:** Assignment with full request and agent details

---

### PATCH /assignments/:id/status
Update assignment status (Field Agent/Admin)

```bash
curl -X PATCH http://localhost:8080/assignments/assign1/status \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d {
    "status": "IN_PROGRESS"
  }
```

**Status Values:**
- `ASSIGNED` - Initial state
- `IN_PROGRESS` - Work started (auto-sets startedAt)
- `COMPLETED` - Work finished (auto-sets completedAt)
- `CANCELLED` - Assignment cancelled

**Response:** Updated assignment

---

### GET /assignments/request/:requestId
Get all assignments for request (Admin only)

```bash
curl http://localhost:8080/assignments/request/req1 \
  -H "Authorization: Bearer <token>"
```

**Response:** Array of assignments with agent details

---

## Evidence Endpoints

### POST /evidence/upload
Upload evidence file (Field Agent/Admin)

```bash
curl -X POST http://localhost:8080/evidence/upload \
  -H "Authorization: Bearer <token>" \
  -F "file=@photo.jpg" \
  -F "requestId=req1" \
  -F "kind=PHOTO" \
  -F "gpsLat=19.0760" \
  -F "gpsLng=72.8777"
```

**Form Parameters:**
- `file` (required) - File to upload
- `requestId` (required) - Associated request ID
- `kind` (required) - PHOTO, VIDEO, DOC
- `gpsLat` (optional) - Latitude
- `gpsLng` (optional) - Longitude

**Response:**
```json
{
  "id": "ev1",
  "requestId": "req1",
  "uploaderId": "agent1",
  "kind": "PHOTO",
  "filename": "photo.jpg",
  "mimeType": "image/jpeg",
  "size": 2048576,
  "storageKey": "1642324200000-agent1-photo.jpg",
  "gpsLat": 19.0760,
  "gpsLng": 72.8777,
  "shotAt": "2024-01-16T10:00:00Z",
  "createdAt": "2024-01-16T10:00:00Z",
  "uploader": { "id": "agent1", "name": "John Agent" }
}
```

---

### GET /evidence/request/:requestId
List evidence for request

```bash
curl "http://localhost:8080/evidence/request/req1?kind=PHOTO" \
  -H "Authorization: Bearer <token>"
```

**Query Parameters:**
- `kind` (optional) - PHOTO, VIDEO, DOC

**Response:** Array of evidence objects

---

### GET /evidence/:id
Get specific evidence

```bash
curl http://localhost:8080/evidence/ev1 \
  -H "Authorization: Bearer <token>"
```

**Response:** Evidence object

---

### POST /evidence/:id/delete
Delete evidence (Uploader/Admin only)

```bash
curl -X POST http://localhost:8080/evidence/ev1/delete \
  -H "Authorization: Bearer <token>"
```

**Response:**
```json
{
  "success": true
}
```

---

## Error Responses

### 401 Unauthorized
```json
{
  "message": "Invalid or expired token",
  "statusCode": 401
}
```

### 403 Forbidden
```json
{
  "message": "Access denied",
  "statusCode": 403
}
```

### 400 Bad Request
```json
{
  "message": "Missing required fields",
  "statusCode": 400,
  "error": "Bad Request"
}
```

### 404 Not Found
```json
{
  "message": "Request not found",
  "statusCode": 404
}
```

---

## Testing with cURL

### 1. Login
```bash
TOKEN=$(curl -s -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"identifier":"admin@garudaverify.in","password":"Admin@123"}' \
  | jq -r '.accessToken')

echo $TOKEN
```

### 2. Use token in requests
```bash
curl http://localhost:8080/users/me \
  -H "Authorization: Bearer $TOKEN"
```

### 3. Create request
```bash
curl -X POST http://localhost:8080/requests \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "type":"loan",
    "requesterId":"USER_ID",
    "subjectName":"Test Person",
    "priority":"HIGH"
  }'
```

---

## Testing with Postman

1. Create environment with variables:
   - `base_url`: http://localhost:8080
   - `token`: (empty, will be set by login request)

2. Create Login request:
   - POST {{base_url}}/auth/login
   - Body: JSON with identifier and password
   - Tests tab: `pm.environment.set("token", pm.response.json().accessToken);`

3. Use {{token}} in Authorization header for other requests

---

## Rate Limiting (To be implemented)

Future versions will include:
- 100 requests per minute per user
- 1000 requests per minute per IP
- Exponential backoff after limit exceeded

---

## Pagination

All list endpoints support pagination:
- Default page size: 20
- Maximum page size: 100
- Response includes total count and page count

Example: Get page 2 (items 20-39):
```bash
curl "http://localhost:8080/requests?skip=20&take=20" \
  -H "Authorization: Bearer <token>"
```

---

## Search & Filtering

### Requests
- `search`: Searches in subject name, request ID, loan reference number (case-insensitive)
- `status`: Exact match filter

### Assignments
- `status`: Filter by assignment status

### Evidence
- `kind`: Filter by evidence type (PHOTO, VIDEO, DOC)

Combine multiple filters:
```bash
/requests?status=IN_PROGRESS&search=john&skip=0&take=20
/assignments/my-assignments?status=IN_PROGRESS&skip=0&take=10
```
