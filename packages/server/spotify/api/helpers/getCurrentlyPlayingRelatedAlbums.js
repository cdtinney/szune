const getRelatedArtists =
  require('./getRelatedArtists');
const getArtistStudioAlbums =
  require('./getArtistStudioAlbums');
const combineTrackArtists =
  require('../../utils/combineTrackArtists');

module.exports = async function getCurrentlyPlayingRelatedAlbums(spotifyApi, songId) {
  const response = await spotifyApi.getMyCurrentPlayingTrack();
  const {
    item: {
      id,
      artists: songArtists,
      album: {
        artists: albumArtists,
      },
    },
  } = response.body;

  // ID mismatch -- the song has likely changed (this is a race condition).
  if (songId !== id) {
    return Promise.reject(
      new Error(`Song ID mismatch (currently playing = ${id}, query = ${songId})`));
  }

  const combinedArtists = combineTrackArtists({
    songArtists,
    albumArtists,
  });

  const relatedArtistIds =
    await getRelatedArtists(spotifyApi, combinedArtists);
  const requests = [...relatedArtistIds]
    .map(artistId => getArtistStudioAlbums(spotifyApi, artistId));
  return Promise.all(requests);
};