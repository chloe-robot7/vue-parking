<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 婚礼基本信息
                </el-breadcrumb-item>
                <el-breadcrumb-item>基本信息展示</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box" style="position: relative;">
                <el-form ref="form" :model="form" label-width="80px" style="position:relative;height: 50%;width: 50%;top:25%;left:25%;">
                    <el-form-item label="新郎名字">
                        <el-input v-model="form.mName"></el-input>
                    </el-form-item>
                    <el-form-item label="新娘名字">
                        <el-input v-model="form.fName"></el-input>
                    </el-form-item>
                    <el-form-item label="新郎电话">
                        <el-input v-model="form.phoneNumber1"></el-input>
                    </el-form-item>
                    <el-form-item label="新娘电话">
                        <el-input v-model="form.phoneNumber2"></el-input>
                    </el-form-item>
                    <el-form-item label="婚礼时间">
                        <el-input v-model="form.time"></el-input>
                    </el-form-item>
                    <el-form-item label="婚礼地点">
                        <el-input v-model="form.address"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="选择器">
                        <el-select v-model="form.region" placeholder="请选择">
                            <el-option key="bbk" label="一个人" value="bbk"></el-option>
                            <el-option key="xtc" label="两个人" value="xtc"></el-option>
                            <el-option key="imoo" label="三人及更多" value="imoo"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <!-- <el-form-item label="到达时间">
                        <el-col :span="11">
                            <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                v-model="form.date1"
                                value-format="yyyy-MM-dd"
                                style="width: 100%;"
                            ></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-time-picker
                                placeholder="选择时间"
                                v-model="form.date2"
                                style="width: 100%;"
                            ></el-time-picker>
                        </el-col>
                    </el-form-item> -->
                    <!-- <el-form-item label="城市级联">
                        <el-cascader :options="options" v-model="form.options"></el-cascader>
                    </el-form-item> -->
                    <!-- <el-form-item label="选择开关">
                        <el-switch v-model="form.delivery"></el-switch>
                    </el-form-item> -->
                    <!-- <el-form-item label="多选框">
                        <el-checkbox-group v-model="form.type">
                            <el-checkbox label="步步高" name="type"></el-checkbox>
                            <el-checkbox label="小天才" name="type"></el-checkbox>
                            <el-checkbox label="imoo" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="单选框">
                        <el-radio-group v-model="form.resource">
                            <el-radio label="步步高"></el-radio>
                            <el-radio label="小天才"></el-radio>
                            <el-radio label="imoo"></el-radio>
                        </el-radio-group>
                    </el-form-item> -->
                    <!-- <el-form-item label="下月目标">
                        <el-input type="textarea" rows="5" v-model="form.desc"></el-input>
                    </el-form-item> -->
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">表单提交</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<style scoped>
.form-box{
    width: auto !important;
}
</style>
<script>
import axios from 'axios';
import { fetchBasicData } from '../../api/index';
import { updateInfo } from '../../api/index';
import { postData } from '../../api/index';
export default {
    name: 'baseform',
    data() {
        return {
            form: {
                mName: '',
                fName: '',
                phoneNumberM: '',
                phoneNumberF: '',
                time: '',
                address: '',
                username: '',
                password: '',
            }
        };
    },
    created() {
        this.getData();
    },
    methods: {
        onSubmit() {
            this.$message.success('提交成功！');
            axios.post(`http://114.55.37.219:8081/user/login/updateInfo`,{
                mName: this.form.mName,
                fName: this.form.fName,
                phoneNumberM: this.form.phoneNumberM,
                phoneNumberF: this.form.phoneNumberF,
                time: this.form.time,
                address: this.form.address,
                username: this.form.username,
                password: this.form.password,
            }).then(res => {
                console.log(res);
                this.getData();
            }).catch(function (error)
            {
                console.log(error);
            });
        },
        getData() {
            let that=this;
            fetchBasicData(this.query).then(res => {
                console.log(res);
                that.form = res[0][0];
                that.form.address=res[0][0].address.split(";")[0];
                // that.form.time=res[0][0].time.split(" ")[0];
            });
        },
    }
};
</script>