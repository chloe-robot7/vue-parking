<template>
  <div class="container">
      <el-tabs tab-position="left" >
          <el-tab-pane label="所有学堂内容查看">
              <div class="choose">
                  <el-form :inline="true" class="demo-form-inline">
                    <el-select v-model="value4" clearable filterable  placeholder="请选择" @change="newactivefilter">
                        <el-option
                        v-for="item in options"
                        :key="item.mid"
                        :label="item.name"
                        :value="item.mid"
                        >
                        </el-option>
                    </el-select>
                  </el-form>
              </div>
              <div v-if="newTableData.length==0" class="nochoose">还没有文章</div>
              <div class="main">
                  <el-card v-for="o in newTableData" :key="o.id">
                      <div class="spanlist">
                          <el-row>
                              <el-col :span="6">
                                  <h4>{{o.id}}</h4></el-col>
                          </el-row>
                              <el-row>
                                  <el-col :span="4"><div class="grid-content bg-purple">创建日期：</div></el-col>
                                  <el-col :span="12"><div class="grid-content bg-purple-light">{{o.createTime}}</div></el-col>
                              </el-row>
                              <el-row>
                                  <el-col :span="4"><div class="grid-content bg-purple">文章分类：</div></el-col>
                                  <el-col :span="6"><div class="grid-content bg-purple-light">{{o.mid}}--{{ o.name }}</div></el-col>
                              </el-row>
                              <el-row>
                                  <el-col :span="4"><div class="grid-content bg-purple">文章标题：</div></el-col>
                                  <el-col :span="6"><div class="grid-content bg-purple-light">{{o.title}}</div></el-col>
                              </el-row>
                              <el-row>
                                  <el-col :span="4"><div class="grid-content bg-purple">文章内容：</div></el-col>
                                  <el-col :span="6"><div class="grid-content bg-purple-light">{{o.content}}</div></el-col>
                              </el-row>
                              <el-row>
                                  <el-col :span="4"><div class="grid-content bg-purple">文章图片：</div></el-col>
                                  <img border="0" :src="o.imgUrl" alt="picture" width="160" height="100">
                              </el-row>
                              <el-row>
                                  <el-col :span="4"><div class="grid-content bg-purple">文章封面：</div></el-col>
                                  <img border="0" :src="o.coverUrl" alt="picture" width="160" height="100">
                              </el-row>
                              <el-row>
                                  <el-col :span="4"><div class="grid-content bg-purple">文章视频：</div></el-col>
                                  <video controls alt="video" width="160" height="100" >
                                    <source :src="o.videoUrl" type="video/webm">
                                  </video>
                                  <!-- <el-col :span="12"><div class="grid-content bg-purple-light">{{o.videoUrl}}</div></el-col> -->
                              </el-row>
                      </div>
                      <div class="spanright">
                        <el-card label="编辑栏" align="center">
                            <template slot-scope="scope">
                                <el-button
                                    type="text"
                                    icon="el-icon-edit"
                                    @click="handleEdit(o)"
                                >编辑</el-button>
                                <el-button
                                    type="text"
                                    icon="el-icon-success"
                                    class="red"
                                    @click="del(o)"
                                >删除</el-button>
                            </template>
                        </el-card>  
                          <!-- <el-button type="danger" @click="revise(o.id)">修改</el-button> -->
                      </div>
                  </el-card>
              </div>
          </el-tab-pane>

          <div>
          </div>

          <el-tab-pane label="学堂内容增加">
              <!-- <div v-if="oldactive.length==0" class="nochoose">还没有精彩内容</div> -->
              <div class="main">
                <div class="form-box" style="position: relative;margin-top: 15%;">
                <el-form ref="addForm" :model="addForm" label-width="80px" style="position:relative;height: 70%;width: 50%;top:25%;left:25%;">
                    <el-form-item label="文章分类">
                        <el-select v-model="addForm.mid" clearable filterable  placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.mid"
                            :label="item.name"
                            :value="item.mid"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="文章标题">
                        <el-input v-model="addForm.title"></el-input>
                    </el-form-item>
                    <el-form-item label="文章内容">
                        <el-input type="textarea" v-model="addForm.content"></el-input>
                    </el-form-item>
                    <el-form-item label="文章图片">
                        <el-upload
                            class="upload-demo"
                            action="http://114.55.37.219:9090/files/upload"
                            :on-remove="handleRemove"
                            :on-success="pictureSuccess"
                            :file-list="fileList"
                            list-type="picture">
                            <el-button size="small" type="primary">点击上传图片</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="文章封面">
                        <el-upload
                            class="upload-demo"
                            action="http://114.55.37.219:9090/files/upload"
                            :on-remove="handleRemoveCover"
                            :on-success="coverSuccess"
                            :file-list="coverList"
                            list-type="picture">
                            <el-button size="small" type="primary">点击上传封面</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="文章视频">
                        <el-upload
                            class="upload-video"
                            action="http://114.55.37.219:9090/files/upload"
                            accept="video/*"
                            multiple
                            :limit="3"
                            :file-list="videoList"
                            :on-remove="handleRemoveVideo"
                            :on-success="handleSuccessVideo">
                            <el-button size="small" type="primary" id="upData">点击上传视频</el-button>
                        </el-upload>
                    </el-form-item>                    
                    <el-form-item>
                        <el-button type="primary" @click="postAdd">表单提交</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
                </div>
            </div>
          </el-tab-pane>

      </el-tabs>
    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="50%">
        <el-form :model="editForm" :rules="editRules" ref="editForm" label-width="80px">
            <el-form-item label="文章分类" prop="mid">
                <el-input v-model="editForm.mid"></el-input>
            </el-form-item>
            <el-form-item label="文章标题" prop="name">
                <el-input v-model="editForm.title"></el-input>
            </el-form-item>
            <el-form-item label="文章内容" prop="content">
                <el-input type="textarea" v-model="editForm.content"></el-input>
            </el-form-item>
            <el-form-item label="文章图片" prop="content">
                <el-input type="textarea" v-model="editForm.imgUrl"></el-input>
                <el-upload
                            class="upload-demo"
                            action="http://114.55.37.219:9090/files/upload"
                            :on-remove="handleRemove"
                            :on-success="pictureSuccess"
                            :file-list="fileList"
                            list-type="picture">
                            <el-button size="small" type="primary">点击上传图片</el-button>
                </el-upload>
            </el-form-item>
            <el-form-item label="文章封面">
                <el-input v-model="editForm.coverUrl"></el-input>
                <el-upload
                            class="upload-demo"
                            action="http://114.55.37.219:9090/files/upload"
                            :on-remove="handleRemoveCover"
                            :on-success="coverSuccess"
                            :file-list="coverList"
                            list-type="picture">
                            <el-button size="small" type="primary">点击上传封面</el-button>
                </el-upload>
            </el-form-item>
            <el-form-item label="文章视频">
                <el-input v-model="editForm.videoUrl"></el-input>
                <el-upload
                            class="upload-video"
                            action="http://114.55.37.219:9090/files/upload"
                            accept="video/*"
                            multiple
                            :limit="3"
                            :file-list="videoList"
                            :on-remove="handleRemoveVideo"
                            :on-success="handleSuccessVideo">
                            <el-button size="small" type="primary" id="upData">点击上传视频</el-button>
                </el-upload>
            </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>  



  </div>

