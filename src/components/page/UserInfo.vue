<template>
  <div>
      <div class="crumbs">
          <el-breadcrumb separator="/">
              <el-breadcrumb-item>
                  <i class="el-icon-lx-cascades"></i> 全部用户基础信息
              </el-breadcrumb-item>
          </el-breadcrumb>
      </div>
      <div class="container">
          <div class="handle-box">
              <!-- <el-button
                  type="primary"
                  icon="el-icon-delete"
                  class="handle-del mr10"
                  @click="delAllSelection"
              >批量删除</el-button> -->
          </div>
          <el-table
              :data="editedData"
              border
              class="table"
              ref="multipleTable"
              header-cell-class-name="table-header"
              @selection-change="handleSelectionChange"
          >
              <el-table-column type="selection" width="55" align="center"></el-table-column>
              <el-table-column prop="userId"  label="序号" width="100" align="center"></el-table-column>
              <el-table-column prop="nickName"  label="昵称" width="140" align="center"></el-table-column>
              <el-table-column prop="userMoney" label="余额" align="center"></el-table-column>
              <el-table-column prop="loginTime" label="登录时间" align="center" width="190">
                <template slot-scope="scope">
                    <i class="el-icon-time">&nbsp;</i><span>{{ scope.row.loginTime}}</span>
                  </template>
              </el-table-column>
              <el-table-column prop="province" label="登录地点" align="center"></el-table-column>
              <el-table-column prop="language" label="使用语言" align="center"></el-table-column>
              <!-- <el-table-column prop="hujiPlace" label="户籍地区" align="center"></el-table-column>
              <el-table-column prop="hunyinState" label="婚姻状况" align="center"></el-table-column>
              <el-table-column prop="height" label="身高" align="center"></el-table-column>
              <el-table-column prop="weight" label="体重" align="center"></el-table-column>
              <el-table-column prop="xueli" label="学历" align="center"></el-table-column>
              <el-table-column prop="monthIncome" label="月收入" align="center"></el-table-column>
              <el-table-column prop="career" label="职业" align="center"></el-table-column>
              <el-table-column prop="houseState" label="住房情况" align="center"></el-table-column>
              <el-table-column prop="cartState" label="购车情况" align="center"></el-table-column>
              <el-table-column prop="marriedTime" label="期望结婚时间" align="center"></el-table-column>
              <el-table-column prop="introduceYourself" label="自我介绍" align="center"></el-table-column>
              <el-table-column prop="weixin" label="微信" align="center"></el-table-column>
              <el-table-column prop="qq" label="QQ" align="center"></el-table-column>
              <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
              <el-table-column prop="state" label="审核状态(0:表示审核 1表示通过审核)" align="center"></el-table-column>
              <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
              <el-table-column prop="role" label="角色" align="center"></el-table-column> -->
              <el-table-column label="用户头像(查看大图)" align="center">
                    <template slot-scope="scope">                      
                        <el-image
                            class="table-td-thumb"
                            :src="scope.row.avatarUrl"
                            :preview-src-list="[scope.row.avatarUrl]"
                        ></el-image>
                    </template>
              </el-table-column>
              <!-- <el-table-column prop="stand" label="择偶要求" align="center" width="120">
                    <template slot-scope="scope">
                        <el-button  type="primary" @click="showStand(scope.row.id)">点击查看</el-button>
                    </template>
              </el-table-column> -->
              <el-table-column label="编辑栏" align="center">
                  <template slot-scope="scope">
                      <el-button
                          type="text"
                          icon="el-icon-edit"
                          @click="handleEdit(scope.$index, scope.row)"
                      >编辑</el-button>
                      <el-button
                          type="text"
                          icon="el-icon-delete"
                          class="red"
                          @click="handleDelete(scope.$index, scope.row)"
                      >删除</el-button>
                  </template>
              </el-table-column>
          </el-table>
      </div>

      <!-- 编辑弹出框 -->
      <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
          <el-form ref="form" :model="form" label-width="100px">
              <el-form-item label="序号：">
                  <el-input v-model="form.userId"></el-input>
              </el-form-item>
                <el-form-item label="昵称：">
                    <el-input v-model="form.nickName"></el-input>
                </el-form-item>
                <el-form-item label="登录地点：">
                    <el-input v-model="form.province"></el-input>
                </el-form-item>
                <el-form-item label="使用语言：">
                    <el-input v-model="form.language"></el-input>
                </el-form-item> 
                <el-form-item label="余额：">
                    <span>{{ form.userMoney }}</span>
                </el-form-item>
                <el-form-item label="登录时间：">
                    <span>{{ form.loginTime }}</span>
                </el-form-item>         
          </el-form>
          <span slot="footer" class="dialog-footer">
              <el-button @click="editVisible = false">取 消</el-button>
              <el-button type="primary" @click="saveEdit">确 定</el-button>
          </span>
      </el-dialog>

      <!-- 择偶信息展示   -->
        <!-- <el-dialog title="择偶要求" :visible.sync="standVisible" width="30%">
            <el-form ref="standForm" :model="standForm" label-width="100px">
                <el-form-item label="序号">
                    <el-input v-model="standForm.id"></el-input>
                </el-form-item>
                <el-form-item label="婚姻状态">
                    <el-input v-model="standForm.maritalStatus"></el-input>
                </el-form-item>
                <el-form-item label="期望最小年龄">
                    <el-input v-model="standForm.minAge"></el-input>
                </el-form-item>
                <el-form-item label="期望最大年龄">
                    <el-input v-model="standForm.maxAge"></el-input>
                </el-form-item>
                <el-form-item label="期望最低身高">
                    <el-input v-model="standForm.minHeight"></el-input>
                </el-form-item>
                <el-form-item label="期望最高身高">
                    <el-input v-model="standForm.maxHeight"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="standVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveStand">确 定</el-button>
            </span>
        </el-dialog> -->
  </div>
