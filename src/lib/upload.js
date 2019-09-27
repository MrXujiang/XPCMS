import multer from '@koa/multer'
import { resolve } from 'path'
import fs from 'fs'

const rootImages = resolve(__dirname, '../../public/uploads')
//上传文件存放路径、及文件命名
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, rootImages)
    },
    filename: function (req, file, cb) {
        let [name, type] = file.originalname.split('.');
        cb(null, `${name}_${Date.now().toString(16)}.${type}`)
    }
})
//文件上传限制
const limits = {
    fields: 10,//非文件字段的数量
    fileSize: 1024 * 1024 * 2,//文件大小 单位 b
    files: 1//文件数量
}

export const upload = multer({storage,limits})

// 删除文件
export const delFile = (path) => {
    return new Promise((resolve, reject) => {
        fs.unlink(path, (err) => {
            if(err) {
                reject(err)
            }else {
                resolve(null)
            }
        })
    }) 
}

// 删除文件夹
export function deleteFolder(path) {
    var files = [];
    if(fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolder(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}

export function writeFile(path, data, encode) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, encode, (err) => {
            if(err) {
                reject(err)
            }else {
                resolve(null)
            }
        })
    })
}