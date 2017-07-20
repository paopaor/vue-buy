<template>
 <div class="r_cont">
     <h2 class="vue_tit pull-left">{{scont}}</h2>
     <el-button :plain="true" type="success" class="pull-right" @click="back">返回</el-button>
     <div class="clearfix"></div>
     <el-table
         :data="tableData"
         border
         style="width: 100%;margin-top:20px;"
         :default-sort = "{prop: 'date', order: 'descending'}"
         >
         <el-table-column
           prop="date"
           label="日期"
           sortable
           width="180">
         </el-table-column>
         <el-table-column
           prop="name"
           label="姓名"
           sortable
           width="180">
         </el-table-column>
         <el-table-column
           prop="address"
           label="地址"
           :formatter="formatter">
         </el-table-column>
       </el-table>
 </div>
</template>
<script>
 export default{
     data(){
         return {
             scont:"exchange goods",
             tableData: []
             };

        },
          /*this.$http.get('../data/pao-table1.json').then(function(response){
                  this.tableData=response.data;
                  console.log(response);
              })*/
          /*axios.get('../data/pao-table1.json')
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });*/

            mounted() {
                axios.get('./data/pao-table1.json')
                .then(response => {this.tableData = response.data})
              },
        methods:{
        	formatter(row, column) {
        	        return row.address;
        	      },
          back(){
            this.$router.push('/APP/');
          }
        }
 }
</script>