const fetch = require('node-fetch'); // wait node 18+ has fetch natively
fetch('https://bharathiconstructionshyd.com')
  .then(res => res.text())
  .then(text => {
    const urls = new Set();
    const regex = /href=(['"])(.*?bharathi.*?)\1/gi;
    let match;
    while ((match = regex.exec(text)) !== null) {
      urls.add(match[2]);
    }
    console.log(Array.from(urls).join('\n'));
  }).catch(console.error);
