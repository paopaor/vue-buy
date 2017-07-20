<template>
	<div class="r_cont main">
	    <h3 class="big-title">添加任务：</h3>
	    <input 
	        placeholder="例如：吃饭睡觉打豆豆；    提示：+回车即可添加任务" 
	        class="task-input" 
	        type="text"
	        v-model="todo"
	        v-on:keyup.enter="addTodo"
	    />
	    <ul class="task-count" v-show="list.length">
	        <li>{{noCheckedLength}}个任务未完成</li>
	        <li class="action">
	            <a href="#all" v-bind:class="{active:visibility==='all'}">所有任务</a>
	            <a href="#unfinished"  v-bind:class="{active:visibility==='unfinished'}">未完成的任务</a>
	            <a href="#finished"  v-bind:class="{active:visibility==='finished'}">完成的任务</a>
	        </li>
	    </ul>
	    <h3 class="big-title">任务列表：</h3>
	    <div class="tasks">
	        <span class="no-task-tip" v-show="!list.length">还没有添加任何任务</span>
	        <ul class="todo-list">
	            <li class="todo" :class="{completed: item.isChecked,editing:item===editorTodos}" v-for="item in list" >
	                <div class="view">
	                    <input class="toggle" type="checkbox" v-model="item.isChecked"/>
	                    <label @dblclick="editorTodo(item)">{{ item.title }}</label>
	                    <button class="destroy" @click="deleteTodo(item)"></button>
	                </div>
	                <input 
	                    v-focus="editorTodos===item" 
	                    class="edit" 
	                    type="text" 
	                    v-model="item.title"
	                    @blur="editorTodoed(item)"
	                    @keyup.enter="editorTodoed(item)"
	                    @keyup.esc="cancleTodo(item)"
	                />
	            </li>
	            <div class="clearfix"></div>
	        </ul>
	    </div>
	</div>
</template>
<script>
 export default{
 	/*//本地存储
 	var store ={
 	    save(key,value){
 	        localStorage.setItem(key,JSON.stringify(value));
 	    },
 	    fetch(key){
 	        return JSON.parse(localStorage.getItem(key)) || [];
 	    }
 	}
 	var list=store.fetch("paopao-watch12");

 	//hash 声明的过滤函数
 	var filter={
 	    all:function(list){
 	        return list;
 	    },
 	    finished:function(list){
 	        return list.filter(function(item){
 	            return item.isChecked;
 	        })
 	    },
 	    unfinished:function(list){
 	        return list.filter(function(item){
 	            return !item.isChecked;
 	        })
 	    }
 	}
*/
     data(){
         return {
             list:[],
             todo:"",
             editorTodos:"", //记录正在编辑的todo这一项
             beforeTitle:"",  //记录编辑之前的title
             visibility:"all"
         }
     },
     watch:{
                list:{
                    handler:function(){
                        store.save("paopao-watch12",this.list);
                    },
                    deep:true
                }
            },
            computed:{

                //未完成任务个数
                noCheckedLength:function(){
                    return this.list.filter(function(item){  
                        return !item.isChecked
                    }).length
                },

                filteredList:function(){

                    //找到过滤函数的话，返回过滤结果，没找到的话 返回所有数据
                    return filter[this.visibility] ? filter[this.visibility](list) : list;
                }
            },  
     methods:{
     	addTodo(ev){  //添加任务
     	    this.list.push({
     	        title:this.todo,
     	        isChecked:false
     	    });
     	    this.todo="";
     	},
     	deleteTodo(todo){
     	    var index = this.list.indexOf(todo);
     	    this.list.splice(index,1);
     	    console.log(indexOf);
     	},
     	editorTodo(todo){
     	    this.beforeTitle=todo.title;
     	    this.editorTodos=todo;
     	},
     	editorTodoed(todo){
     	    this.editorTodos=''; //this是指创建的vue实例
     	},
     	cancleTodo(todo){
     	    console.log(todo);
     	    todo.title=this.beforeTitle; //title值变为之前的值

     	    this.beforeTitle='';  //之前记录的值已经没用 清空   

     	    this.editorTodos='';  //input隐藏 div显示
     	}
     },
     directives:{
                "focus":{
                    update(el,binding){
                        if(binding.value){
                            el.focus();
                        }
                    }

                }
            }
 }
