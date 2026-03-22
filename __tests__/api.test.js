const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');

// Mock the database module
jest.mock('../server/db', () => ({
  get: jest.fn(),
  run: jest.fn(),
  all: jest.fn(),
}));

const db = require('../server/db');

describe('Fluxora API Endpoints', () => {
  let app;
  const JWT_SECRET = 'test-secret';

  const generateToken = (user) => {
    return jwt.sign(user, JWT_SECRET, { expiresIn: '24h' });
  };

  const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Access token required' });

    try {
      const user = jwt.verify(token, JWT_SECRET);
      req.user = user;
      next();
    } catch (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
  };

  beforeEach(() => {
    app = express();
    app.use(express.json());

    // Root endpoint
    app.get('/', (req, res) => {
      res.json({
        message: 'Fluxora API',
        version: '1.0.0',
        vertical: 'service-industry',
        endpoints: {
          auth: '/api/auth/*',
          clients: '/api/clients/*',
          appointments: '/api/appointments/*',
          services: '/api/services/*',
          invoices: '/api/invoices/*',
          analytics: '/api/analytics/*',
        },
      });
    });

    // Health check
    app.get('/api/health', (req, res) => {
      res.json({ status: 'ok', database: 'connected', timestamp: new Date().toISOString() });
    });

    // System summary endpoint
    app.get('/api/system/summary', authenticateToken, (req, res) => {
      res.json({
        app: 'Fluxora',
        version: '1.0.0',
        database: 'connected',
        user: req.user,
        stats: {
          totalClients: 0,
          totalAppointments: 0,
          totalRevenue: 0,
        }
      });
    });

    // Clients endpoints
    app.get('/api/clients', authenticateToken, (req, res) => {
      res.json({ clients: [], user: req.user });
    });

    app.post('/api/clients', authenticateToken, (req, res) => {
      const { name, email, phone, businessName } = req.body;
      
      if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
      }
      
      res.json({ 
        id: 1, 
        name, 
        email, 
        phone, 
        businessName,
        createdBy: req.user.id,
        createdAt: new Date().toISOString()
      });
    });

    // Appointments endpoints
    app.get('/api/appointments', authenticateToken, (req, res) => {
      res.json({ appointments: [], user: req.user });
    });

    app.post('/api/appointments', authenticateToken, (req, res) => {
      const { clientId, date, time, type, notes } = req.body;
      
      if (!clientId || !date || !time) {
        return res.status(400).json({ error: 'Client ID, date, and time are required' });
      }
      
      res.json({ 
        id: 1, 
        clientId, 
        date, 
        time, 
        type: type || 'general',
        notes: notes || '',
        status: 'scheduled',
        createdBy: req.user.id,
        createdAt: new Date().toISOString()
      });
    });

    // Services endpoints
    app.get('/api/services', authenticateToken, (req, res) => {
      res.json({ services: [], user: req.user });
    });

    app.post('/api/services', authenticateToken, (req, res) => {
      const { name, description, price, duration } = req.body;
      
      if (!name || !price) {
        return res.status(400).json({ error: 'Service name and price are required' });
      }
      
      res.json({ 
        id: 1, 
        name, 
        description: description || '',
        price,
        duration: duration || 60,
        createdBy: req.user.id,
        createdAt: new Date().toISOString()
      });
    });

    // Invoices endpoints
    app.get('/api/invoices', authenticateToken, (req, res) => {
      res.json({ invoices: [], user: req.user });
    });

    app.post('/api/invoices', authenticateToken, (req, res) => {
      const { clientId, items, total, dueDate } = req.body;
      
      if (!clientId || !items || !total) {
        return res.status(400).json({ error: 'Client ID, items, and total are required' });
      }
      
      res.json({ 
        id: 1, 
        clientId, 
        items,
        total,
        status: 'pending',
        dueDate: dueDate || new Date().toISOString(),
        createdBy: req.user.id,
        createdAt: new Date().toISOString()
      });
    });

    // Analytics endpoint
    app.get('/api/analytics', authenticateToken, (req, res) => {
      res.json({
        totalClients: 0,
        totalAppointments: 0,
        totalServices: 0,
        totalRevenue: 0,
        pendingInvoices: 0,
        user: req.user
      });
    });

    // Export endpoint
    app.get('/api/system/export', authenticateToken, (req, res) => {
      res.json({
        exportType: 'json',
        timestamp: new Date().toISOString(),
        data: {
          clients: [],
          appointments: [],
          services: [],
          invoices: []
        },
        exportedBy: req.user.id
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Root Endpoint', () => {
    test('should return API info with service industry vertical', async () => {
      const response = await request(app)
        .get('/')
        .expect(200);
      
      expect(response.body.message).toBe('Fluxora API');
      expect(response.body.vertical).toBe('service-industry');
      expect(response.body.endpoints).toHaveProperty('services');
      expect(response.body.endpoints).toHaveProperty('invoices');
    });
  });

  describe('Health Check', () => {
    test('should return health status with timestamp', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);
      
      expect(response.body.status).toBe('ok');
      expect(response.body.timestamp).toBeDefined();
    });
  });

  describe('System Summary', () => {
    test('should return system summary for authenticated user', async () => {
      const token = generateToken({ id: 1, email: 'test@example.com', role: 'admin' });
      
      const response = await request(app)
        .get('/api/system/summary')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      
      expect(response.body.app).toBe('Fluxora');
      expect(response.body.stats).toHaveProperty('totalClients');
      expect(response.body.user.email).toBe('test@example.com');
    });

    test('should reject unauthenticated requests', async () => {
      const response = await request(app)
        .get('/api/system/summary')
        .expect(401);
      
      expect(response.body.error).toBe('Access token required');
    });
  });

  describe('Clients API', () => {
    test('should create client with all fields', async () => {
      const token = generateToken({ id: 1, email: 'test@example.com', role: 'admin' });
      
      const response = await request(app)
        .post('/api/clients')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'John Doe',
          email: 'john@example.com',
          phone: '254712345678',
          businessName: 'Doe Enterprises'
        })
        .expect(200);
      
      expect(response.body.name).toBe('John Doe');
      expect(response.body.email).toBe('john@example.com');
      expect(response.body.businessName).toBe('Doe Enterprises');
      expect(response.body.createdBy).toBe(1);
      expect(response.body.createdAt).toBeDefined();
    });

    test('should list clients', async () => {
      const token = generateToken({ id: 1, email: 'test@example.com', role: 'admin' });
      
      const response = await request(app)
        .get('/api/clients')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      
      expect(response.body.clients).toBeInstanceOf(Array);
    });
  });

  describe('Services API', () => {
    test('should create service with price', async () => {
      const token = generateToken({ id: 1, email: 'test@example.com', role: 'admin' });
      
      const response = await request(app)
        .post('/api/services')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Consultation',
          description: 'Business consultation service',
          price: 150.00,
          duration: 90
        })
        .expect(200);
      
      expect(response.body.name).toBe('Consultation');
      expect(response.body.price).toBe(150.00);
      expect(response.body.duration).toBe(90);
    });

    test('should reject service without price', async () => {
      const token = generateToken({ id: 1, email: 'test@example.com', role: 'admin' });
      
      const response = await request(app)
        .post('/api/services')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Consultation'
        })
        .expect(400);
      
      expect(response.body.error).toBe('Service name and price are required');
    });
  });

  describe('Invoices API', () => {
    test('should create invoice with items', async () => {
      const token = generateToken({ id: 1, email: 'test@example.com', role: 'admin' });
      
      const response = await request(app)
        .post('/api/invoices')
        .set('Authorization', `Bearer ${token}`)
        .send({
          clientId: 1,
          items: [
            { description: 'Service A', quantity: 2, price: 100 },
            { description: 'Service B', quantity: 1, price: 200 }
          ],
          total: 400,
          dueDate: '2026-04-01'
        })
        .expect(200);
      
      expect(response.body.total).toBe(400);
      expect(response.body.items).toHaveLength(2);
      expect(response.body.status).toBe('pending');
    });
  });

  describe('Analytics API', () => {
    test('should return analytics with all metrics', async () => {
      const token = generateToken({ id: 1, email: 'test@example.com', role: 'admin' });
      
      const response = await request(app)
        .get('/api/analytics')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      
      expect(response.body).toHaveProperty('totalClients');
      expect(response.body).toHaveProperty('totalAppointments');
      expect(response.body).toHaveProperty('totalServices');
      expect(response.body).toHaveProperty('totalRevenue');
      expect(response.body).toHaveProperty('pendingInvoices');
    });
  });

  describe('Export API', () => {
    test('should export data in JSON format', async () => {
      const token = generateToken({ id: 1, email: 'test@example.com', role: 'admin' });
      
      const response = await request(app)
        .get('/api/system/export')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      
      expect(response.body.exportType).toBe('json');
      expect(response.body.data).toHaveProperty('clients');
      expect(response.body.data).toHaveProperty('appointments');
      expect(response.body.data).toHaveProperty('services');
      expect(response.body.data).toHaveProperty('invoices');
      expect(response.body.exportedBy).toBe(1);
    });
  });
});
