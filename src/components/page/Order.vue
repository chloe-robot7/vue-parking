<template>
  <div>
      <div class="crumbs">
          <el-breadcrumb separator="/">
              <el-breadcrumb-item>
                  <i class="el-icon-lx-cascades"></i> 订单列表
              </el-breadcrumb-item>
          </el-breadcrumb>
      </div>
      <div class="container">
          <div class="handle-box">
              <el-button
                  type="primary"
                  icon="el-icon-delete"
                  class="handle-del mr10"
                  @click="delAllSelection"
              >批量删除</el-button>
              <el-input v-model="query.expendId" style="text-align:center" placeholder="请输入订单序号" class="handle-input mr10"></el-input>
              <el-button type="primary" icon="el-icon-search" @click="handleSearch()">搜索</el-button>
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
              <el-table-column prop="nickName"  label="用户昵称" width="140" align="center"></el-table-column>
              <el-table-column prop="expendTime" align="center" label="订单开始时间">
                  <template slot-scope="scope">
                    <i class="el-icon-time">&nbsp;</i><span>{{ scope.row.expendTime}}</span>
                  </template>
              </el-table-column>
              <el-table-column prop="expendId" label="订单序号" width="240" align="center"></el-table-column>
              <el-table-column label="编辑栏" align="center">
                  <template slot-scope="scope">
                      <el-button
                          type="text"
                          icon="el-icon-edit"
                          @click="goToOrderDetail(scope.row,'OrderDetail')"
                      >详情</el-button>
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
              <el-form-item label="序号:">
                  <el-input v-model="form.id"></el-input>
              </el-form-item>
              <el-form-item label="活动名称：">
                  <el-input v-model="form.activeName"></el-input>
              </el-form-item>
              <el-form-item label="活动开始时间：">
                  <el-date-picker type="date" placeholder="活动开始时间" v-model="form.startTime" style="width: 100%;"></el-date-picker>
              </el-form-item>
              <el-form-item label="活动结束时间：">
                  <el-date-picker type="date" placeholder="活动结束时间" v-model="form.endTime" style="width: 100%;"></el-date-picker>
              </el-form-item>
              <el-form-item label="具体细节:">
                  <el-input v-model="form.details"></el-input>
              </el-form-item>
              <el-form-item label="男方报名费用:">
                  <el-input v-model="form.manMoney"></el-input>
              </el-form-item>
              <el-form-item label="女方报名费用:">
                  <el-input v-model="form.womanMoney"></el-input>
              </el-form-item>
              <el-form-item label="咨询电话:">
                  <el-input v-model="form.phone"></el-input>
              </el-form-item>
              <el-form-item label="报名电话:">
                  <el-input v-model="form.mobilePhone"></el-input>
              </el-form-item>
              <el-form-item label="活动地点:">
                  <el-input v-model="form.location"></el-input>
              </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
              <el-button @click="editVisible = false">取 消</el-button>
              <el-button type="primary" @click="saveEdit">确 定</el-button>
          </span>
      </el-dialog>
       <!-- 增加弹出框 -->
       <el-dialog title="增加活动" :visible.sync="addVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="序号">
                    <el-input v-model="form.id"></el-input>
                </el-form-item>
                <el-form-item label="活动名称">
                    <el-input v-model="form.activeName"></el-input>
                </el-form-item>
                <el-form-item label="活动开始时间：">
                  <el-date-picker type="date" placeholder="活动开始时间" v-model="form.startTime" style="width: 100%;"></el-date-picker>
              </el-form-item>
              <el-form-item label="活动结束时间：">
                  <el-date-picker type="date" placeholder="活动结束时间" v-model="form.endTime" style="width: 100%;"></el-date-picker>
              </el-form-item>
                <el-form-item label="具体细节">
                    <el-input v-model="form.details"></el-input>
                </el-form-item>
                <el-form-item label="男方报名费用">
                    <el-input v-model="form.manMoney"></el-input>
                </el-form-item>
                <el-form-item label="女方报名费用">
                    <el-input v-model="form.womanMoney"></el-input>
                </el-form-item>
                <el-form-item label="咨询电话">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="报名电话">
                    <el-input v-model="form.mobilePhone"></el-input>
                </el-form-item>
                <el-form-item label="活动地点">
                    <el-input v-model="form.location"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>
  </div>
</template>

<script>
import { getCustom } from '../../api/index';
import { getParking } from '../../api/index';
import { getPay } from '../../api/index';
import { getPayInfo } from '../../api/index';

