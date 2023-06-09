<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 分类信息管理
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
                <!-- <el-select v-model="query.address" placeholder="班级" class="handle-select mr10">
                    <el-option key="1" label="通信工程201" value="通信工程201"></el-option>
                    <el-option key="2" label="通信工程202" value="通信工程202"></el-option>
                </el-select> -->
                <el-input v-model="query.name" style="text-align:center" placeholder="请输入" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" icon="el-icon-circle-plus" @click="handleAdd" class="yellow">增加分类</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="mid"  label="序号" width="100" align="center"></el-table-column>
                <el-table-column prop="name"  label="分类" width="140" align="center"></el-table-column>
                <el-table-column prop="slug" align="center" label="slug"></el-table-column>
                <el-table-column prop="description" align="center" label="描述"></el-table-column>
                <el-table-column prop="createTime" align="center" label="创建时间"></el-table-column>


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
        
  
            <!-- <div class="pagination">
                <el-pagination
                    background
                    layout="total, sizes, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div> -->
        </div>
  
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="序号">
                    <span>{{ form.mid }}</span>
                </el-form-item>
                <el-form-item label="分类">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="slug">
                    <el-input v-model="form.slug"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="form.description"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 增加弹出框 -->
        <el-dialog title="增加分类" :visible.sync="addVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="序号">
                    <el-input v-model="form.mid"></el-input>
                </el-form-item>
                <el-form-item label="分类">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="slug">
                    <el-input v-model="form.slug"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="form.description"></el-input>
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
  import { getClassData } from '../../api/index';
  import {postClassData} from '../../api/index';
  import axios from 'axios';
  export default {
    name: 'classClassify',
    data() {
        return {
            query: {
                name: '',
                pageIndex: 1,
                pageSize: 10,
              //   tableData: [],
            },
            tableData: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1,
            results:[],
            addVisible: false,
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取数据
        getData() {
            let that=this;
            getClassData(this.query).then(res => {
                console.log(res);
                // for(let i=0;i<res.length;i++){
                //   //直接push不要用=式赋值（用push等于一条条加进去）（）
                //   that.tableData.push(res[i][0]);
                //   // console.log(res[i][0].pay)
                // }
                that.tableData=res.data;
                console.log(that.tableData);
                that.pageTotal = res.length || 50;
            });
        },
        // 删除选择的数据
        del(id){
            console.log(id);
            // `http://114.55.37.219:8081/admin/login/delete/`+id（直接加入路径）
            axios.post(`http://114.55.37.219:9090/classify/del/batch`,[
                id,
            ]
            ).then(res => {
               console.log(res.data);
                // this.getData();
            }).catch(function (error)
            {
                console.log(error);
            });
        },
        //传输编辑后的数据
        postEdit(){
            console.log(this.form);
            axios.post(`http://114.55.37.219:9090/classify`,{
                mid:this.form.mid,
                name:this.form.name,
                slug:this.form.slug,
                description:this.form.description,
            }).then(res => {
                console.log(res.data);
                this.getData();
            }).catch(function (error)
            {
                console.log(error);
            });
        },
        // 增加数据
        handleAdd(){
            this.addVisible = true;
        },
        // 保存增加的数据
        saveAdd(){
            this.addVisible = false;
            console.log(this.form.mid+"增加");
            this.postEdit();
            this.getData();
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
                    this.del(row.mid);
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
        // 分页导航
        // handlePageChange(val) {
        //     this.$set(this.query, 'pageIndex', val);
        //     this.getData();
        // }
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