</template>

<script>
  import axios from 'axios';
  import { getContentData } from '../../api/index';
  import { getClassData } from '../../api/index';
  export default {
      data() {
          return {
              //查询条件
              formInline: {
                  mid: '',
                  name: '',
              },
              editRules: {
                  mid: [
                      { required: true, message: '请输入文章分类', trigger: 'blur' },
                  ],
                  name: [
                      { required: true, message: '请输入文章标题', trigger: 'blur' },
                  ],
                  content: [
                      { required: true, message: '请输入文章内容', trigger: 'blur' },
                  ],
                
              },
              //前端显示
              tableData: [], //活动信息查询界面
              newTableData: [], //查询后更新信息
              addForm:{}, //添加信息
              editForm: {}, //编辑表单
              form:{},
              //评分
              colors: ['#99A9BF', '#F7BA2A', '#FF9900'], // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
              //我的评价
              myevalu: '',
              //文章分类
              options: [],//保留原始数据
              value4: '',
              show:[],
              results: [],
              editVisible: false,
              fileList: [],
              coverList: [],
              videoList: [],
              postFile:[],
                postCover:[],
                postVideo:[],
              id: '',
              url: '',
          };
      },
      created() {
          this.Content();
      },
      methods: {
        Content(){
            getContentData(this.query).then(res => {
                console.log(res);
                this.tableData=res.data;
                this.newTableData=res.data;
                console.log(this.tableData);
            });
            getClassData(this.query).then(res => {
                console.log(res);
                this.options=res.data;
                console.log(this.options);
            });

        },
        postEdit(){
            console.log(this.editForm);
            axios.post(`http://114.55.37.219:9090/contents`,{
                mid: this.editForm.mid,
                id: this.editForm.id,
                title: this.editForm.title,
                content: this.editForm.content,
                imgUrl: this.editForm.imgUrl,
                coverUrl: this.editForm.coverUrl,
                videoUrl: this.editForm.videoUrl,
            }).then(res => {
                console.log(this.editForm+'editForm');
                this.Content();
            }).catch(function (error)
            {
                console.log(error);
            });
        },
          //查询
          newactivefilter(a) {
              console.log(a);
                let filtered = this.tableData.filter((value, index, arr) => {
                    return value.mid===a
                    })
                //用一个空数组保存结果
                this.results = filtered
                console.log(this.results);
                //清空tableData
                this.newTableData = []
                //将结果放入tableData
                for(let i = 0; i < this.results.length; i++){
                    this.newTableData.push(this.results[i])
                }
              console.log(this.newTableData);
              if (this.newTableData.length == 0) {
                  this.$message.info("没有找到符合条件的活动")
              }
          },
          //修改
          // 编辑操作
            handleEdit(item) {
                // this.idx = index;
                this.editForm = item;
                this.editVisible = true;
                console.log(this.editForm);
                console.log(this.fileList);
            },
             // 保存编辑
            saveEdit() {
                this.editVisible = false;
                this.$message.success(`修改成功`);
                this.postEdit();
                this.Content();
            },
            //传递增加的内容
            postAdd(){
                console.log(this.addForm);
                axios.post(`http://114.55.37.219:9090/contents`,{
                mid: this.addForm.mid,
                id: this.addForm.id,
                title: this.addForm.title,
                content: this.addForm.content,
                imgUrl: this.fileList[0].url,
                coverUrl: this.coverList[0].url,
                videoUrl: this.videoList[0].url,
                    }).then(res => {
                        this.$message.success(`修改成功`);
                        this.fileList = [];
                        this.coverList = [];
                        this.videoList = [];
                    }).catch(function (error)
                    {
                        console.log(error);
                    });
                },
            //添加图片
            pictureSuccess(res, file, fileList){
                console.log(file);
                console.log(res);
                this.fileList.push({name: file.name, id:file.uid, url: res});
                this.editForm.imgUrl = res;
                this.$set(this.fileList[0], 'url', this.fileList[0].url)
            },
            //添加封面
            coverSuccess(res, file, fileList){
                console.log(file);
                console.log(res);
                this.editForm.coverUrl = res;
                this.coverList.push({name: file.name, id:file.uid, url: res});

                console.log(this.coverList[0].url);
                this.$set(this.coverList[0], 'url', this.coverList[0].url)
            },
            //添加视频
            handleSuccessVideo(res, file, fileList){
                console.log(file);
                console.log(res);
                this.videoList.push({name: file.name, id:file.uid, url: res});
                this.editForm.videoUrl = res;
            },
            //删除图片
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            //删除封面
            handleRemoveCover(file, fileList) {
                console.log(file, fileList);
            },
            //删除视频
            handleRemoveVideo(file, fileList) {
                console.log(file, fileList);
            },
            // 删除选择的数据
            del(item){
            console.log(item.id);
            let id=item.id;
            // `http://114.55.37.219:8081/admin/login/delete/`+id（直接加入路径）
            axios.post(`http://114.55.37.219:9090/contents/del/batch`,[
                id,
            ]
            ).then(res => {
               console.log(res.data);
                // this.getData();
            }).catch(function (error)
            {
                console.log(error);
            });
            this.Content();
        },
      }
  }
</script>

<style scoped>
  .container {
      width: 950px;
      margin-left: 150px;
      min-height: 600px;
      height: auto!important;
      height: 600px;
  }
  
  .choose {
      width: 100%;
      height: 80px;
  }
  
  .demo-form-inline {
      padding-left: 30px;
      padding-top: 20px;
  }
  
  .main {
      width: 100%;
      margin-left: 30px;
  }
  
  .spanlist {
      margin-left: 50px;
      float: left;
      width: 500px;
      margin-bottom: 20px;
  }
  
  .spanright {
      margin-left: 50px;
      float: left;
      width: 300px;
      margin-bottom: 20px;
      text-align: center;
  }
  
  .text {
      margin-top: 60px;
      padding-bottom: 30px;
  }
  
  .text1 {
      margin-top: 30px;
      padding-bottom: 30px;
  }
  
  .nochoose {
      width: 100%;
      height: 100%;
      background-color: #FFF;
      color: #606266;
      text-align: center;
      line-height: 400px;
  }
  
  .value {
      margin-top: 20px;
  }
  
  .pl {
      width: 100%;
      height: 50px;
      margin-left: 20px;
  }
  
  .pinglun {
      color: #606266;
      font-size: 14px;
      margin-top: 10px;
  }
</style>