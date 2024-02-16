const { createPokemon } = require('../../../controllers/pokemon');
const Pokemon = require('../../../models/pokemon');

jest.mock('../../../models/pokemon', () => ({
  create: jest.fn(),
}));

describe('createPokemon', () => {
  beforeEach(() => {
    Pokemon.create.mockReset();

    jest.clearAllMocks();
  });
    
  it('creates a pokemon successfully', async () => {
    Pokemon.create.mockResolvedValue({ id: 1, tipo: 'Fogo', treinador: 'Ash' });

    const mockReq = {
      body: { tipo: 'Fogo', treinador: 'Ash' },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await createPokemon(mockReq, mockRes);

    expect(Pokemon.create).toHaveBeenCalledWith({ tipo: 'Fogo', treinador: 'Ash' });
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.send).toHaveBeenCalledWith({ id: 1, tipo: 'Fogo', treinador: 'Ash' });
  });

  it('returns 400 if tipo is missing', async () => {
    const mockReq = {
      body: { treinador: 'Ash' },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  
    await createPokemon(mockReq, mockRes);
  
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.send).toHaveBeenCalledWith(expect.objectContaining({ message: expect.any(String) }));
  });
  

  it('returns 400 if treinador is missing', async () => {
    const mockReq = {
      body: { tipo: 'Fogo' },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  
    await createPokemon(mockReq, mockRes);
  
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.send).toHaveBeenCalledWith(expect.objectContaining({ message: expect.any(String) }));
  });  

  it('save tipo with first letter capitalized', async () => {
    const mockReq = {
      body: { tipo: 'fogo', treinador: 'Ash' },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await createPokemon(mockReq, mockRes);

    expect(Pokemon.create).toHaveBeenCalledWith({ tipo: 'Fogo', treinador: 'Ash' });
  });
});
