const ASSET_NAMES = [
  'tank.svg',
  'bullet.svg',
  'CALLUM.jpg',
  'HAYDN.jpg',
  'MICHAEL.jpg',
  'ISKANDER.jpg',
  'JACOB.jpg',
  'TITLE.jpg'
];

// load asset file names

const assets = {};

const downloadPromise = Promise.all(ASSET_NAMES.map(downloadAsset));

// once connection is established, load assets into array and export.

function downloadAsset(assetName) {
  return new Promise(resolve => {
    const asset = new Image();
    asset.onload = () => {
      console.log(`Downloaded ${assetName}`);
      assets[assetName] = asset;
      resolve();
    };
    asset.src = `/assets/${assetName}`;
  });
}

export const downloadAssets = () => downloadPromise;

export const getAsset = assetName => assets[assetName];
