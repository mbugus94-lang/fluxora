const fs = require('fs');
const path = require('path');

describe('Fluxora - API Structure Tests', () => {
  const serverPath = path.join(__dirname, '../server/index.js');
  let serverContent;

  beforeAll(() => {
    if (fs.existsSync(serverPath)) {
      serverContent = fs.readFileSync(serverPath, 'utf8');
    }
  });

  describe('Core Features', () => {
    test('should have CRM endpoints', () => {
      expect(serverContent).toMatch(/\/api\/clients|crm|customers/);
    });

    test('should have service management', () => {
      expect(serverContent).toMatch(/\/api\/services|service/);
    });

    test('should have appointment scheduling', () => {
      expect(serverContent).toMatch(/\/api\/appointments|schedule|booking/);
    });

    test('should have invoicing', () => {
      expect(serverContent).toMatch(/\/api\/invoices|invoice|billing/);
    });

    test('should have analytics', () => {
      expect(serverContent).toMatch(/\/api\/analytics|stats|reports/);
    });
  });

  describe('Security', () => {
    test('should use helmet middleware', () => {
      expect(serverContent).toContain('helmet');
    });

    test('should use CORS', () => {
      expect(serverContent).toContain('cors');
    });

    test('should have environment-based config', () => {
      expect(serverContent).toMatch(/process\.env\.(PORT|NODE_ENV)/);
    });
  });

  describe('Data Export', () => {
    test('should have export functionality', () => {
      expect(serverContent).toMatch(/\/system\/export|export|backup/);
    });

    test('should have summary endpoint', () => {
      expect(serverContent).toMatch(/\/system\/summary|summary/);
    });
  });
});
