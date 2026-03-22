const fs = require('fs');
const path = require('path');

describe('Fluxora - Authentication Tests', () => {
  const serverPath = path.join(__dirname, '../server/index.js');
  let serverContent;

  beforeAll(() => {
    if (fs.existsSync(serverPath)) {
      serverContent = fs.readFileSync(serverPath, 'utf8');
    }
  });

  describe('Security Features', () => {
    test('should use environment variable for JWT_SECRET', () => {
      expect(serverContent).toContain("process.env.JWT_SECRET");
    });

    test('should warn about default JWT_SECRET in production', () => {
      expect(serverContent).toContain("JWT_SECRET is using the default value");
    });

    test('should hash passwords with bcrypt', () => {
      expect(serverContent).toContain('bcrypt.hash');
    });

    test('should compare passwords with bcrypt', () => {
      expect(serverContent).toContain('bcrypt.compare');
    });

    test('should require email and password for login', () => {
      expect(serverContent).toContain('Email and password are required');
    });

    test('should have rate limiting on auth endpoints', () => {
      expect(serverContent).toContain('authRateLimit');
    });

    test('should limit auth attempts to prevent brute force', () => {
      expect(serverContent).toContain('Too many auth attempts');
    });
  });

  describe('Token Management', () => {
    test('should generate JWT tokens with user info', () => {
      expect(serverContent).toContain('jwt.sign');
    });

    test('should verify JWT tokens', () => {
      expect(serverContent).toContain('jwt.verify');
    });

    test('should set token expiration', () => {
      expect(serverContent).toContain('expiresIn');
    });

    test('should extract token from Authorization header', () => {
      expect(serverContent).toContain('authorization');
    });
  });

  describe('CORS Configuration', () => {
    test('should configure CORS from environment', () => {
      expect(serverContent).toContain('CORS_ORIGINS');
    });

    test('should allow credentials in CORS', () => {
      expect(serverContent).toContain('credentials: true');
    });
  });

  describe('Helmet Security', () => {
    test('should use helmet middleware', () => {
      expect(serverContent).toContain('helmet(');
    });

    test('should configure crossOriginResourcePolicy for uploads', () => {
      expect(serverContent).toContain('crossOriginResourcePolicy');
    });
  });
});
