const fs = require('fs');
const path = require('path');

const videoHtml = (subdir, cover, movie) => {
   subdir = encodeURIComponent(subdir);
   cover = encodeURIComponent(cover);
   movie = encodeURIComponent(movie);
   return `<video controls poster="movies/${subdir}/${cover}" onended="this.load();">
   <source src="movies/${subdir}/${movie}" type="video/mp4" />
</video>
`; }
const indexHtml = (videos) => `<style>
  video {
    object-fit: contain;
    max-height: 100vh;
    width: 100%;
    height: auto;
    }
</style>
${videos}
`;

const folders = fs.readdirSync(path.join(__dirname, 'movies'), {encoding: "utf8", withFileTypes: true}).filter(f => f.isDirectory);
const Videos = folders.map(folder => {
  const files = fs.readdirSync(path.join(__dirname, 'movies', folder.name));
  const cover = files.filter(file => file.split('.').pop() === 'jpg');
  const movie = files.filter(file => file.split('.').pop() === 'mp4');
  return (cover.length === 1 && movie.length === 1) 
    ? videoHtml(folder.name, cover[0], movie[0]) 
    : '';
  }).join('\n');
module.exports = indexHtml(Videos);  