var express = require('express');
var cors = require('cors');
require('dotenv').config()

var app = express();
var multer = require('multer');
const uploadStorage = multer({ dest: 'uploads/' })
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

app.post('/api/fileanalyse',uploadStorage.single("upfile"), (req,res) =>{
  return res.json({"name": req.file.originalname,
    "type": req.file.mimetype,
    "size": req.file.size})
})
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  },
})
