<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:252px;">
                    <div class="user-info">
                        <img src="../../assets/img/img.jpg" class="user-avator" alt />
                        <div class="user-info-cont">
                            <div class="user-info-name">{{name}}</div>
                            <div>{{role}}</div>

                            <el-button type="primary" plain @click="dialogTableVisible = true">修改</el-button>
                           <!-- 弹出修改框 -->
                            <el-dialog title="修改密码" :visible.sync="dialogTableVisible">
                                <el-form :model="form">
                                    <el-form-item label="旧密码" :label-width="formLabelWidth">
                                        <el-input v-model="form.number" auto-complete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="新密码" :label-width="formLabelWidth">
                                        <el-input v-model="form.class" auto-complete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="确认密码" :label-width="formLabelWidth">
                                        <el-input v-model="form.class" auto-complete="off"></el-input>
                                    </el-form-item>
                                </el-form>
                                <div slot="footer" class="dialog-footer">
                                    <el-button @click="dialogTableVisible = false">取 消</el-button>
                                    <el-button type="primary" @click="dialogTableVisible = false;changeForm()" >确 定</el-button>
                                </div>
                            </el-dialog>


                        </div>
                    </div>
                    <div class="user-info-list">
                        登录时间：
                        <span>2023-3-14</span>
                    </div>
                    <div class="user-info-list">
                        学号：
                        <span>{{form.number}}</span>
                    </div>
                    <div class="user-info-list">
                       班级：
                       <span>{{form.class}}</span>
                    </div>
                    
                    <!-- <div class="user-info-list">
                        上次登录地点：
                        <span>宁波</span>
                    </div> -->
                </el-card>
                <el-card shadow="hover" style="height:252px;">
                    <div slot="header" class="clearfix">
                        <span>宾客关系</span>
                    </div>大学同学
                    <el-progress :percentage="71.3" color="#42b983"></el-progress>高中同学
                    <el-progress :percentage="24.1" color="#f1e05a"></el-progress>初中同学
                    <el-progress :percentage="13.7"></el-progress>小学同学
                    <el-progress :percentage="5.9" color="#f56c6c"></el-progress>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-lx-people grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">1234</div>
                                    <div>用户访问量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-lx-notice grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">321</div>
                                    <div>系统消息</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-lx-goods grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">88</div>
                                    <div>红包数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-card shadow="hover" style="height:403px;">
                    <div slot="header" class="clearfix">
                        <span>留言板</span>
                        <el-button style="float: right; padding: 3px 0" type="text" @click="dialogFormVisible = true">添加</el-button>
                    </div>
                    <el-dialog title="婚礼留言板" :visible.sync="dialogFormVisible">                       
                        <el-form :model="form1">
                            <!-- <el-form-item label="班级" :label-width="formLabelWidth">
                                <el-select v-model="form1.region" placeholder="请选择班级">
                                    <el-option label="通信工程201" value="201"></el-option>
                                    <el-option label="通信工程201" value="202"></el-option>
                                </el-select>
                            </el-form-item> -->
                            <el-form-item label="你想说的话" :label-width="formLabelWidth">
                                <el-input v-model="form1.content" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">取 消</el-button>
                            <el-button type="primary" @click="dialogFormVisible = false; addTodoList()" >确 定</el-button>
                        </div>
                    </el-dialog>
                   
                    
                    <el-table :show-header="false" :data="todoList" style="width:100%;">
                        <el-table-column width="40">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.status"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <div
                                    class="todo-item"
                                    :class="{'todo-item-del': scope.row.status}"
                                >{{scope.row.title}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column width="60">
                            <template>
                                <span><i class="el-icon-edit" ></i></span>
                                <span><i class="el-icon-delete"></i></span>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <!-- <el-card shadow="hover">
                    <schart ref="bar" class="schart" canvasId="bar" :options="options"></schart>
                </el-card> -->
            </el-col>
            <el-col :span="24">
                <el-card shadow="hover" align="middle">
                    <schart ref="line" class="schart" canvasId="line" :options="options2"></schart>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Schart from 'vue-schart';
import bus from '../common/bus';
export default {
    name: 'dashboard',
    data() {
        return {
            name: localStorage.getItem('ms_username'),
            todoList: [
                {
                    title: '今天写作业',
                    status: false
                },
                {
                    title: '今天不写作业',
                    status: false
                },
                {
                    title: '今天要写100行代码加几个bug吧',
                    status: false
                },
                {
                    title: '学一下VUE',
                    status: false
                },
                {
                    title: '学一下webgl',
                    status: false
                },
            ],
            data: [
                {
                    name: '2018/09/04',
                    value: 1083
                },
                {
                    name: '2018/09/05',
                    value: 941
                },
                {
                    name: '2018/09/06',
                    value: 1139
                },
                {
                    name: '2018/09/07',
                    value: 816
                },
                {
                    name: '2018/09/08',
                    value: 327
                },
                {
                    name: '2018/09/09',
                    value: 228
                },
                {
                    name: '2018/09/10',
                    value: 1065
                }
            ],
            dialogTableVisible: false,
            dialogFormVisible: false,
            formLabelWidth: '120px',
            form: {
                name: '',
                content: '',
                region:'',
                number: '2020015117',
                class: '通信工程202',
                date:'',
            },
            form1: {
                name: '',
                content: '',
                region:'',
                date:'',
            },
            // options: {
            //     type: 'bar',
            //     title: {
            //         text: '最近一周各品类销售图'
            //     },
            //     xRorate: 25,
            //     labels: ['周一', '周二', '周三', '周四', '周五'],
            //     datasets: [
            //         {
            //             label: '家电',
            //             data: [234, 278, 270, 190, 230]
            //         },
            //         {
            //             label: '百货',
            //             data: [164, 178, 190, 135, 160]
            //         },
            //         {
            //             label: '食品',
            //             data: [144, 198, 150, 235, 120]
            //         }
            //     ]
            // },
            options2: {
                type: 'line',
                title: {
                    text: '最近几个月婚礼趋势图'
                },
                labels: ['6月', '7月', '8月', '9月', '10月'],
                datasets: [
                    {
                        label: '结婚',
                        data: [234, 278, 270, 190, 230]
                    },
                    {
                        label: '离婚',
                        data: [164, 178, 150, 135, 160]
                    },
                    {
                        label: '再婚',
                        data: [74, 118, 200, 235, 90]
                    }
                ]
            }
        }; 
    },
    components: {
        Schart
    },
    computed: {
        role() {
            return this.name === 'admin' ? '超级管理员' : '普通用户';
        }
    },
    methods: {
        changeDate() {
            const now = new Date().getTime();
            this.data.forEach((item, index) => {
                const date = new Date(now - (6 - index) * 86400000);
                item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
            });
        },
        changeTable(){
            this.todoList.push({
                "title":"111",
            }); 
        },
        //新增一条form1表单的数据到todoList里
        addTodoList(){
            this.todoList.push({
                "title":this.form1.content,
                "status":false,
            });
            this.dialogFormVisible = false;
        },    

    }
};
</script>


<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}
</style>
