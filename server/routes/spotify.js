const { spotifyApiWithToken } =
  require('../spotify/api/SpotifyApi');
const getCurrentlyPlayingRelatedAlbums =
  require('../spotify/api/helpers/getCurrentlyPlayingRelatedAlbums');

//////////////
// Helpers  //
//////////////

function accessToken(req) {
  if (!req.user || !req.user.spotifyAccessToken) {
    throw new Error('Request has no user or access token');
  }

  return req.user.spotifyAccessToken;
}

//////////////////////
// Route functions  //
//////////////////////

/**
* `/currently-playing/related-albums` endpoint.
*
* Returns a list of albums related to the currently playing track.
*/
function currentlyPlayingRelatedAlbums(req, res, next) {
  const {
    query: {
      songId,
    },
  } = req;

  const spotifyApi = spotifyApiWithToken(accessToken(req));
  getCurrentlyPlayingRelatedAlbums(spotifyApi, songId)
    .then(albums => res.send(albums))
    .catch(next);
};

function me(req, res, next) {
  spotifyApiWithToken(accessToken(req)).getMe()
    .then(response => res.send(response.body))
    .catch(next);
};

function mePlayer(req, res, next) {
  spotifyApiWithToken(accessToken(req)).getMyCurrentPlaybackState()
    .then(response => res.send(response.body))
    .catch(next);
};

module.exports.currentlyPlayingRelatedAlbums = currentlyPlayingRelatedAlbums;
module.exports.me = me;
module.exports.mePlayer = mePlayer;
