var fileHost = "http://www.fuyunxuan.cn/zycm/"
var config = {
  //aliyun OSS config
  uploadImageUrl: `${fileHost}`, //默认存在根目录，可根据需求改
  AccessKeySecret: 'KyINVJlFPlfNZdehBH5SiUPkBOCXDH',
  OSSAccessKeyId: 'LTAIn57BO0IcueW5',
  timeout: 87600 //这个是上传文件时Policy的失效时间
};
module.exports = config