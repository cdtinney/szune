///////////////////////////
// External dependencies //
///////////////////////////

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const styles = (theme) => ({
  card: {
    display: 'flex',
    position: 'absolute',
    flexWrap: 'wrap',
    alignItems: 'center',
    left: '30px',
    bottom: '30px',
    // Position in bottom-left.
    alignSelf: 'flex-start',
    marginTop: 'auto',
    // Ensure it's displayed over the color overlay
    zIndex: 100,
    animation: 'fadein 1s',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
  },
  content: {
    flex: '1 0 auto',
    padding: '16px 0',
  },
  cover: {
    width: 151,
    height: 151,
    marginRight: 16,
    border: '2px solid rgba(252, 252, 252, 0.95)',
    transition: 'background-image 1s ease-in 1s',
    boxShadow: theme.shadows[6],
  },
  text: {
    color: theme.palette.text.primary,
    maxWidth: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textShadow: '2px 2px 7px rgba(94,94,94,0.44)',
  },
  artistText: {
    fontSize: '1.5em',
    fontWeight: 'bold',
    animation: 'fadein 2s',
  },
  albumText: {
    fontSize: '1.2em',
    animation: 'fadein 2s',
  },
  titleText: {
    fontSize: '1.2em',
    marginTop: '1.2em',
    animation: 'fadein 2s',
  },
});

export function SongCard(props) {
  const {
    artistName,
    songTitle,
    albumName,
    albumImageUrl,
    classes,
  } = props;

  return (
    <div className={classes.card}>
      <CardMedia
        className={classes.cover}
        image={albumImageUrl}
        title={albumName}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <div className={`${classes.text} ${classes.artistText}`}>
            {artistName.toUpperCase()}
          </div>
          <div className={`${classes.text} ${classes.albumText}`}>
            {albumName.toUpperCase()}
          </div>
          <div className={`${classes.text} ${classes.titleText}`}>
            {songTitle}
          </div>
        </CardContent>
      </div>
    </div>
  );
}

SongCard.propTypes = {
  artistName: PropTypes.string.isRequired,
  songTitle: PropTypes.string.isRequired,
  albumName: PropTypes.string.isRequired,
  albumImageUrl: PropTypes.string.isRequired,
};

export default withStyles(styles)(SongCard);
