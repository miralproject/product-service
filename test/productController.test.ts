import { expect } from 'chai';
import request from 'supertest';
import app from '../src/app';

describe('Product API', () => {
  it('should create a new product', async () => {
    const response = await request(app)
      .post('/api/products')
      .send({ name: 'Product 1', description: 'Description of Product 1', price: 100 })
      .expect(201);

    expect(response.body).to.have.property('name', 'Product 1');
    expect(response.body).to.have.property('description', 'Description of Product 1');
    expect(response.body).to.have.property('price', 100);
  });

  it('should get all products', async () => {
    const response = await request(app).get('/api/products').expect(200);
    expect(response.body).to.be.instanceOf(Array);
  });

  it('should get product by ID', async () => {
    const createResponse = await request(app)
      .post('/api/products')
      .send({ name: 'Product 2', description: 'Description of Product 2', price: 200 });

    const productId = createResponse.body.id;
    const response = await request(app).get(`/api/products/${productId}`).expect(200);
    expect(response.body).to.have.property('id', productId);
  });

  it('should get product by ID Not Found', async () => {
    const productId = 10;
    const response = await request(app).get(`/api/products/${productId}`).expect(404);
    expect(response.body).to.have.property('error', 'Product not found')
  });

  it('should update a product', async () => {
    const createResponse = await request(app)
      .post('/api/products')
      .send({ name: 'Product 3', description: 'Description of Product 3', price: 300 });

    const productId = createResponse.body.id;
    const response = await request(app)
      .put(`/api/products/${productId}`)
      .send({ name: 'Updated Product', description: 'Updated Description', price: 350 })
      .expect(200);

    expect(response.body).to.have.property('name', 'Updated Product');
    expect(response.body).to.have.property('description', 'Updated Description');
    expect(response.body).to.have.property('price', 350);
  });

  it('should update a product not found', async () => {
    const productId = 10;
    const response = await request(app).put(`/api/products/${productId}`).expect(404);
    expect(response.body).to.have.property('error', 'Product not found')
  });

  it('should delete a product', async () => {
    const createResponse = await request(app)
      .post('/api/products')
      .send({ name: 'Product 4', description: 'Description of Product 4', price: 400 });

    const productId = createResponse.body.id;
    const response = await request(app).delete(`/api/products/${productId}`).expect(200);
    expect(response.body).to.have.property('id', productId);
  });

  it('should delete a product not found', async () => {
    const productId = 10;
    const response = await request(app).delete(`/api/products/${productId}`).expect(404);
    expect(response.body).to.have.property('error', 'Product not found')
  });
});
