<template>
  <div>
      <div class="crumbs">
          <el-breadcrumb separator="/">
              <el-breadcrumb-item>
                  <i class="el-icon-lx-cascades"></i> 订单列表详情
              </el-breadcrumb-item>
          </el-breadcrumb>
      </div>
      <div class="container">
            <el-button @click="back" type="warning">返回</el-button>
      </div>
      <div class="container">
        <div style="border-bottom:1px solid #CCC; margin-bottom: 15px;color: darkgray;">订单信息：</div> 
                    <el-form label-position="left" inline class="demo-table-expand" :model="userForm" ref="userForm">
                    <el-form-item label="订单编号：">
                        <span>{{ userForm.expendId }}</span>
                    </el-form-item>
                    <el-form-item label="订单评分：">
                      <template slot-scope="scope">
                        <el-rate
                          v-model="value3" disabled 
                      >
                        </el-rate>
                      </template>
                    </el-form-item>
                    <el-form-item label="车位号：">
                        <span>{{ userForm.stallId }}</span>
                    </el-form-item>
                    <el-form-item label="停车位置：">
                        <span>{{ userForm.stopPlace }}</span>
                    </el-form-item>
                    <el-form-item label="预计花费：">
                        <span>{{ userForm.ptMoney }}</span>
                    </el-form-item>
                    <el-form-item label="实际花费：">
                        <span>{{ userForm.ptMoney }}</span>
                    </el-form-item>
                    <el-form-item label="订单日期：">
                        <span>{{ userForm.startTime }}{{ '起,'&nbsp }}{{userForm.endTime}}{{ '止' }}</span>
                    </el-form-item>
                    <!-- <el-form-item label="用户名：">
                        <span>{{ editedForm.nickName }}</span>
                    </el-form-item> -->
                    </el-form>
      </div>
      <div class="user">
        <div style="border-bottom:1px solid #CCC; margin-bottom: 15px;color: darkgray;">使用者信息：</div> 
                    <el-form label-position="left" inline class="demo-table-expand" :model="userForm" ref="userForm">
                    <el-form-item label="姓名:">
                        <span>{{ userForm.nickName }}</span>
                    </el-form-item>
                    <!-- <el-form-item label="test">
                        <span>{{ this.props.expendId }}</span>
                    </el-form-item> -->
                    <el-form-item label="账户余额:">
                        <span>{{ userForm.userMoney }}{{ `元` }}</span>
                    </el-form-item>
                    <el-form-item label="下单时间:">
                        <span>{{ userForm.expendTime }}</span>
                    </el-form-item>
                    <el-form-item label="是否评分:">
                        <span v-if="userForm.scoreStatus==0">{{ "暂未评分" }}</span>
                        <span v-else-if="userForm.scoreStatus==1">{{ "已评分" }}</span>
                    </el-form-item>
                    </el-form>
      </div>
      <div class="timeLine">
        <div style="border-bottom:1px solid #CCC; margin-bottom: 15px;color: darkgray;">订单跟踪：</div>
          <el-steps :active="3" align-center :model="userForm">
            <el-step icon="el-icon-date" title="预定时间" :description=userForm.expendTime></el-step>
            <el-step icon="el-icon-loading" title="开始使用" :description=userForm.startTime></el-step>
            <el-step icon="el-icon-check" title="结束使用" :description=userForm.endTime></el-step>
          </el-steps>
      </div>
  </div>
</template>

<script>
import { getCustom } from '../../api/index';
import { getParking } from '../../api/index';
import { getPay } from '../../api/index';
import { getParkingId } from '../../api/index';
import { getCustomPay } from '../../api/index';
import {delData} from '../../api/index';
import axios from 'axios';
import service from '../../utils/request';

export default {
  name: 'orderDetail',
  data() {
    let rowData = this.$route.params
    let expendId = this.$route.params.expendId
    console.log('rowData',rowData);
      return {
          query: {
              name: '',
              pageIndex: 1,
              pageSize: 10,
            //   tableData: [],
          },
          // props: {
          //   expendId: {
          //     type: Number,
          //     required: true
          //   }
          // },
          expendId:expendId,
          tableData: [],
          editedData: [],
          editedForm:{},
          delList: [],
          editVisible: false,
          pageTotal: 0,
          form: rowData,
          idx: -1,
          id: 1,
          num:228,
          results:[],
          addVisible:false,
          userTable:[],
          userForm:{},
          value3:5,
      };
  },
  created() {
      this.getData();
  },
  methods: {
      // 获取数据
      getData() {
          let that=this;
          getPay(this.query).then(res => {
              console.log(res);       
                //直接push不要用=式赋值（用push等于一条条加进去）（）
              that.tableData=res.data;
              that.editedData=that.tableData;
              that.editedForm=that.tableData[0];
              that.tableData=[];
              that.pageTotal = res.length || 50;
          });
          // getParking(this.query).then(res => {
          //   console.log(res);      
          // });
          getCustomPay(this.expendId).then(res => {
            that.userTable=res.data;
            that.userForm=that.userTable;
            console.log('userform',this.userTable);
          });
        //   service({
        //     method: 'post',
        //     url: '/c/queryId',
        //     data: {
        //         id:this.id,
        //     }
        //     }).then(function (response) {
        //         console.log(response.data);
        //         that.userForm=response.data;
        //     })
        //      .catch(function (error) {
        //         console.log(error);
        //     });
          service({
            method: 'get',
            url: '/expend/query',
            data: {
                id:this.id,
            }
            }).then(function (response) {
                console.log(response.data);
            })
             .catch(function (error) {
                console.log(error);
            });
            getParkingId(this.expendId) // 直接传递this.id
            .then(res => { // 使用参数
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
      handleSearch(a){
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
           console.log(a+"a");
          //       let filtered = this.tableData.filter((value, index, arr) => {
          //           return value.mid===a
          //           })
          //       //用一个空数组保存结果
          //       this.results = filtered
          //       console.log(this.results);
          //       //清空tableData
          //       this.newTableData = []
          //       //将结果放入tableData
          //       for(let i = 0; i < this.results.length; i++){
          //           this.newTableData.push(this.results[i])
          //       }
          //     console.log(this.newTableData);
          //     if (this.newTableData.length == 0) {
          //         this.$message.info("没有找到符合条件的活动")
          //     }
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
      handleEdit(index, row) {
          
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
      //返回
      back() {
        this.$router.push('/Order')
      }
  }
};
</script>

<style scoped>
.user {
    margin-top: 0.5%;
    padding: 30px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
}

.timeLine
{
    margin-top: 0.5%;
    padding: 30px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
}

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
.demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>