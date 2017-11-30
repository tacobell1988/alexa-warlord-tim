const AWS = require("aws-sdk");
const Fs = require("fs");
const shortid = require("shortid");

// Create an Polly client
const Polly = new AWS.Polly({
  signatureVersion: "v4",
  region: "us-east-1"
});

const s3 = new AWS.S3({
  signatureVersion: "v4",
  region: "us-east-1"
});

const bucketName = "warlordtim";

const saveToS3 = function(filename, binaryData, cb) {
  var params = {
    Body: binaryData,
    Bucket: bucketName,
    Key: filename,
    ACL: "public-read"
  };
  s3.putObject(params, cb);
};

const getUrl = function(filename) {
  return `https://s3.amazonaws.com/warlordtim/${filename}`;
};

const invokePolly = function(text, cb) {
  const params = {
    Text: "<speak>" + text + "</speak>",
    TextType: "ssml",
    OutputFormat: "mp3",
    VoiceId: "Hans"
  };
  console.log(params.Text);
  Polly.synthesizeSpeech(params, (err, data) => {
    if (err) {
      console.log(err.code);
    } else if (data) {
      if (data.AudioStream instanceof Buffer) {
        const fileId = `${shortid.generate()}.mp3`;
        saveToS3(fileId, data.AudioStream, function(err, data) {
          if (err) {
            return cb(err, null);
          }
          cb(null, getUrl(fileId));
        });
      }
    }
  });
};

module.exports = invokePolly;
