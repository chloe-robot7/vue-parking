<template>
  <div>
      <div class="crumbs">
          <el-breadcrumb separator="/">
              <el-breadcrumb-item><i class="el-icon-lx-calendar"></i>婚礼基本信息</el-breadcrumb-item>
              <el-breadcrumb-item>婚礼富媒体文件上传</el-breadcrumb-item>
          </el-breadcrumb>
      </div>
      <div class="container">
        <form>
          <input type="text" placeholder="请输入新人id" required v-model="uid"> 
          <input type="button" value="确认" @click="subIndex(uid)">
        </form>
          
        <!-- https://jsonplaceholder.typicode.com/posts/ -->
          <el-upload
              class="upload-demo"
              action="http://114.55.37.219:8081/files/activityImg"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :file-list="fileList"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>

          <!-- <div>
            <el-button @click="showDialog">点击展示视频《{{ this.videoFile[0] }}》</el-button>

            <el-dialog :visible.sync="dialogVisibleShow" width="50%">
              <video src="" controls width="100%" height="100%"></video>
            </el-dialog>
          </div> -->

          <div>
            <el-upload
              class="upload-video"
              action="http://114.55.37.219:8081/files/activityImg"
              accept="video/*"
              multiple
              :limit="3"
              :file-list="videoFile"
              :on-exceed="handleExceed"
              :before-remove="beforeRemove"
              :on-remove="handleRemoveVideo"
              :on-success="handleSuccessVideo"
              :on-preview="handlePreview">
              <el-button size="small" type="primary" id="upData">点击上传视频</el-button>
            </el-upload>

            <el-dialog :visible.sync="dialogVisible" width="50%">
              <video :src="videoUrl" controls width="100%" height="100%"></video>
            </el-dialog>

        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import { fetchMedia } from '../../api/index';
