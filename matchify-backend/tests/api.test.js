// tests/api.test.js
const request = require('supertest');
const app = require('../src/app');
const path = require('path');

describe('Authentication & Profile API', () => {
  let authToken;
  const testUser = {
    email: 'test@example.com',
    password: 'password123'
  };

  describe('User Registration', () => {
    it('should register a new user successfully', async () => {
      const res = await request(app)
        .post('/api/register')
        .send(testUser)
        .expect(201);

      expect(res.body).toHaveProperty('message', 'User registered successfully');
    });

    it('should reject registration with missing fields', async () => {
      const res = await request(app)
        .post('/api/register')
        .send({ email: testUser.email })
        .expect(400);

      expect(res.body).toHaveProperty('error', 'Email and password are required');
    });

    it('should prevent duplicate email registration', async () => {
      await request(app)
        .post('/api/register')
        .send(testUser)
        .expect(409);
    });
  });

  describe('User Login', () => {
    it('should login successfully with valid credentials', async () => {
      const res = await request(app)
        .post('/api/login')
        .send(testUser)
        .expect(200);

      expect(res.body).toHaveProperty('token');
      authToken = res.body.token;
      console.log(authToken + "authtoken")
    });

    it('should reject login with invalid password', async () => {
      await request(app)
        .post('/api/login')
        .send({ ...testUser, password: 'wrongpassword' })
        .expect(401);
    });

    it('should reject login with non-existent email', async () => {
      await request(app)
        .post('/api/login')
        .send({ email: 'nonexistent@example.com', password: 'password123' })
        .expect(401);
    });
  });

  describe('Profile Creation', () => {
    const validProfile = {
      name: 'John Doe',
      age: '25',
      gender: 'Male',
      location: 'New York',
      interests: 'Reading, Travel, Music'
    };

    it('should create profile with valid inputs', async () => {
      const res = await request(app)
        .post('/api/profiles')
        .set('Authorization', `Bearer ${authToken}`)
        .field(validProfile)
        .attach('profilePicture', path.join(__dirname, '../uploads/test-uploads/valid-profile-pic.jpg'))
        .expect(201);

      expect(res.body).toMatchObject({
        name: validProfile.name,
        age: parseInt(validProfile.age),
        gender: validProfile.gender,
        location: validProfile.location,
        interests: ['Reading', 'Travel', 'Music']
      });
    });

    it('should reject profile creation without authentication', async () => {
      await request(app)
        .post('/api/profiles')
        .field(validProfile)
        .expect(401);
    });

    it('should reject profile with missing required fields', async () => {
      const invalidProfile = { ...validProfile };
      delete invalidProfile.name;

      await request(app)
        .post('/api/profiles')
        .set('Authorization', `Bearer ${authToken}`)
        .field(invalidProfile)
        .expect(400);
    });

    it('should reject profile with invalid age', async () => {
      await request(app)
        .post('/api/profiles')
        .set('Authorization', `Bearer ${authToken}`)
        .field({ ...validProfile, age: '17' })
        .expect(400);
    });
  });

  describe('Profile Retrieval', () => {
    it('should retrieve existing profile', async () => {
      const res = await request(app)
        .get(`/api/profiles/${testUser.email}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(res.body).toHaveProperty('name', 'John Doe');
    });

    it('should return 404 for non-existent profile', async () => {
      await request(app)
        .get('/api/profiles/nonexistent@example.com')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);
    });
  });
});