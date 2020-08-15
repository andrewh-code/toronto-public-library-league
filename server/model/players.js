// let players  = {
//     1: {
//       id: '1',
//       username: 'Robin Wieruch',
//     },
//     2: {
//       id: '2',
//       username: 'Dave Davids',
//     }
//   };

// export default {
//     players
// }

import fs from 'fs';

// modify playersController for the season stats
let season05Data = JSON.parse(fs.readFileSync('./data/TPLSeason05StatsTransformed.json'))
let season07Data = JSON.parse(fs.readFileSync('./data/TPLSeason07StatsTransformed.json'));
let season08Data = JSON.parse(fs.readFileSync('./data/TPLSeason08StatsTransformed.json'));
let season09Data = JSON.parse(fs.readFileSync('./data/TPLSeason09StatsTransformed.json')); 
let season10Data = JSON.parse(fs.readFileSync('./data/TPLSeason10StatsTransformed.json'));
let season11Data = JSON.parse(fs.readFileSync('./data/TPLSeason11StatsTransformed.json'));
let season12Data = JSON.parse(fs.readFileSync('./data/TPLSeason12StatsTransformed.json'));
let season13Data = JSON.parse(fs.readFileSync('./data/TPLSeason13StatsTransformed.json'));
let season14Data = JSON.parse(fs.readFileSync('./data/TPLSeason14StatsTransformed.json'));
let season16Data = JSON.parse(fs.readFileSync('./data/TPLSeason16StatsTransformed.json'));

export default {
    season05Data,
    season07Data,
    season08Data,
    season09Data,
    season10Data,
    season11Data,
    season12Data,
    season13Data,
    season14Data,
    season16Data
}