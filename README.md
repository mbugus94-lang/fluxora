# Fluxora - Service Business Management

<p align="center">
  <strong>Open-source platform for running service businesses</strong><br>
  <em>Consulting, agencies, clinics, training, and maintenance services</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Version-1.0.6-blue" alt="Version">
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License">
  <img src="https://img.shields.io/badge/Node.js-18+-yellow" alt="Node.js">
  <img src="[[Image 1: unavailable (https://img.shields.io/github/actions/workflow/status/mbugus94-lang/fluxora/ci.yml)]]" alt="CI Status">
</p>

---

Fluxora is an open-source platform for running service businesses across verticals like consulting, agencies, clinics, training, and maintenance services.

## ✨ Features

- **Client CRM** - Manage client relationships and contacts
- **Appointment Scheduling** - Book and manage appointments
- **Service Delivery Notes** - Track progress on service delivery
- **Program/Work Package Management** - Organize services into packages
- **Invoicing** - Generate and manage invoices
- **Basic Marketing Workflows** - Email and notification automation
- **AI Operations Assistant** - Mock AI responses for operations

---

## 🚀 Quick Start

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mbugus94-lang/fluxora.git
cd fluxora
```

2. Install dependencies:
```bash
npm install
```

3. Copy the environment variables file:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the development server:
```bash
npm run dev
```

Open `http://localhost:3000`.

Demo credentials:
- Email: `demo@aura.com`
- Password: `demo123`

---

## 🆕 What's New

Production-oriented updates in this build:
- ✅ Removed insecure demo password bypass
- ✅ Added environment-based runtime config (`PORT`, `JWT_SECRET`, `APP_NAME`, `CORS_ORIGINS`)
- ✅ Added auth route rate limiting
- ✅ Added `system/summary` and `system/export` operational endpoints
- ✅ Added UI enhancements: theme toggle, client search, one-click JSON backup export
- ✅ Added `.env.example`
- ✅ Updated UI and docs to be service-industry generic

---

## 🔍 Health Checks

The API includes a health check endpoint for monitoring:

```bash
curl http://localhost:3000/health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2025-01-15T10:30:00.000Z",
  "uptime": 3600,
  "version": "1.0.6"
}
```

---

## ⚙️ Environment Configuration

Copy `.env.example` values into your environment:

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `3000` |
| `APP_NAME` | Application name | `Fluxora` |
| `JWT_SECRET` | Secret for JWT signing | (required in production) |
| `CORS_ORIGINS` | Comma-separated allowed origins | (optional) |

---

## 📚 API Documentation

See [API.md](API.md) for complete API reference.

---

## 📁 Project Structure

```
fluxora/
|-- public/index.html      # Web UI
|-- server/
|   |-- index.js           # Express API server
|   |-- db.js              # SQLite database
|-- test/
|   |-- demo.js            # API demo/test suite
|-- .env.example           # Environment template
|-- package.json           # Dependencies
|-- README.md              # This file
```

---

## 📝 Notes

- Database is SQLite and is created/seeded automatically
- Some legacy fitness-oriented endpoints/tables remain for backward compatibility, but the default product language and workflow are now service-industry focused
- For production deployment, ensure you set a strong `JWT_SECRET`

---

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Change the port in .env
PORT=3001
```

**Database locked:**
```bash
# Stop the server and delete the lock file
rm server/aura.db-shm server/aura.db-wal
```

**Authentication errors:**
- Ensure `JWT_SECRET` is set in production
- Check that you're using valid demo credentials in development

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing`)
5. Open a Pull Request

---

## 📄 License

MIT License - see [LICENSE](LICENSE)

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/mbugus94-lang">David Gakere</a>
</p>