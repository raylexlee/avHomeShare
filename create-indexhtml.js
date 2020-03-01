const fs = require('fs');
const path = require('path');

const videoHtml = (subdir, cover, movie) => `<video controls width="auto" height="100%" poster="movies/${subdir}/${cover}">
   <source src="movies/${subdir}/${movie}" type="video/mp4" />
</video>
`;

const folders = fs.readdirSync(path.join(__dirname, 'movies'), {encoding: "utf8", withFileTypes: true}).filter(f => f.isDirectory);
module.exports = folders.map(folder => {
  const files = fs.readdirSync(path.join(__dirname, 'movies', folder.name));
  const cover = files.filter(file => file.split('.').pop() === 'jpg');
  const movie = files.filter(file => file.split('.').pop() === 'mp4');
  return (cover.length === 1 && movie.length === 1) ? videoHtml(folder.name, cover[0], movie[0]) : '';
  }).join('\n');

  