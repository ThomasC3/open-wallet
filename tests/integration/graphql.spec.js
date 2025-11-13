const request = require('supertest');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('../../src/graphql/schema');
const WalletService = require('../../src/services/wallet');

jest.mock('../../src/services/wallet');

describe('GraphQL API', () => {
  let app;
  let mockWalletService;

  beforeEach(() => {
    mockWalletService = new WalletService();
    app = express();
    const schema = require('../../src/graphql/schema')(mockWalletService);
    app.use(
      '/graphql',
      graphqlHTTP({
        schema,
        graphiql: false,
      }),
    );
  });

  it('returns a wallet by id', async () => {
    const wallet = { id: '1', userId: 'user123', balance: '100', currency: 'USD', status: 'active' };
    mockWalletService.getWallet.mockResolvedValue(wallet);

    const query = `
      query {
        wallet(id: "1") {
          id
          userId
          balance
        }
      }
    `;

    const res = await request(app)
      .post('/graphql')
      .send({ query });

    expect(res.statusCode).toEqual(200);
    expect(res.body.data.wallet).toEqual({
      id: '1',
      userId: 'user123',
      balance: '100',
    });
  });
});