</template>

<script>
import { getCustom } from '../../api/index';
import service from '../../utils/request';
import axios from 'axios';
export default {
  name: 'mate',
  data() {
      return {
          query: {
              name: '',
              // pageIndex: 1,
              // pageSize: 10,
            
          },
          pageNum: 1,
          pageSize: 100,
          tableData: [],
          editedData: [],
          delList: [],
          editVisible: false,
          pageTotal: 0,
          form: {},
          standForm:{},
          idx: -1,
          id: -1,
          results:[],
          addVisible:false,
          standVisible:false,
      };
  },
  created() {
      this.getData();
  },
  methods: {
      showStand(id){            
        axios.post(`http://114.55.37.219:9090/user/request/`+id,{
            }).then(res => {
               console.log(res.data);
               this.standForm=res.data.data
               this.standVisible=true;
            }).catch(function (error)
            {
                console.log(error);
            });

        },

      // 获取数据/user/page
      getData() {
        // axios.get(`http://114.55.37.219:9090/c/queryMoney`,{
               
        //     }).then(res => {
        //        console.log(res.data);
        //        this.tableData=res.data.data.records;
        //        console.log(this.tableData);
        //        this.editedData=this.tableData;
        //        this.tableData=[];
        //     }).catch(function (error)
        //     {
        //         console.log(error);
        //     });
        getCustom(this.query).then(res => {
            console.log(res.data);
            this.tableData=res.data;
            console.log(this.tableData);
            this.editedData=this.tableData;
            this.tableData=[];
            }).catch(function (error)
            {
                console.log(error);
            });
        },
      // 删除选择的数据
      del(id){
            console.log(id);
            // `http://114.55.37.219:8081/admin/login/delete/`+id（直接加入路径）
            axios.post(`http://114.55.37.219:8081/c/delete`,{
                id:id           
            }).then(res => {
               console.log(res.data);
               this.getData();
            }).catch(function (error)
            {
                console.log(error);
            });
        },
      //传输编辑后的数据
      postEdit(){
            console.log(this.form);
            // axios.post(`http://114.55.37.219:9090/c/update`,{
            //     userId:this.form.userId,
            //     nickName:this.form.nickName,
            //     phone:    
            // }).then(res => {
            //     console.log(res.data);
            //     this.getData();
            // }).catch(function (error)
            // {
            //     console.log(error);
            // });
            service({
                method: 'post',
                url: '/c/update',
                data: {
                    userId:this.form.userId,
                    nickName:this.form.nickName,
                    province:this.form.province,
                    language:this.form.language,
                }
                }).then(function (response) {
                    console.log(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
      //搜索对应的数据(如果要精准搜索名字或者桌号或者编号，可以搞个el-select下拉框，然后在这里判断一下，除了要搜的其他为true，搜的为false)【例：data=data.filter(item=>(nameF?item.name==nameF:true)&&(genderF?item.sex==genderF:true)&&(numberF?item.phone==numberF:true))】
      handleSearch(){
          //Object.values(item)方法返回了一个包含undefined的数组，也就是说对象的某些属性值是undefined，
          //所以无法使用includes方法。您可以检查一下您的对象是否有缺失或错误的属性值，或者在使用includes方法之前，
          //先过滤掉undefined的值，比如Object.values(item).filter(value => value)
          //用filter函数筛选出符合条件的数据 (includes是针对数组的办法，所以要先找name)
          let filtered = this.tableData.filter(item => Object.values(item).filter(value => value).some(value => value.toString().includes(this.query.name)));
          //用一个空数组保存结果
          this.results = filtered
          //清空tableData
          this.tableData = []
          //将结果放入tableData
          for(let i = 0; i < this.results.length; i++){
              this.tableData.push(this.results[i])
          }
      },
      // handleSearch() {
      //     this.$set(this.query, 'pageIndex', 1);
      // },
      // 删除操作
      handleDelete(index, row) {
          // 二次确认删除         
          this.$confirm('确定要删除吗？', '提示', {
              type: 'warning'
          })
              .then(() => {
                  this.$message.success('删除成功');
                  this.tableData.splice(index, 1);
                  this.del(row.userId);
              })
              .catch(() => {});
      },
      // 多选操作
      handleSelectionChange(val) {
          this.multipleSelection = val;
      },
      delAllSelection() {
          const length = this.multipleSelection.length;
          let str = '';
          this.delList = this.delList.concat(this.multipleSelection);
          for (let i = 0; i < length; i++) {
              str += this.multipleSelection[i].name + ' ';
          }
          this.$message.error(`删除了${str}`);
          this.multipleSelection = [];
      },
      // 编辑操作
      handleEdit(index, row) {
          this.idx = index;
          this.form = row;
          this.editVisible = true;
      },
      // 保存编辑
      saveEdit() {
          this.editVisible = false;
          this.$message.success(`修改第 ${this.idx + 1} 行成功`);
          this.$set(this.tableData, this.idx, this.form);
          this.postEdit();
      },
      // 保存择偶要求
        saveStand() {
            this.standVisible = false;
            // this.$message.success(`修改第 ${this.idx + 1} 行成功`);
        },
      // 增加数据
      handleAdd(){
            this.addVisible = true;
        },
        // 保存增加的数据
      saveAdd(){
            this.addVisible = false;
            console.log(this.form.id+"增加");
            this.postEdit();
            this.getData();
      },
  }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.yellow {
    background-color: #ff9900;
    border-color: #ff9900;
  }
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>