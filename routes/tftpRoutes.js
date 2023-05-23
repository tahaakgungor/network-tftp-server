  const express = require('express');
  const router = express.Router();
  const multer = require('multer');
  const upload = multer({ dest: 'uploads/' });
  let Client = require('ssh2-sftp-client');
  let sftp = new Client();

  let tftp = require('tftp');

  router.post('/upload/device', upload.single('file'), async (req, res) => {
    const { ip } = req.query;
    const filename = req.file.filename;
    const localFilePath = `uploads/${filename}`;
    const remoteFilePath = `skins/${filename}`;

    const sftpConfig = {
      host: ip,
      port: 22, // SFTP port
      username: 'admin',
      password: 'admin  ',
      
      algorithms: {
        kex: [
          "diffie-hellman-group1-sha1",
          "ecdh-sha2-nistp256",
          "ecdh-sha2-nistp384",
          "ecdh-sha2-nistp521",
          "diffie-hellman-group-exchange-sha256",
          "diffie-hellman-group14-sha1"
          
        ],
        cipher: [
          "3des-cbc",
          "aes128-cbc",
          "aes192-cbc",
          "aes256-cbc",
          "aes256-ctr",
        ],
        
        hmac: [
          "hmac-sha1",
          "hmac-sha2-256",
          "hmac-sha2-512"
        ]
        
    }
      
      
    };



    

    try {
      await sftp.connect(sftpConfig)
      await sftp.put(localFilePath, remoteFilePath);
      console.log('File uploaded successfully');
      res.status(200).json({ message: 'File uploaded successfully' });
    } catch (err) {
      console.error('SFTP error:', err);
      res.status(500).json({ error: 'Failed to upload file' });
    } finally {
      sftp.end();
    }
  });

  module.exports = router;