import axios from 'axios';
import OrderDetail from './OrderDetail.vue';
export default {
  name: 'Order',
  data() {
      return {
          query: {
              name: '',
              pageIndex: 1,
              pageSize: 10,
              expendId: void 0,
            //   tableData: [],
          },
          parkData: [],
          tableData: [],
          editedData: [],
          delList: [],
          editVisible: false,
          pageTotal: 0,
          form: {},
          idx: -1,
          id: -1,
          results:[],
          addVisible:false,
          expendId:'',
      };
  },
  created() {
      this.getData();
  },
  methods: {
      // 获取数据
      getData() {
          let that=this;
          getPay().then(res => {
              console.log(res);       
                //直接push不要用=式赋值（用push等于一条条加进去）（）
              that.tableData=res.data;
              that.editedData=that.tableData;
              that.tableData=[];
              that.pageTotal = res.length || 50;
          });
          getParking(this.query).then(res => {
            that.tableData=res.data;
            that.parkData=that.tableData;
            that.tableData=[];
            console.log(this.parkData);
          });
          getCustom(this.query).then(res => {
            console.log(res);      
          });
      },
      // 删除选择的数据
      del(id){
            console.log(id);
            // `http://114.55.37.219:8081/admin/login/delete/`+id（直接加入路径）
            axios.post(`http://114.55.37.219:9090/active/del/batch`,[
                id,
            ]
            ).then(res => {
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
            axios.post(`http://114.55.37.219:9090/active`,{
              id:this.form.id,
              activeName:this.form.activeName,
              startTime:this.form.startTime,
              endTime:this.form.endTime,
              details:this.form.details,
              manNumber:this.form.manNumber,
              womanNumber:this.form.womanNumber,
              manMoney:this.form.manMoney,
              womanMoney:this.form.womanMoney,
              phone:this.form.phone,
              mobilePhone:this.form.mobilePhone,
              location:this.form.location,
              // QRCode:this.form.QRCode,   
            }).then(res => {
                console.log(res.data);
                this.getData();
            }).catch(function (error)
            {
                console.log(error);
            });
        },
      //搜索对应的数据(如果要精准搜索名字或者桌号或者编号，可以搞个el-select下拉框，然后在这里判断一下，除了要搜的其他为true，搜的为false)【例：data=data.filter(item=>(nameF?item.name==nameF:true)&&(genderF?item.sex==genderF:true)&&(numberF?item.phone==numberF:true))】
      handleSearch(){
        let filtered = this.editedData.filter((value, index, arr) => {
                    return value.expendId==this.query.expendId
                    })
                //用一个空数组保存结果
                this.results = filtered
                console.log(this.results,'results');
                //清空tableData
                this.editedData = []
                //将结果放入tableData
                for(let i = 0; i < this.results.length; i++){
                    this.editedData.push(this.results[i])
                }
      },

      // 删除操作
      handleDelete(index, row) {
          // 二次确认删除         
          this.$confirm('确定要删除吗？', '提示', {
              type: 'warning'
          })
              .then(() => {
                  this.$message.success('删除成功');
                  this.tableData.splice(index, 1);
                  this.del(row.id);
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
      handleEdit() {
        this.$router.push(`/OrderDetail`)  
      },
      // 保存编辑
      saveEdit() {
          this.editVisible = false;
          this.$message.success(`修改第 ${this.idx + 1} 行成功`);
          this.$set(this.tableData, this.idx, this.form);
          this.postEdit();
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
      goToOrderDetail(row,name) {
        console.log('orderRow',row)
        this.$router.push({ // 跳转到详情页
            name: name,
            params: {
              ...row
            }
          })
      }
      // // 定义一个函数，根据expendId来合并两个数组
      // mergeData(editedData, parkData) {
      //   // 创建一个空数组，用来存放合并后的数据
      //   let mergedData = [];
      //   // 遍历editedData中的每个对象
      //   for (let item of editedData) {
      //     // 获取当前对象的expendId
      //     let expendId = item.expendId;
      //     // 在parkData中找到匹配的对象
      //     let match = parkData.find(p => p.expendId === expendId);
      //     // 如果找到了匹配的对象，就把它的stallId添加到当前对象中
      //     if (match) {
      //       item.stallId = match.stallId;
      //     }
      //     // 把当前对象添加到mergedData中
      //     mergedData.push(item);
      //   }
      //   // 返回合并后的数据
      //   return mergedData;
      // },
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