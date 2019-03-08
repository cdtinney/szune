///////////////////////////
// External dependencies //
///////////////////////////

import { connect } from 'react-redux';
import windowSize from 'react-window-size';

//////////////////////////
// Internal dependencies//
//////////////////////////

import * as nowPlayingSelectors from
  '../../../../selectors/nowPlayingSelectors';
import AlbumGrid from './view';

import calculateColumnSize from './utils/calculateColumnSize';
import memoizeWithCache from './utils/memoizeWithCache';

const memoizedCalculateColumnSize =
  memoizeWithCache(
    args => args.windowWidth,
    calculateColumnSize,
  );

function mapStateToProps(state, ownProps) {
  const {
    ui: {
      albums: {
        minSize,
        maxSize,
      },
    },
  } = state;

  const {
    windowWidth,
  } = ownProps;

  const columnSize = memoizedCalculateColumnSize({
    windowWidth,
    minSize,
    maxSize,
  });

  return {
    albums: nowPlayingSelectors.relatedAlbumImagesSelector(state),
    ui: {
      albumSize: columnSize,
    },
  };
}

const ConnectedComponent = connect(
  mapStateToProps,
  undefined,
)(AlbumGrid);

export default windowSize(ConnectedComponent);
