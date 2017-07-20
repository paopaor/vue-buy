<template>
 <div class="ng_gray r_cont">
     <h2 class="vue_tit">{{scont}}</h2>
     <div class="row m-t">
         <div class="col-lg-4">
             <div>
                <el-button>默认按钮</el-button>
                <el-button type="primary">主要按钮</el-button>
                <el-button type="text">文字按钮</el-button>
             </div>
         </div>
         <div class="col-lg-4">
             <div class="block">
                 <span class="demonstration">datatimePicker</span>
                 <el-date-picker
                   v-model="value1"
                   type="date"
                   placeholder="选择日期"
                   :picker-options="pickerOptions0">
                 </el-date-picker>
               </div>
         </div>
         <div class="col-lg-4">
             <el-select v-model="value" placeholder="请选择">
                 <el-option
                   v-for="item in options"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
                 </el-option>
               </el-select>
         </div>
        <div class="col-lg-12 m-t">
            <el-tag>标签一</el-tag>
            <el-tag type="gray">标签二</el-tag>
            <el-tag type="primary">标签三</el-tag>
            <el-tag type="success">标签四</el-tag>
            <el-tag type="warning">标签五</el-tag>
            <el-tag type="danger">标签六</el-tag>
        </div>
        <div class="col-lg-12 m-t">
            <el-tag
              :key="tag"
              v-for="tag in dynamicTags"
              :closable="true"
              :close-transition="false"
              @close="handleClose(tag)"
            >
            {{tag}}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="mini"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        </div>
     </div>
    <el-table
        ref="multipleTable"
        :data="tableData3"
        border
        tooltip-effect="dark"
        style="width: 100%;margin-top:20px;"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="日期"
          width="120">
          <template scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
      
      <div class="m-t">
          <div class="block pull-right">
              <span class="demonstration"></span>
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
              </el-pagination>
            </div>

          <div class="pull-left">
            <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>
            <el-button @click="toggleSelection()">取消选择</el-button>
          </div>
      </div>
     <div class="clearfix"></div>
      <!-- Switch -->
      <el-tooltip :content="'Switch value: ' + value3" placement="top" class="m-t">
        <el-switch
          v-model="value3"
          on-color="#13ce66"
          off-color="#ff4949"
          on-value="100"
          off-value="0">
        </el-switch>
      </el-tooltip>

      <!-- chexkbox -->
    <el-checkbox-group v-model="checkList">
      <el-checkbox label="复选框 A"></el-checkbox>
      <el-checkbox label="复选框 B"></el-checkbox>
      <el-checkbox label="复选框 C"></el-checkbox>
      <el-checkbox label="禁用" disabled></el-checkbox>
      <el-checkbox label="选中且禁用" disabled></el-checkbox>
    </el-checkbox-group>

    <!-- Input -->
    <div class="m-t">
      <el-input placeholder="请输入内容" v-model="input3">
        <template slot="prepend">Http://</template>
      </el-input>
    </div>
    <div style="margin-top: 15px;">
      <el-input placeholder="请输入内容" v-model="input4">
        <template slot="append">.com</template>
      </el-input>
    </div>
    <div style="margin-top: 15px;">
      <el-input placeholder="请输入内容" v-model="input5">
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="餐厅名" value="1"></el-option>
          <el-option label="订单号" value="2"></el-option>
          <el-option label="用户电话" value="3"></el-option>
        </el-select>
        <el-button slot="append" icon="search"></el-button>
      </el-input>
    </div>

    <!-- 三级联动 -->
    <div class="block m-t">
      <span class="demonstration">click 触发子菜单</span>
      <el-cascader
        :options="options2"
        v-model="selectedOptions"
        @change="handleChange">
      </el-cascader>
    </div>

    <!-- Badge标记 -->
    <el-badge :value="200" :max="99" class="item">
      <el-button size="small">评论</el-button>
    </el-badge>
    <el-badge :value="100" :max="10" class="item">
      <el-button size="small">回复</el-button>
    </el-badge>

    <!-- Alert -->
    <el-alert
      title="成功提示的文案"
      type="success"
      show-icon>
    </el-alert>
    <el-alert
      title="消息提示的文案"
      type="info"
      show-icon>
    </el-alert>
    <el-alert
      title="警告提示的文案"
      type="warning"
      show-icon>
    </el-alert>
    <el-alert
      title="错误提示的文案"
      type="error"
      show-icon>
    </el-alert>

    <!-- dialog -->
    <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      size="tiny"
      :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 走马灯 -->
    <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in 6" :key="item">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
 </div>
