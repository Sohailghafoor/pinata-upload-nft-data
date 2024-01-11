const pinataSDK = require("@pinata/sdk");
require("dotenv").config();
const fs = require("fs");
const pinata = new pinataSDK(
  process.env.PINATA_API_KEY,
  process.env.PINATA_API_SECRET
);

// Path to your existing JSON file
const jsonFilePath = "./file/1.json";

const pinJSONFileToIPFS = async (filePath) => {
  try {
    // Read the JSON file
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    // Pin the JSON data to IPFS
    const result = await pinata.pinJSONToIPFS(jsonData);

    // Return the IPFS URL
    return `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
  } catch (error) {
    throw error;
  }
};

const getMetadata = async () => {
  try {
    const metadata = await pinJSONFileToIPFS(jsonFilePath);
    console.log(metadata);
  } catch (err) {
    console.error(err);
  }
};

getMetadata();
