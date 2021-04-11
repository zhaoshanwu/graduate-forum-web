<template>
  <div id="admin_user_container" class="admin_user_container">
    <div class="blank">

    </div>
    <div class="main">
      <div class="search">
        <el-input v-model="searchUserName" placeholder="请输入用户名"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </div>
      <div class="function_button">
        <div class="batch_delete">
          <el-button type="primary" icon="el-icon-delete" @click="batchDelete">批量删除</el-button>
        </div>
        <div class="add_user">
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="prepareAddUser">添加</el-button>
          <el-dialog title="添加用户" :visible.sync="dialogAddUserVisible">
            <el-form :model="form">
              <el-form-item label="用户账号：" :label-width="formLabelWidth">
                <el-input v-model="form.userNumber" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="用户密码：" :label-width="formLabelWidth">
                <el-input v-model="form.userPassword" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="用户昵称：" :label-width="formLabelWidth">
                <el-input v-model="form.userName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="用户描述：" :label-width="formLabelWidth">
                <el-input v-model="form.signature" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogAddUserVisible = false">取 消</el-button>
              <el-button type="primary" @click="addUser">添加</el-button>
            </div>
          </el-dialog>
        </div>
        <div class="screen">
          <div class="condition">
            <el-select v-model="condition.statusValue" placeholder="请选择状态">
              <el-option
                v-for="item in condition.statusCondition"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="condition.userTypeValue" placeholder="请选择用户类型">
              <el-option
                v-for="item in condition.userTypeCondition"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-button type="primary" icon="el-icon-search" @click="query(-1)">查询</el-button>
          </div>
        </div>
      </div>
      <div class="content">
        <el-table
          ref="multipleTable"
          :data="userList"
          tooltip-effect="dark"
          stripe
          fit
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="40">
          </el-table-column>
          <el-table-column
            prop="userId"
            label="用户ID"
            width="120">
          </el-table-column>
          <el-table-column
            prop="userName"
            label="用户昵称"
            width="100">
          </el-table-column>
          <el-table-column
            prop="userNumber"
            label="用户账号"
            width="100">
          </el-table-column>
          <el-table-column
            prop="userPassword"
            label="用户密码"
            width="100">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="80">
          </el-table-column>
          <el-table-column
            prop="experience"
            label="经验值"
            width="80">
          </el-table-column>
          <el-table-column
            prop="userType"
            label="用户身份"
            width="80">
          </el-table-column>
          <el-table-column
            prop="registerDate"
            label="注册时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="finallyDate"
            label="最后登录时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="signature"
            label="描述"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button type="text" icon="el-icon-edit" style="float: left" @click="seeUser(scope.row)"></el-button>
              <div style="float: left; width: 6px; height: 2px"></div>
              <el-button type="text" icon="el-icon-delete" style="float: left"  @click="warnDelete(scope.row)"></el-button>
            </template>
            <el-dialog title="修改用户" :visible.sync="dialogUpdateUserVisible" :append-to-body="true">
              <el-form :model="form">
                <el-form-item label="用户ID：" :label-width="formLabelWidth">
                  <el-input v-model="form.userId" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="用户昵称：" :label-width="formLabelWidth">
                  <el-input v-model="form.userName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户账号：" :label-width="formLabelWidth">
                  <el-input v-model="form.userNumber" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户密码：" :label-width="formLabelWidth">
                  <el-input v-model="form.userPassword" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户状态：" :label-width="formLabelWidth">
                  <el-select v-model="form.status" placeholder="请选择状态">
                    <el-option
                      v-for="item in form.statusOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="经验值：" :label-width="formLabelWidth">
                  <el-input v-model="form.experience" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户身份：" :label-width="formLabelWidth">
                  <el-input v-model="form.userType" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="注册时间：" :label-width="formLabelWidth">
                  <el-input v-model="form.registerDate" autocomplete="off" :disabled="true" ></el-input>
                </el-form-item>
                <el-form-item label="最后登录时间：" :label-width="formLabelWidth">
                  <el-input v-model="form.finallyDate" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="描述：" :label-width="formLabelWidth">
                  <el-input v-model="form.signature" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogUpdateUserVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateUser">修改</el-button>
              </div>
            </el-dialog>
            <el-dialog
              title="删除确认"
              :visible.sync="dialogDeleteUserVisible"
              width="30%"
              :append-to-body="true">
              <span>删除后无法撤回，请确认是否删除用户 "{{form.userName}}"</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogDeleteUserVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteUser">删 除</el-button>
              </span>
            </el-dialog>
          </el-table-column>
        </el-table>
      </div>
      <div class="paging">
        <el-pagination
          background
          @current-change="currentChange"
          layout="prev, pager, next"
          :current-page="pagination.currentPage"
          :total="pagination.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      searchUserName: '',
      userName: '',
      dialogAddUserVisible: false,
      dialogUpdateUserVisible: false,
      dialogDeleteUserVisible: false,
      userList: undefined,
      deleteMuchUserList: [],
      condition: {
        statusCondition: [{
          value: '全部',
          label: '全部'
        }, {
          value: '正常',
          label: '正常'
        }, {
          value: '冻结',
          label: '冻结',
        }],
        userTypeCondition: [{
          value: '全部',
          label: '全部'
        }, {
          value: '普通用户',
          label: '普通用户'
        }, {
          value: '版主',
          label: '版主'
        }],
        statusValue: '全部',
        userTypeValue: '全部',
      },
      form: {
        userId: '',
        userName: '',
        userNumber: '',
        userPassword: '',
        statusOptions: [{
          value: '正常',
          label: '正常'
        }, {
          value: '冻结',
          label: '冻结'
        }],
        status: '',
        experience: '',
        userType: '',
        registerDate: '',
        finallyDate: '',
        signature: '',
      },
      formLabelWidth: '120px',
      pagination: {
        pageSize: 5,
        total: 100,
        currentPage: 1
      },
    }
  },
  created: function() {
    const _this = this;

    // 初始化用户页码
    axios.get('user/get/count')
    .then(function (respanse) {
      _this.pagination.total = respanse.data / _this.pagination.pageSize * 10;
    })
    .catch(function (error) {
      console.log(error);
    });

    // 初始化第一页用户
    axios.get('user/get/all', {
      params: {
        start: (_this.pagination.currentPage - 1) * _this.pagination.pageSize,
        count: _this.pagination.pageSize
      }
    })
    .then(function (respanse) {
      _this.userList = respanse.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  },
  methods: {
    initUserList(_this) {
      // 初始化用户页码
      axios.get('user/get/count')
      .then(function (respanse) {
        _this.pagination.total = respanse.data / _this.pagination.pageSize * 10;
      })
      .catch(function (error) {
        console.log(error);
      });

      // 初始化第一页用户
      axios.get('user/get/all', {
        params: {
          start: 0,
          count: _this.pagination.pageSize
        }
      })
      .then(function (respanse) {
        _this.userList = respanse.data;
      })
      .catch(function (error) {
        console.log(error);
      });

      console.log('已刷新');
    },
    search() {
      const _this = this;

      if (_this.searchUserName != '') {
        axios.get('user/get/by/name/count', {
          params: {
            userName: _this.searchUserName
          }
        })
        .then(function (respanse) {
          _this.pagination.total = respanse.data / _this.pagination.pageSize * 10;
          console.log(respanse);
        })
        .catch(function (error) {
          console.log(error);
        });

        axios.get('user/get/by/name', {
          params: {
            userName: _this.searchUserName,
            start: (_this.pagination.currentPage - 1) * _this.pagination.pageSize,
            count: _this.pagination.pageSize
          }
        })
        .then(function (respanse) {
          _this.userList = respanse.data;
        })
        .catch(function (error) {
          console.log(error);
        });
      } else {
        axios.get('user/get/count')
        .then(function (respanse) {
          _this.pagination.total = respanse.data / _this.pagination.pageSize * 10;
        })
        .catch(function (error) {
          console.log(error);
        });

        axios.get('user/get/all', {
          params: {
            start: (_this.pagination.currentPage - 1) * _this.pagination.pageSize,
            count: _this.pagination.pageSize
          }
        })
        .then(function (respanse) {
          _this.userList = respanse.data;
        })
        .catch(function (error) {
          console.log(error);
        })
      }
    },
    batchDelete() {
      const _this = this;

      axios.get('user/delete/multi/user', {
        params: {
          userList: JSON.stringify(_this.deleteMuchUserList)
        }
      })
      .then(function (respanse) {
        _this.$message({
          showClose: true,
          message: '删除成功',
          type: 'success'
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    prepareAddUser() {
      const _this = this;

      _this.form.userNumber = '';
      _this.form.userPassword = '';
      _this.form.userName = '';
      _this.form.signature = '';

      _this.dialogAddUserVisible = true;
    },
    addUser() {
      const _this = this;

      axios.get('user/post/user', {
        params: {
          userNumber: _this.form.userNumber,
          userPassword: _this.form.userPassword,
          userName: _this.form.userName,
          signature: _this.form.signature
        }
      })
      .then(function (respanse) {
        _this.$message({
          showClose: true,
          message: '添加成功',
          type: 'success'
        });
      })
      .catch(function (error) {
        console.log(error);
        _this.$message({
          showClose: true,
          message: '添加失败',
          type: 'error'
        });
      });

      _this.form.userNumber = '';
      _this.form.userPassword = '';
      _this.form.userName = '';
      _this.form.signature = '';

      _this.dialogAddUserVisible = false;

      _this.$options.methods.initUserList(_this);
    },
    query(currentPage) {
      const _this = this;

      if (currentPage == -1) {
        console.log(_this.condition.statusValue);
        console.log(_this.condition.userTypeValue);
        axios.get('user/get/count', {
          params: {
            status: _this.condition.statusValue,
            userType: _this.condition.userTypeValue
          }
        })
        .then(function (respanse) {
          _this.pagination.total = respanse.data / _this.pagination.pageSize * 10;
        })
        .catch(function (error) {
          console.log(error);
        });

        axios.get('user/get/all', {
          params: {
            status: _this.condition.statusValue,
            userType: _this.condition.userTypeValue,
            start: (_this.pagination.currentPage - 1) * _this.pagination.pageSize,
            count: _this.pagination.pageSize
          }
        })
        .then(function (respanse) {
          _this.userList = respanse.data;
        })
        .catch(function (error) {
          console.log(error);
        });
      } else {
        axios.get('user/get/all', {
          params: {
            status: _this.condition.statusValue,
            userType: _this.condition.userTypeValue,
            start: (currentPage - 1) * _this.pagination.pageSize,
            count: _this.pagination.pageSize
          }
        })
        .then(function (respanse) {
          _this.userList = respanse.data;
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    },
    handleSelectionChange(val) {
      this.deleteMuchUserList = val;
    },
    currentChange(val) {
      const _this = this;

      _this.pagination.currentPage = val;
      
      if (_this.searchUserName == '' && _this.condition.userTypeValue == '' && _this.condition.statusValue == '') {
        axios.get('user/get/all', {
          params: {
            start: (_this.pagination.currentPage - 1) * _this.pagination.pageSize,
            count: _this.pagination.pageSize
          }
        })
        .then(function (respanse) {
          _this.userList = respanse.data;
        })
        .catch(function (error) {
          console.log(error);
        });
      } else if(_this.searchUserName != '' && _this.condition.userTypeValue == '' && _this.condition.statusValue == '') {
        axios.get('user/get/by/name', {
          params: {
            userName: _this.searchUserName,
            start: (_this.pagination.currentPage - 1) * _this.pagination.pageSize,
            count: _this.pagination.pageSize
          }
        })
        .then(function (respanse) {
          _this.userList = respanse.data;
        })
        .catch(function (error) {
          console.log(error);
        });
      } else if(_this.searchUserName == '' && (_this.condition.userTypeValue != '' || _this.condition.statusValue != '')) {
        axios.get('user/get/all', {
          params: {
            status: _this.condition.statusValue,
            userType: _this.condition.userTypeValue,
            start: (_this.pagination.currentPage - 1) * _this.pagination.pageSize,
            count: _this.pagination.pageSize
          }
        })
        .then(function (respanse) {
          _this.userList = respanse.data;
        })
        .catch(function (error) {
          console.log(error);
        });
      }
      
    },
    seeUser(row) {
      const _this = this;

      _this.dialogUpdateUserVisible = true;

      _this.form.userId = row.userId;
      _this.form.userName = row.userName;
      _this.form.userNumber = row.userNumber;
      _this.form.userPassword = row.userPassword;
      _this.form.status = row.status;
      _this.form.experience = row.experience;
      _this.form.userType = row.userType;
      _this.form.registerDate = row.registerDate;
      _this.form.finallyDate = row.finallyDate;
      _this.form.signature = row.signature;
    },
    updateUser() {
      const _this = this;

      _this.dialogUpdateUserVisible = false;

      axios.get('user/put/user', {
        params: {
          userId: _this.form.userId,
          userName: _this.form.userName,
          userNumber: _this.form.userNumber,
          userPassword: _this.form.userPassword,
          status: _this.form.status,
          experience: _this.form.experience,
          userType: _this.form.userType,
          finallyDate: _this.form.finallyDate,
          signature: _this.form.signature
        }
      })
      .then(function (respanse) {
        _this.$message({
          showClose: true,
          message: '修改成功',
          type: 'success'
        });
      })
      .catch(function (error) {
        console.log(error);
        _this.$message({
          showClose: true,
          message: '修改失败',
          type: 'error'
        });
      });

      _this.$options.methods.initUserList(_this);
    },
    warnDelete(row) {
      const _this = this;

      _this.dialogDeleteUserVisible = true;

      _this.form.userId = row.userId;
      _this.form.userName = row.userName;

    },
    deleteUser() {
      const _this = this;

      axios.get('user/delete/user', {
        params: {
          userId: _this.form.userId,
        }
      })
      .then(function (respanse) {
        _this.$message({
          showClose: true,
          message: '删除成功',
          type: 'success'
        });
      })
      .catch(function (error) {
        console.log(error);
        _this.$message({
          showClose: true,
          message: '删除失败',
          type: 'error'
        });
      });

      _this.dialogDeleteUserVisible = false;

      _this.$options.methods.initUserList(_this);
    }
  }
}
</script>

<style lang="less" scoped>

  .admin_user_container {
    .el-input {
      display: inline-block;
      width: 200px;
      height: 27px;
      margin-right: 20px;
    }

    .el-table__row {
      height: 50px;
    }
  }

  .blank {
    width: 100%;
    height: 47px;
    background-color: #fff;
  }

  .main {
    width: 94%;
    margin: 20px 3% 20px 3%;
    background-color: #fff;
  }

  .main .search {
    width: 100%;
    height: 40px;
    padding: 3px 10px 3px 10px;
  }

  .main .function_button {
    width: 100%;
    height: 50px;
    padding: 5px 0px 5px 0px;
  }

  .main .function_button .batch_delete,.add_user{
    float: left;
    width: 120px;
    height: 41px;
    margin-left: 20px;
  }

  .main .content {
    width: 100%;
    height: 390px;
    border: #d8e3e7 1px solid;
  }

  .main .paging {
    height: 40px;
    padding: 20px 0 0 32%;
    margin: 10px auto;
  }

  .main .screen .condition {
    float: right;
    margin-right: 20px;
  }
  .main .screen .condition .el-select{
    margin-right: 20px;
  }
</style>