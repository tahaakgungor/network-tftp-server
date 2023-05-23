const express = require('express');
const fs = require('fs');
const cors = require("cors");
const tftpRoutes = require("./routes/tftpRoutes");
const { Client } = require('ssh2-sftp-client');

const app = express();
app.use(cors());

app.use('/tftp', tftpRoutes);


// SFTP ile dosya yükleme işlemini gerçekleştirme


// Express uygulamasını başlatın
app.listen(4000, () => {
  console.log('Server started on port 4000');
});
