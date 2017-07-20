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

            <label class="label-control col-sm-3 text-right">年龄：</label>
            <div class="col-sm-6">
                <input 
                type="text" 
                class="form-control" 
                placeholder="请输入年龄" 
                v-model="age"
                @keyup.enter="add"
                >
            </div>
        </div>
        <div class="form-group text-center">
            <a class="btn btn-primary" @click="add">添加</a>
            <button class="btn btn-danger" type="reset">重置</button>
        </div>
        <hr>

        <table class="table table-bordered table-hover table-striped">
            <caption><h3>表格</h3></caption>
            <thead>
                <th class="text-center">序号</th>
                <th class="text-center">姓名</th>
                <th class="text-center">年龄</th>
                <th class="text-center">操作</th>
            </thead>
            <tbody>
                <tr v-for="(item,index) in myData" class="text-center">
                    <td>{{index+1}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.age}}</td>
                    <td><a href="javascript:void(0);" class="btn btn-danger btn-sm" data-toggle="modal" data-target="#remove" @click="remove(item)">删除</a></td>
                </tr>
                <tr>
                    <td colspan="4" align="right"  v-show="myData.length!=0"><a class="btn btn-danger btn-sm" data-toggle="modal" data-target="#remove" @click="removeall()">删除全部</a></td>
                </tr>
                <tr class="text-center text-info" v-show="myData.length==0">
                    <td colspan="4">
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
             scont:"订单管理",
             myData: [
                /*{name:'paopao',age:'20'},
                {name:'Ronny',age:'18'}*/],
                todo:"",
                username:'',
                age:'',
                nowIndex:'-100'
         }

    },
    methods:{
        add(ev){
                this.myData.push({
                    name:this.username,
                    age:this.age
                });
                this.username='',
                this.age=''

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

</script>
