<template id="mycomponent">
    <div class="contain_r">
        <h2>{{scont}}</h2>
        <div class="form-group row">
            <label class="label-control col-sm-3 text-right">用户名：</label>
            <div class="col-sm-6">
                <input type="text" class="form-control" placeholder="请输入用户名" v-model="username">
            </div>
        </div>
        <div class="form-group row">
            <label class="label-control col-sm-3 text-right">密码：</label>
            <div class="col-sm-6">
                <input 
                type="password" 
                class="form-control" 
                placeholder="请输入密码" 
                >
            </div>
        </div>
        <div class="form-group row">
            <label class="label-control col-sm-3 text-right">邮箱：</label>
            <div class="col-sm-6">
                <input 
                type="mail" 
                class="form-control" 
                placeholder="请输入邮箱" 
                v-model="mail"
                @keyup.enter="add"
                >
            </div>
        </div>
        <div class="form-group text-center">
            <a class="btn btn-success" @click="add">添加</a>
            <button class="btn btn-danger" type="reset">重置</button>
        </div>
        <hr>

        <table class="table table-bordered table-striped">
            <caption><h3>用户表</h3></caption>
            <thead>
                <tr>
                  <th class="text-center">序号</th>
                  <th class="text-center">用户名</th>
                  <th class="text-center">邮箱</th>
                  <th class="text-center">创建时间</th>
                  <th class="text-center">更新时间</th>
                  <th class="text-center">操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in myData" class="text-center">
                    <td>{{index+1}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.mail}}</td>
                    <td>{{item.creat_time}}</td>
                    <td>{{item.update_time}}</td>
                    <td><a href="javascript:void(0);" class="btn btn-danger btn-sm" data-toggle="modal" data-target="#remove" @click="remove(item)">删除</a></td>
                </tr>
                <tr>
                    <td colspan="7" align="right"  v-show="myData.length!=0"><a class="btn btn-danger btn-sm" data-toggle="modal" data-target="#remove" @click="removeall()">删除全部</a></td>
                </tr>
                <tr class="text-center text-info" v-show="myData.length==0">
                    <td colspan="7">
                    <h4>暂无数据</h4>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
</template>
<script>
 export default{
    data(){
         return {
             scont:"用户管理",
             myData: [],
                todo:"",
                username:'',
                creatUser:'',
                mail:'',
                e_time:'',
                u_time:'',
                nowIndex:'-100'
         }

    },
    mounted() {
        this.$http.get('http://www.syxsoa.com:9600/service/org/user/page')
        .then(response => {
            this.myData = response.data;
            console.log(response);
            console.log(response.data);
        })
        
      },
    methods:{
        add(ev){
                this.myData.push({
                    name:this.username,
                    mail:this.mail,
                    s_time:new Date(),
                    u_time:new Date()
                });
                this.username='',
                this.mail=''

            },
        remove(todo){
            var index = this.myData.indexOf(todo);
            this.myData.splice(index,1);
        },
        removeall(todo){
            this.myData=[];
        }
    }
 }
 /*setInterval(function () {
       this.myData.push({'name': 'malun', 'pwd': 'paopao1', 'mail': 'paopao1@gmail.com','s_time':'2017-07-21','u_time':'2017-07-21'});
     }, 1000);
    console.log(123)*/
</script>
