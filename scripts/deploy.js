var SftpUpload = require('sftp-upload'),
    fs = require('fs'),
    path = require('path');

var options = {
        host:'192.168.198.70',
        username: 'unovo',
        password: "123456",
        port: "8889",
        path: path.resolve(__dirname, '../dist'),
        remoteDir: '/Users/unovo/Documents/test-deploy/'
    },
    sftp = new SftpUpload(options);

sftp.on('error', function(err) {
    throw err;
})
    .on('uploading', function(progress) {
        console.log('Uploading', progress.file);
        console.log(progress.percent+'% completed');
    })
    .on('completed', function() {
        console.log('Upload Completed');
    })
    .upload();