const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const data = JSON.parse(fs.readFileSync(`./data/video-details.json`));

const videosById = function (req, res) {
  const singularObj = data.find((v) => v.id === req.params.id);
  if (singularObj) {
    res.status('200').json({
      status: 'Sucess',
    });
  } else {
    res.status('404').json({
      status: 'video not found',
    });
  }
};
const sideVideos = function (req, res) {
  const videoArr = [];
  data.forEach((element) => {
    const { id, channel, image, title } = element;
    videoArr.push({ id, channel, image, title });
  });
  res.status('200').json({
    status: 'Success',
    video: videoArr,
  });
};
//Post
const newVideo = function (req, res) {
  console.log(req.body);
  const current = new Date();
  const userInput = {
    id: uuidv4(),
    title: req.body.title,
    Text: req.body.description,
    date: current.toLocaleDateString(),
    time: current.toLocaleTimeString(),
  };
  data.push(userInput);
  fs.writeFile(
    '../data/video-details.json',
    JSON.stringify(data),
    res.send({
      status: 'success',
      data: data,
    })
  );
};
module.exports = { videosById, sideVideos, newVideo };
