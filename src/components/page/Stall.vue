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
      <div class="handle-box">
        <el-button type="primary" icon="el-icon-circle-plus" @click="handleAdd">增加车位</el-button>
      </div>
      <el-table
      :data="editedData"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand" >
            <el-form-item label="车位主用户名：">
              <span>{{ props.row.ownerName }}</span>
            </el-form-item>
            <el-form-item label="车位主联系电话：">
              <span>{{ props.row.ownerPhone }}</span>
            </el-form-item>
            <el-form-item label="每小时价格：">
              <span>{{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="车位状态：">
              <span>{{ props.row.stallState }}</span>
            </el-form-item>
            <el-form-item label="车位经纬度：">
              <span>{{ `${ props.row.latitude},${props.row.longitude}` }}</span>
            </el-form-item>
            <el-form-item label="车位地址：">
              <span>{{ `${ props.row.stallPlace}` }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="车位ID"
        prop="stallId">
      </el-table-column>
      <el-table-column
        label="租赁开始时间"
        prop="stallTime">
      </el-table-column>
      <el-table-column
        label="租赁结束时间"
        prop="endTime">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
      </el-table>
    </div>
    <el-dialog title="增加车位" :visible.sync="addVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="车位主用户名：">
                    <el-input v-model="form.ownerName"></el-input>
                </el-form-item>
                <el-form-item label="车位主联系电话：">
                    <el-input v-model="form.ownerPhone"></el-input>
                </el-form-item>
                <el-form-item label="每小时价格：">
                    <el-input v-model="form.price"></el-input>
                </el-form-item>
                <el-form-item label="开始时间选择：">
                  <template slot-scope="scope">
                    <el-date-picker
                      v-model="form.stallTime"
                      type="datetime"
                      value-format="yyyy-MM-dd hh:mm:ss"
                      placeholder="选择日期时间">
                    </el-date-picker>
                  </template>
                </el-form-item>
                <el-form-item label="结束时间选择：">
                    <el-date-picker
                      v-model="form.endTime"
                      type="datetime"
                      value-format="yyyy-MM-dd hh:mm:ss"
                      placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="车位经纬度：">
                    <el-input v-model="form.latitude"></el-input>
                </el-form-item>
                <el-form-item label="车位地址：">
                    <el-input v-model="form.stallPlace"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>     
  </div>

</template>

<style>
  .el-table__header {
    background-color: antiquewhite;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 190px;
    color: #7591b8;
    padding-left: 9%;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

<script>
import { getPurchase } from '../../api/index';
import { getParking } from '../../api/index';
import { postParkingId } from '../../api/index';

import axios from 'axios';
  export default {
    name:'Purchase',
    data() {
      return {
        tableData: [],
        editedData: [],
        editedForm:{},
        form:{},
        addVisible:false,
      }
    },
    created() {
      this.getData();
    },
    methods: {
      getData() {
        let that=this;
        // getPurchase().then(res => {
        //   console.log('getPurchase',res);
        //   that.tableData=res.data;
        //   that.editedData=that.tableData;
        //   that.tableData=[];
        // })
        getParking().then(res => {
          console.log('getParking',res);
          that.tableData=res.data;
          that.editedData=that.tableData;
          that.tableData=[];
        })
      },
      del(id){
            console.log(id);
            axios.post(`http://114.55.37.219:8081/stall/delete`,[
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
        handleDelete(index, row) {
          // 二次确认删除         
          this.$confirm('确定要删除吗？', '提示', {
              type: 'warning'
          })
              .then(() => {
                  this.$message.success('删除成功');
                  this.tableData.splice(index, 1);
                  this.del(row.stallId);
              })
              .catch(() => {});
      },
      handleAdd(){
            this.addVisible = true;
        },
        // 保存增加的数据
      saveAdd(){
        this.addVisible = false;
        console.log(this.form,"增加");
        this.postEdit();
        this.getData();
      },
      postEdit(){
        axios.post(`http://114.55.37.219:8081/stall/addstall`,{
            ownerName:this.form.ownerName,
            ownerPhone:this.form.ownerPhone,
            price:this.form.price,
            latitude:this.form.latitude,
            stallPlace:this.form.stallPlace,
            stallTime:this.form.stallTime,
            endTime:this.form.endTime,
            }).then(res => {
              console.log(res.data);
            }).catch(function (error)
            {
              console.log(error);
            });
      }
    }
  }
</script>