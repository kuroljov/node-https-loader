import https from 'https';

export default function fetchModule(url) {
  return new Promise((next) => {
    https.get(url, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        next(data);
      });
    });
  });
}
