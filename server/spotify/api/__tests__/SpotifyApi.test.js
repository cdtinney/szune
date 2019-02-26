const SpotifyApi = require('../SpotifyApi');

describe('withToken', () => {
  it('sets the access token on the api', () => {
    const mockSetAccessToken = jest.fn();
    SpotifyApi.prototype.setAccessToken = mockSetAccessToken;
    SpotifyApi.spotifyApiWithToken('foo');
    expect(mockSetAccessToken).toHaveBeenCalledWith('foo');
  });
});
