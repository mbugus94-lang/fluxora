# Fluxora - Service Business Management Platform Demo

## 🚀 Quick Start Demo

### 1. Install & Start

```bash
git clone https://github.com/mbugus94-lang/fluxora.git
cd fluxora
npm install
npm run dev
```

Open `http://localhost:3000`

### 2. Demo Login

```
Email: demo@fluxora.com
Password: demo123
```

## 📊 Dashboard Overview

```
┌─────────────────────────────────────────────────────────────┐
│  ⚡ Fluxora                              [Dashboard] [Logout]│
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  📈 Quick Stats                              [Export JSON]  │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │   156       │ │   $47K      │ │    23       │           │
│  │   Clients   │ │  Revenue    │ │  Active     │           │
│  │             │ │  This Month │ │  Projects   │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
│                                                             │
│  📅 Upcoming Appointments                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Today  2:00 PM  -  John Smith - Consultation         │  │
│  │ Today  4:30 PM  -  Sarah Johnson - Project Review    │  │
│  │ Tomorrow 9:00 AM -  Mike Brown - Strategy Session      │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ⚠️ Action Items                                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 🔴 Invoice #1234 overdue (5 days) - $2,500           │  │
│  │ 🟡 Project "Website Redesign" due tomorrow          │  │
│  │ 🟢 3 new leads awaiting response                      │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 🎯 Core Features Walkthrough

### 1. Client CRM

**Add New Client:**
```bash
curl -X POST http://localhost:3000/api/clients \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Acme Corporation",
    "email": "contact@acme.com",
    "phone": "+1-555-0123",
    "company": "Acme Corp",
    "industry": "Technology",
    "notes": "Enterprise client, premium support"
  }'
```

**List Clients with Search:**
```bash
# Search clients
curl "http://localhost:3000/api/clients?search=acme&page=1&limit=10" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Client Detail View:**
- Contact information
- Appointment history
- Service packages purchased
- Invoices & payments
- Notes & communication log

### 2. Appointment Scheduling

**Create Appointment:**
```bash
curl -X POST http://localhost:3000/api/appointments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "clientId": 1,
    "serviceType": "Consultation",
    "date": "2026-04-10",
    "time": "14:00",
    "duration": 60,
    "notes": "Initial project discussion"
  }'
```

**Conflict Detection:**
- Automatically checks for scheduling conflicts
- Suggests alternative time slots
- Sends email reminders 24h and 1h before

**Calendar View:**
- Day/Week/Month views
- Drag-and-drop rescheduling
- Color-coded by service type

### 3. Service Delivery Notes

**Create Delivery Note:**
```bash
curl -X POST http://localhost:3000/api/delivery-notes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "clientId": 1,
    "projectId": 5,
    "serviceType": "Web Development",
    "description": "Completed homepage redesign with responsive layout",
    "hoursSpent": 8,
    "materials": ["Stock photos", "Premium icons"],
    "nextSteps": "Review with client, proceed to inner pages"
  }'
```

### 4. Program/Work Package Management

**Create Service Package:**
```bash
curl -X POST http://localhost:3000/api/packages \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Premium Website Package",
    "description": "Complete website design & development",
    "services": [
      "Homepage design",
      "5 inner pages",
      "Mobile responsive",
      "SEO optimization",
      "2 revision rounds"
    ],
    "price": 5000,
    "duration": "4-6 weeks",
    "deliverables": [
      "Design files",
      "Source code",
      "Documentation"
    ]
  }'
```

### 5. Invoicing

**Generate Invoice:**
```bash
curl -X POST http://localhost:3000/api/invoices \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "clientId": 1,
    "items": [
      {
        "description": "Premium Website Package",
        "quantity": 1,
        "rate": 5000,
        "amount": 5000
      },
      {
        "description": "Additional revisions",
        "quantity": 2,
        "rate": 250,
        "amount": 500
      }
    ],
    "dueDate": "2026-04-30",
    "notes": "Net 30 payment terms"
  }'
```

**Invoice Status Workflow:**
- Draft → Sent → Viewed → Paid → Overdue
- Automatic reminders for overdue invoices
- PDF generation for email attachment

### 6. AI Operations Assistant

**Ask Operations Question:**
```bash
curl -X POST http://localhost:3000/api/ai/operations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "question": "What clients have overdue invoices?"
  }'
```

**AI Response:**
```json
{
  "answer": "You have 3 clients with overdue invoices:\n\n1. Acme Corporation - Invoice #1234 - $2,500 (5 days overdue)\n2. TechStart Inc - Invoice #1235 - $1,800 (12 days overdue)\n3. Global Solutions - Invoice #1236 - $4,200 (8 days overdue)\n\nTotal overdue: $8,500. I recommend following up with TechStart Inc first as they are the most overdue."
}
```

## 📡 API Examples

### Health Check
```bash
curl http://localhost:3000/health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2026-04-05T15:30:00.000Z",
  "uptime": 3600,
  "version": "1.0.7"
}
```

### Export System Data
```bash
curl http://localhost:3000/api/system/export \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Get System Summary
```bash
curl http://localhost:3000/api/system/summary \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🎨 UI Components

### Theme Toggle
- Light/Dark mode support
- Persistent preference storage
- System preference detection

### Client Search
- Real-time search across name, email, company
- Filter by industry, status, date range
- Sort by name, date, revenue

### Dashboard Widgets
- Revenue charts
- Appointment calendar
- Task checklist
- Recent activity feed

## 🐳 Docker Deployment

```bash
docker-compose up -d
```

Access the app at `http://localhost:3000`

## 📱 Mobile Responsive

The web interface is fully responsive:
- Desktop: Full dashboard with side navigation
- Tablet: Collapsible navigation, optimized grids
- Mobile: Card-based layout, touch-friendly controls

## 🔐 Security Features

- JWT authentication with secure secret handling
- Rate limiting on auth endpoints (25 attempts per 15 min)
- Helmet.js security headers
- CORS origin validation
- File upload size limits (10MB)
- SQL injection protection (parameterized queries)

---

**Ready to Run**: `npm run dev` to start your service business platform!
