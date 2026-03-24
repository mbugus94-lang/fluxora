# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.7] - 2026-03-24

### Changed
- Updated version to 1.0.7 for consistency with aura-platform
- All dependencies remain current and secure

## [1.0.6] - 2026-03-24

### Changed
- Updated express from 4.22.1 to 5.2.1 for latest features and security improvements
- Added enhanced error handling middleware
- Improved security headers configuration

## [1.0.5] - 2026-03-24

### Added
- **Documentation**: Added badges section to README with version, license, Node.js, and CI status
- **Documentation**: Improved README header with centered description and badges

### Changed
- Version bump to 1.0.5 for maintenance release
- Updated devDependencies to latest stable versions:
  - prettier: ^3.3.3 → ^3.5.3

## [1.0.4] - 2026-03-23

### Changed
- Updated dependencies to latest stable versions:
  - sqlite3: ^5.1.7 → ^6.0.1
  - uuid: ^11.1.0 → ^13.0.0
  - multer: ^1.4.5-lts.1 → ^2.1.1
  - jsonwebtoken: ^9.0.2 → ^9.0.3
  - express: ^4.21.2 → ^4.22.1

## [1.0.3] - 2026-03-23

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
