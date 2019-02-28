////////////////////////////
// External dependencies  //
////////////////////////////

import { createSelector } from 'reselect';

////////////////////////////
// Internal dependencies  //
////////////////////////////

import flatten from '../utils/flatten';

export function nowPlayingInfoSelector(state) {
  return state.spotify.nowPlaying.info;
}

export function nowPlayingRelatedAlbumArtists(state) {
  return state.spotify.nowPlaying.relatedAlbums.byArtist;
}

export const nowPlayingArtistNamesSelector =
  createSelector(
    nowPlayingInfoSelector,
    (info) => {
      return (info.songArtists || [])
        .map(artist => artist.name)
        .join(', ');
    },
  );

export const relatedAlbumImagesSelector =
  createSelector(
    nowPlayingRelatedAlbumArtists,
    (byArtist) => {
      return flatten(
        Object.values(byArtist),
        entry => entry.albums,
      ).map(album => ({
        title: album.name,
        images: {
          fullSize: album.images[0].url,
          thumbnail: album.images[album.images.length - 1].url,
        },
      }));
    },
  );