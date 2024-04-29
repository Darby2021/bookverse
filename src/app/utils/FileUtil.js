const {unlink} = require('node:fs')
const path = require("path");

module.exports = {
    DeleteFile: (path, file_name) => {
        unlink(path + file_name, (error) => {
            if(error){
                console.log('unlink error', error)
            }
        });
    },
    GetFullPathOfFile(absolute_path){
        return path.join(__dirname, '../../../' + absolute_path)
    }
}