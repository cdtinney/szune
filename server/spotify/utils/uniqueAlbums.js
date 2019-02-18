const types = [
  'Deluxe',
  'Extended',
  'International',
  'Special',
  'Standard',
];

const suffixes = [
  '',
  'Edition',
  'Version',
];

const typesWithSuffixes = types.reduce((acc, type) => {
  return acc.concat(suffixes.map(suffix => `${type} ${suffix}`));
}, []);

const joinedTypesWithSuffixes = typesWithSuffixes.join('|');
const openingBrace = `(\\[|\\()`;
const closingBrace = `(\\]|\\))`;
const suffixRegexp =
  new RegExp(`(${openingBrace}${joinedTypesWithSuffixes}${closingBrace})`, 'g');

// Filters out some common suffixes that results in duplicate
// album covers, such as special and deluxe edition albums.
function baseAlbumName(albumName) {
  return albumName.replace(suffixRegexp, '');
}

module.exports = function uniqueAlbums(albums) {
  // Remove duplicates by name.
  // For some reason, the API returns duplicates with different
  // IDs and image URLs.
  const uniqueMap = albums.reduce((map, album) => {
    const name = baseAlbumName(album.name);
    if (map[name]) {
      return map;
    }

    map[name] = album;
    return map;
  }, {});
  return Object.values(uniqueMap);
};