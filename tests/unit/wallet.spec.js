const WalletService = require('../../src/services/wallet');
const mongoose = require('mongoose');

describe('WalletService', () => {
  let walletService;
  let mockDb;

  beforeEach(() => {
    mockDb = {
      Wallet: {
        create: jest.fn(),
      },
      findWalletByUserId: jest.fn(),
    };
    walletService = new WalletService(mockDb);
  });

  describe('createWallet', () => {
    it('should create a new wallet with default values', async () => {
      const walletData = { userId: 'user123' };
      const expectedWallet = {
        ...walletData,
        _id: new mongoose.Types.ObjectId(),
        currency: 'USD',
        balance: 0,
        status: 'active',
      };
      mockDb.findWalletByUserId.mockResolvedValue(null);
      mockDb.Wallet.create.mockResolvedValue(expectedWallet);

      const wallet = await walletService.createWallet(walletData);

      expect(mockDb.findWalletByUserId).toHaveBeenCalledWith('user123');
      expect(mockDb.Wallet.create).toHaveBeenCalledWith(expect.objectContaining({
        userId: 'user123',
        currency: 'USD',
        balance: 0,
      }));
      expect(wallet).toEqual(expectedWallet);
    });
  });
});
