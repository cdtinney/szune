///////////////////////////
// External dependencies //
///////////////////////////

import React from 'react';
import PropTypes from 'prop-types';
import Masonry from 'react-masonry-component';
import { withStyles } from '@material-ui/core/styles';

//////////////////////////
// Internal dependencies//
//////////////////////////

import AlbumImage from './components/AlbumImage';

const styles = {
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
};

function AlbumGrid(props) {
  const {
    classes,
    albums,
    ui: {
      albumSize,
    },
  } = props;

  if (!albums.length) {
    return null;
  }

  return (
    <Masonry
      className={classes.root}
      options={{
        // Animation transition duration when items change
        transitionDuration: 1,
      }}
    >
      {albums.map(album => (
        <AlbumImage
          key={album.id}
          src={album.images.fullSize}
          alt={album.title}
          width={albumSize}
          height={albumSize}
        />
      ))}
    </Masonry>
  );
}

AlbumGrid.propTypes = {
  classes: PropTypes.object.isRequired,
  albums: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    images: PropTypes.shape({
      fullSize: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
  ui: PropTypes.shape({
    albumSize: PropTypes.number.isRequired,
  }).isRequired,
};

export default withStyles(styles)(AlbumGrid);
