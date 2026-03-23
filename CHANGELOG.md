# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.2] - 2026-03-23

### Security
- **CRITICAL**: Fixed password hashing in `/api/auth/register` endpoint
  - Passwords were being stored in plaintext due to missing `password` column in INSERT statement
  - Added bcrypt hashing with salt rounds 10
  - Added input validation for required fields (email, name, password)

## [1.0.1] - 2026-03-22

### Added
- Comprehensive test suite with Jest
- Auth tests (authentication & security)
- API tests (CRM, scheduling, invoicing, analytics)
- Test coverage improved from ~30% to ~70%

### Changed
- Dependencies verified at latest stable versions

## [1.0.0] - 2026-03-21

### Added
- Initial release
- Core functionality implemented
- Basic documentation
- CI/CD workflow configuration