</script>
<style>
	body {
	            margin:0;
	            background-color: #fafafa;
	            font: 12px 'Helvetica Neue', Helvetica, Arial, sans-serif;
	        }
	        
	        h2{
	            margin:0;
	            font-size: 14px;
	        }
	        a {
	            /* color: #000; */
	            text-decoration: none;
	        }
	        
	        input {
	            outline: 0;
	        }
	        
	        button {
	            margin: 0;
	            padding: 0;
	            border: 0;
	            background: none;
	            font-size: 100%;
	            vertical-align: baseline;
	            font-family: inherit;
	            font-weight: inherit;
	            color: inherit;
	            outline: 0;
	        }
	        
	        ul {
	            padding:0;
	            margin:0;
	            list-style: none;
	        }
	        
	        .page-top {
	            width: 100%;
	            height: 40px;
	            background-color: #db4c3f;
	        }
	        
	        .page-content {
	            width: 100%;
	            margin: 0px auto;
	        }
	        
	        .page-content h2{
	            line-height: 40px;
	            font-size: 18px;
	            color: #fff;
	        }
	        
	        .main {
	            width: 90%;
	            margin: 0px auto;
	            box-sizing:border-box;
	        }
	        
	        .task-input {
	            width: 99%;
	            height:30px;
	            outline: 0;
	            border: 1px solid #ccc;
	            padding: 10px;
	        }
	        
	        .task-count{
	            display: flex;
	            margin:10px 0;
	        }
	        
	        .task-count li {
	            padding-left: 10px;
	            flex: 1;
	            color: #dd4b39;
	        }
	        
	        .task-count li:nth-child(1){
	            padding: 5px 0 0 10px;
	        }
	        
	        .action {
	            text-align: center;
	            display: flex;
	        }
	        .action a {
	            margin: 0px 10px;
	            flex: 1;
	            padding: 5px 0;
	            color: #777;
	        
	        }
	        
	        .action a:nth-child(3){
	            margin-right: 0;
	        }
	        
	        .active {
	            border: 1px solid rgba(175, 47, 47, 0.2);
	        }
	        
	        .tasks {
	            background-color: #fff;
	        }
	        .no-task-tip {
	            padding:10px 0 10px 10px;
	            display: block;
	            border-bottom: 1px solid #ededed;
	            color:#777;
	        }
	        
	        .big-title {
	            color: #222;
	            margin: 20px 0;

	        }
	        
	        
	        .todo-list {
	            margin: 0;
	            padding: 0;
	            list-style: none;
	        }
	        
	        .todo-list li {
	            position: relative;
	            font-size: 16px;
	            border-bottom: 1px solid #ededed;
	        }
	        
	        .todo-list li:hover {
	            background-color: #fafafa;
	        }
	        
	        
	        .todo-list li.editing {
	            border-bottom: none;
	            padding: 0;
	        }
	        
	        .todo-list li.editing .edit {
	            display: block;
	            width: 506px;
	            padding: 13px 17px 12px 17px;
	            margin: 0 0 0 43px;
	        }
	        
	        .todo-list li.editing .view {
	            display: none;
	        }
	        
	        .todo-list li .toggle {
	            text-align: center;
	            width: 40px;
	            /* auto, since non-WebKit browsers doesn't support input styling */
	            height: auto;
	            position: absolute;
	            top: 5px;
	            bottom: 0;
	            margin: auto 0;
	            border: none; /* Mobile Safari */
	            -webkit-appearance: none;
	            appearance: none;
	        }
	        
	        .toggle {
	            text-align: center;
	            width: 40px;
	            /* auto, since non-WebKit browsers doesn't support input styling */
	            height: auto;
	            position: absolute;
	            top: 5px;
	            bottom: 0;
	            margin: auto 0;
	            border: none; /* Mobile Safari */
	            -webkit-appearance: none;
	            appearance: none;
	        }
	        
	         .toggle:after {
	            content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="40" fill="none" stroke="#ededed" stroke-width="3"/></svg>');
	        }
	        
	        .toggle:checked:after {
	            content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="40" fill="none" stroke="#bddad5" stroke-width="3"/><path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/></svg>');
	        }
	        
	        .todo-list li label {
	            white-space: pre-line;
	            word-break: break-all;
	            padding: 15px 60px 15px 15px;
	            margin-left: 45px;
	            display: block;
	            line-height: 1.2;
	            transition: color 0.4s;
	        }
	        
	        .todo-list li.completed label {
	            color: #d9d9d9;
	            text-decoration: line-through;
	        }
	        
	        /*.tip-toggle {
	            padding-left: 0;
	            position: relative;
	        }
	        
	        .tip-toggle .toggle {
	            top: -2px;
	        }
	        
	        .tip-toggle span {
	            margin-left: 45px;
	        }*/
	        
	        .todo-list li .destroy {
	            display: none;
	            position: absolute;
	            top: 0;
	            right: 10px;
	            bottom: 0;
	            width: 40px;
	            height: 40px;
	            margin: auto 0;
	            font-size: 30px;
	            color: #cc9a9a;
	            margin-bottom: 11px;
	            transition: color 0.2s ease-out;
	        }
	        
	        .todo-list li .destroy:hover {
	            color: #af5b5e;
	        }
	        
	        .todo-list li .destroy:after {
	            content: '×';
	        }
	        
	        .todo-list li:hover .destroy {
	            display: block;
	        }
	        
	        .todo-list li .edit {
	            display: none;
	        }
	        
	        .todo-list li.editing:last-child {
	            margin-bottom: -1px;
	        }
</style>