const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const data = JSON.parse(fs.readFileSync(`./data/video-details.json`));

const videosById = function (req, res) {
  const singularObj = data.find((v) => v.id === req.params.id);
  if (singularObj) {
    res.status('200').json({
      status: 'Sucess',
      data: singularObj,
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
    data: videoArr,
  });
};
//Post
const newVideo = function (req, res) {
  console.log(req.body);
  const random = Math.floor(Math.random() * 9);
  const current = new Date().valueOf();
  const userInput = {
    id: uuidv4(),
    title: req.body.title,
    description: req.body.description,
    channel: data[random].channel,
    duration: data[random].duration,
    views: data[random].views,
    likes: data[random].likes,
    timestamp: current,
    comments: data[random].comments,
    image: '/images/image9.jpg',
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
