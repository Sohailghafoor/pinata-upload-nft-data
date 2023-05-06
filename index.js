const pinataSDK = require("@pinata/sdk");
require("dotenv").config();
const fs = require("fs");
const pinata = new pinataSDK(
  process.env.PINATA_API_KEY,
  process.env.PINATA_API_SECRET
);
const readableStreamForFile = fs.createReadStream("./images/1.png");

const options = {
  pinataMetadata: {
    name: "My NFT Collection",
    keyvalues: {
      customKey: "customValue",
      customKey2: "customValue2",
    },
    pinataOptions: {
      cidVersion: 0,
    },
  },
};
const pinFileToIPFS = () => {
  return pinata
    .pinFileToIPFS(readableStreamForFile, options)
    .then((result) => {
      //handle successful authentication here
      return `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
    })
    .catch((err) => {
      //handle error here
      console.log(err);
    });
};

const pinJSONToIPFS = (body) => {
  return pinata.pinJSONToIPFS(body, options).then((result) => {
    return `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
  });
};
const getMetadata = async () => {
  const imageUrl = await pinFileToIPFS();
  console.log(imageUrl);
  const body = {
    name: "My NFT Collection",
    description: "This is my awesome collection of NFT",
    image: imageUrl,
  };
  const metadata = await pinJSONToIPFS(body);
  console.log(metadata);
};
getMetadata();

// https://gateway.pinata.cloud/ipfs/Qmcf7HfQzKgxSrXZxJAqyreAA1kCxZmaU8uuDH26if78ET
// https://gateway.pinata.cloud/ipfs/QmdXUAo8JP5CgdLGGLv7k1QU5kYk3zXiCWR2B3g9PrbQc4