</template>
<script>
 export default{
     data(){
         return {
            scont:"element-ui合集",

            //dataPicker
            pickerOptions0: {
                disabledDate(time) {
                return time.getTime() < Date.now() - 8.64e7;
               }
            },
            value1: '',

            //select
            options: [{
                      value: '选项1',
                      label: '黄金糕'
                    }, {
                      value: '选项2',
                      label: '双皮奶'
                    }, {
                      value: '选项3',
                      label: '蚵仔煎'
                    }, {
                      value: '选项4',
                      label: '龙须面'
                    }, {
                      value: '选项5',
                      label: '北京烤鸭'
                    }],
                    value: '', 

            //switch
            value3: '100',

            //checkbox
            checkList: ['选中且禁用','复选框 A'],

            //input
            input3: '',
            input4: '',
            input5: '',
            select: '',

            //三级联动
            options2: [{
                    value: 'zhinan',
                    label: '指南',
                    children: [{
                      value: 'shejiyuanze',
                      label: '设计原则',
                      children: [{
                        value: 'yizhi',
                        label: '一致'
                      }, {
                        value: 'fankui',
                        label: '反馈'
                      }, {
                        value: 'xiaolv',
                        label: '效率'
                      }, {
                        value: 'kekong',
                        label: '可控'
                      }]
                    }, {
                      value: 'daohang',
                      label: '导航',
                      children: [{
                        value: 'cexiangdaohang',
                        label: '侧向导航'
                      }, {
                        value: 'dingbudaohang',
                        label: '顶部导航'
                      }]
                    }]
                  }, {
                    value: 'zujian',
                    label: '组件',
                    children: [{
                      value: 'basic',
                      label: 'Basic',
                      children: [{
                        value: 'layout',
                        label: 'Layout 布局'
                      }, {
                        value: 'color',
                        label: 'Color 色彩'
                      }, {
                        value: 'typography',
                        label: 'Typography 字体'
                      }, {
                        value: 'icon',
                        label: 'Icon 图标'
                      }, {
                        value: 'button',
                        label: 'Button 按钮'
                      }]
                    }, {
                      value: 'form',
                      label: 'Form',
                      children: [{
                        value: 'radio',
                        label: 'Radio 单选框'
                      }, {
                        value: 'checkbox',
                        label: 'Checkbox 多选框'
                      }, {
                        value: 'input',
                        label: 'Input 输入框'
                      }, {
                        value: 'input-number',
                        label: 'InputNumber 计数器'
                      }, {
                        value: 'select',
                        label: 'Select 选择器'
                      }, {
                        value: 'cascader',
                        label: 'Cascader 级联选择器'
                      }, {
                        value: 'switch',
                        label: 'Switch 开关'
                      }, {
                        value: 'slider',
                        label: 'Slider 滑块'
                      }, {
                        value: 'time-picker',
                        label: 'TimePicker 时间选择器'
                      }, {
                        value: 'date-picker',
                        label: 'DatePicker 日期选择器'
                      }, {
                        value: 'datetime-picker',
                        label: 'DateTimePicker 日期时间选择器'
                      }, {
                        value: 'upload',
                        label: 'Upload 上传'
                      }, {
                        value: 'rate',
                        label: 'Rate 评分'
                      }, {
                        value: 'form',
                        label: 'Form 表单'
                      }]
                    }, {
                      value: 'data',
                      label: 'Data',
                      children: [{
                        value: 'table',
                        label: 'Table 表格'
                      }, {
                        value: 'tag',
                        label: 'Tag 标签'
                      }, {
                        value: 'progress',
                        label: 'Progress 进度条'
                      }, {
                        value: 'tree',
                        label: 'Tree 树形控件'
                      }, {
                        value: 'pagination',
                        label: 'Pagination 分页'
                      }, {
                        value: 'badge',
                        label: 'Badge 标记'
                      }]
                    }, {
                      value: 'notice',
                      label: 'Notice',
                      children: [{
                        value: 'alert',
                        label: 'Alert 警告'
                      }, {
                        value: 'loading',
                        label: 'Loading 加载'
                      }, {
                        value: 'message',
                        label: 'Message 消息提示'
                      }, {
                        value: 'message-box',
                        label: 'MessageBox 弹框'
                      }, {
                        value: 'notification',
                        label: 'Notification 通知'
                      }]
                    }, {
                      value: 'navigation',
                      label: 'Navigation',
                      children: [{
                        value: 'menu',
                        label: 'NavMenu 导航菜单'
                      }, {
                        value: 'tabs',
                        label: 'Tabs 标签页'
                      }, {
                        value: 'breadcrumb',
                        label: 'Breadcrumb 面包屑'
                      }, {
                        value: 'dropdown',
                        label: 'Dropdown 下拉菜单'
                      }, {
                        value: 'steps',
                        label: 'Steps 步骤条'
                      }]
                    }, {
                      value: 'others',
                      label: 'Others',
                      children: [{
                        value: 'dialog',
                        label: 'Dialog 对话框'
                      }, {
                        value: 'tooltip',
                        label: 'Tooltip 文字提示'
                      }, {
                        value: 'popover',
                        label: 'Popover 弹出框'
                      }, {
                        value: 'card',
                        label: 'Card 卡片'
                      }, {
                        value: 'carousel',
                        label: 'Carousel 走马灯'
                      }, {
                        value: 'collapse',
                        label: 'Collapse 折叠面板'
                      }]
                    }]
                  }, {
                    value: 'ziyuan',
                    label: '资源',
                    children: [{
                      value: 'axure',
                      label: 'Axure Components'
                    }, {
                      value: 'sketch',
                      label: 'Sketch Templates'
                    }, {
                      value: 'jiaohu',
                      label: '组件交互文档'
                    }]
                  }],
                  selectedOptions: [],
                  selectedOptions2: [],

            //tags
            dynamicTags: ['标签一', '标签二', '标签三'],
            inputVisible: false,
            inputValue: '',

            //page
            currentPage1: 5,
            currentPage2: 5,
            currentPage3: 5,
            currentPage4: 4,

            //dialog
            dialogVisible: false,

            //table
            tableData3: [{
              date: '2016-05-03',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-04',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-08',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-06',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-07',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }],
            multipleSelection: []
          }
        },
         methods: {
               toggleSelection(rows) {
                 if (rows) {
                   rows.forEach(row => {
                     this.$refs.multipleTable.toggleRowSelection(row);
                   });
                 } else {
                   this.$refs.multipleTable.clearSelection();
                 }
               },
               handleSelectionChange(val) {
                 this.multipleSelection = val;
               },

               //tag
                handleClose(tag) {
                   this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
                   },

                 showInput() {
                   this.inputVisible = true;
                   this.$nextTick(_ => {
                     this.$refs.saveTagInput.$refs.input.focus();
                   });
                 },

                 handleInputConfirm() {
                   let inputValue = this.inputValue;
                   if (inputValue) {
                     this.dynamicTags.push(inputValue);
                   }
                   this.inputVisible = false;
                   this.inputValue = '';
                   }
                },

                //page
                handleSizeChange(val) {
                   console.log(`每页 ${val} 条`);
                 },
                 handleCurrentChange(val) {
                   console.log(`当前页: ${val}`);
                 },

                //dialog
                handleClose(done) {
                    this.$confirm('确认关闭？')
                      .then(_ => {
                        done();
                      })
                      .catch(_ => {});
                  }
 }
</script>
<style>
  .el-select .el-input {
    width: 110px;
  }
  .item {
  margin-top: 10px;
  margin-right: 40px;
}
.el-alert {
    margin: 20px 0;
}

/* 走马灯 */
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .el-carousel__item h3{text-align: center;}
</style>