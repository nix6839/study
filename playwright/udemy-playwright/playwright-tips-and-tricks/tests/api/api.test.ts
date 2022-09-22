import { expect, test } from '@playwright/test';

test.describe.parallel('API testing', () => {
  const baseURL = 'https://reqres.in/api';

  test('Simple API test - Assert response status', async ({ request }) => {
    const response = await request.get(`${baseURL}/users/3`);
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
  });

  test('Simple API test - Assert invalid endpoint', async ({ request }) => {
    const response = await request.get(
      `${baseURL}/users/non-existing-endpoint`,
    );
    expect(response.status()).toBe(404);
  });

  test('GET Request - Get user detail', async ({ request }) => {
    const response = await request.get(`${baseURL}/users/1`);
    const responseBody = await response.json();
    expect(response.status()).toBe(200);
    expect(typeof responseBody.data.id).toBe('number');
    expect(typeof responseBody.data.first_name).toBe('string');
    expect(typeof responseBody.data.last_name).toBe('string');
    expect(typeof responseBody.data.email).toBe('string');
  });

  test('POST Request - Create new user', async ({ request }) => {
    const response = await request.post(`${baseURL}/users`, {
      data: {
        id: 1000,
      },
    });
    const responseBody = await response.json();
    expect(responseBody.id).toBe(1000);
    expect(typeof responseBody.createdAt).toBe('string');
  });

  test('POST Request - Login', async ({ request }) => {
    const response = await request.post(`${baseURL}/login`, {
      data: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka',
      },
    });
    const responseBody = await response.json();

    expect(response.status()).toBe(200);
    expect(typeof responseBody.token).toBe('string');
  });

  test('POST Request - Login failed', async ({ request }) => {
    const response = await request.post(`${baseURL}/login`, {
      data: {
        email: 'eve.holt@reqres.in',
      },
    });
    const responseBody = await response.json();

    expect(response.status()).toBe(400);
    expect(responseBody.error).toBe('Missing password');
  });

  test('PUT Request - Update user', async ({ request }) => {
    const response = await request.put(`${baseURL}/users/1`, {
      data: {
        name: 'new name',
        job: 'new job',
      },
    });
    const responseBody = await response.json();

    expect(response.status()).toBe(200);
    expect(responseBody.name).toBe('new name');
    expect(responseBody.job).toBe('new job');
    expect(typeof responseBody.updatedAt).toBe('string');
  });

  test('DELETE Request - Delete user', async ({ request }) => {
    const response = await request.delete(`${baseURL}/users/1`);

    expect(response.status()).toBe(204);
  });
});
