import React from 'react';
import ReactDOM from 'react-dom';
import SongCard from '../';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <SongCard
      artistName="foo"
      songTitle="bar"
      albumImage="baz"
      albumTitle="cat"
      />,
    div);
  ReactDOM.unmountComponentAtNode(div);
});
