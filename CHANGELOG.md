# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.2] - 2026-03-24

### Security
- **CRITICAL FIX**: Fixed authentication vulnerability in `/api/auth/register` where passwords were not being stored (plaintext storage bug)
- Added bcrypt password hashing with 10 salt rounds
- Added input validation for required fields (email, name, password)
- Already had: bcrypt.compare() for login verification

### Changed
- Added rate limiting to auth routes (25 attempts per 15 minutes)
- Added comprehensive test coverage for auth endpoints
- Updated dependencies to latest stable versions

## [1.0.1] - 2026-03-22

### Added
- GitHub issue templates (bug report, feature request)
- GitHub security policy
- Contributing guidelines
- Code of Conduct

### Changed
- Updated README with clearer setup instructions
- Added service-industry focused branding

## [1.0.0] - 2026-03-21

### Added
- Initial release of Fluxora - Service Business Management Platform
- Client CRM with full contact management
- Appointment scheduling system
- Service delivery notes and progress tracking
- Program/work package management
- Invoicing system
- Basic marketing workflows
- AI operations assistant (mock responses)
- JWT-based authentication
- SQLite database with automatic migrations
- Environment-based configuration (.env.example)
- Static file serving with upload support

### Security
- Helmet.js for HTTP security headers
- CORS configuration support
- JWT token authentication
- bcrypt password hashing (implemented in 1.0.2)