import { getWeddingData } from '../../api/index';
export default {
    data() {
      return {
        dialogVisible: false,
        dialogVisibleShow: false,
        videoUrl: '',
        time: '',
        getPhoto:[],
        getVideo:[],
        fileList: [
          // {name: '1.jpeg', id:'1', url: 'http://114.55.37.219:8081/images/7d84fc97bb674575b51158997b76a570.jpg'}, 
          // {name: '2.jpeg', id:'2',  url: 'http://114.55.37.219:8081/images/a0e2fc3e37fa4c4e9417e1399d04bc2d.jpg'},
          // {name: '3.jpeg', id:'3',  url: 'http://114.55.37.219:8081/images/9922fbbca83d40eb9d268b786aebb97a.jpg'},
          // {name: '4.jpeg', id:'4',  url: 'http://114.55.37.219:8081/images/7f8c7eb50ac7424a9db31851e0528461.jpg'},
            ],
        videoFile: [],
        postPhoto: [],
        postVideo: [],
        rawData: [],
        uid: void 0,
      };
    },
    created() {
      // this.getFileList();
      // this.getvideoFile()
        // this.getData();
    },
    methods: {
       subIndex(uid) {
        console.log(this.uid);
        axios.get(`http://114.55.37.219:8081/admin/login/weddingInfo/`+uid
           ).then(res => {
              console.log(res.data);
              this.fileList = res.data[1].map(function(val) {
                return { url: val.photo, id: val.id,uid: val.uid }
              })
              this.videoFile = res.data[2].map(function(val) {
                return { url: val.video, id: val.id ,name: val.title}
              })
          }).catch(function (error)
          {
              console.log(error);
          });
        // this.getFileList(uid);
        // this.getvideoFile(uid)
      },
       // 获取数据
       getData() {
            axios.get(`http://114.55.37.219:8081/admin/login/weddingInfo`,{
                    // id: this.fileList.id,
                }).then(res => {
                    // this.getData();
                }).catch(function (error)
                {
                    console.log(error);
                });
            let that=this;
            fetchMedia(this.query).then(res => {
                console.log(res);
                that.getPhoto = res[1];
                that.getVideo =res[2];
                console.log(that.fileList);
            });
      },
      // getvideoFile(uid) {


        // getWeddingData(this.query).then(res => {
        // console.log(res);
        // this.getVideo = res[uid][2].map(function(val) {
        //   return { url: val.video, id: val.id ,name: val.title}
        // })
        // this.videoFile = this.getVideo
        // })
      // },
      // getFileList(uid) {


        // getWeddingData(this.query).then(res => {
        // console.log(res);
        // this.getPhoto = res[uid][1].map(function(val) {
        //   return { url: val.photo, id: val.id,uid: val.uid }
        // })
        // this.fileList = this.getPhoto
        // })
      // },
       // 删除选择的数据
       delPhoto(id){
            console.log(id);
            axios.delete(`http://114.55.37.219:8081/files/deletePhoto`,{
                id: id
            }).then(res => {
              console.log(id);
              console.log(res+"删除成功photo");
            }).catch(function (error)
            {
                console.log(error);
            });
        },
        delVideo(id){
            console.log(id);
            axios.delete(`http://114.55.37.219:8081/files/deleteVideo`,{
                id: id
            }).then(res => {
              console.log(id);
              console.log(res);
            }).catch(function (error)
            {
                console.log(error);
            });
        },
      //移除图片
      handleRemove(file, fileList) {
        this.delPhoto(file.id);
        console.log(file, fileList,this.time);
      },
      //移除视频
      handleRemoveVideo(file, fileList) {
        this.delVideo(file.id);
        console.log(file, fileList,this.time);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleSuccess(res, file, fileList) {
        this.fileList.push({name: file.name, id:file.uid, url: res});
        this.postPhoto.push({name: file.name, id:file.uid, url: res});
        // this.savePhoto();
      },
      handleSuccessVideo(res, file, fileList) {
        this.videoFile.push({name: file.name, id:file.uid, url: res,});
        this.postVideo.push({name: file.name, id:file.uid, url: res, title: file.name});
        console.log(this.postVideo);
        this.saveVideo();
      },
      savePhoto() {
        axios.post(`http://114.55.37.219:8081/files/savePhoto`,{
              photo:this.postPhoto[0].url,
            }).then(res => {
                console.log(res);
            }).catch(function (error)
            {
                console.log(error);
            });
      },
      saveVideo() {
        axios.post(`http://114.55.37.219:8081/files/saveVideo`,{
              video:this.postVideo[0].url,
              title:this.postVideo[0].title.split(".")[0],
              
            }).then(res => {
                console.log(res);
            }).catch(function (error)
            {
                console.log(error);
            });
      },
      //视频测试
      showDialog() {
        this.dialogVisibleShow = true;
        // 这里可以从后端获取视频的url，或者从其他组件传递过来
        this.videoUrl = 'http://114.55.37.219:8081/images/94f4d47b28cf4f65879657e0367ced86.mp4';
      },
      handlePreview(file) {
        this.dialogVisible = true;
        this.videoUrl = file.url;
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      //上传前回调
      beforeUploadVideo(file) {
                var fileSize = file.size / 1024 / 1024 < 50;
                if (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb', 'video/mov'].indexOf(file.type) == -1) {
                    layer.msg("请上传正确的视频格式");
                    return false;
                }
                if (!fileSize) {
                    layer.msg("视频大小不能超过50MB");
                    return false;
                }
                this.isShowUploadVideo = false;
            },
            //进度条
            uploadVideoProcess(event, file, fileList) {
                this.videoFlag = true;
                this.videoUploadPercent = file.percentage.toFixed(0) * 1;
                getTime()
            },
            //上传成功回调
            handleVideoSuccess(res, file) {
                this.isShowUploadVideo = true;
                this.videoFlag = false;
                this.videoUploadPercent = 0;
                
                //前台上传地址
                //if (file.status == 'success' ) {
                //    this.videoForm.showVideoPath = file.url;
                //} else {
                //     layer.msg("上传失败，请重新上传");
                //}
                  //后台上传地址
                if (res.Code == 0) {
                    this.videoForm.showVideoPath = res.Data;
                } else {
                    layer.msg(res.Message);
                }
            },
            //动态获取时间
            getTime() {
              var date = new Date();
              var year = date.getFullYear();
              var month = date.getMonth() + 1;
              var day = date.getDate();
              var hour = date.getHours();
              var minute = date.getMinutes();
              var second = date.getSeconds();
              var time = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
              this.time = time;
            },
    }
  }
</script>

<style scoped>
  .upload-video {
      width: 100%;
      height: 100%;
      background: #fff;
      padding: 2.5% 0%;
  }
  .el-upload--text {
    margin-left: 40% !important;
  }
 
  #upData {
    margin-top: 21% !important;
  }
</style>