<template>
  <el-container>
    <el-header>
      <el-button size="mini" type="primary" @click="addPerson">新增</el-button>
    </el-header>
    <el-main>
      <el-table
        :data="person.items"
        border
        fit
        highlight-current-row
        style="width: 100%"
        @sort-change="sortChange"
      >
        <el-table-column label="ID" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="人名" prop="name" sortable="custom" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="身份" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.type === '1'?'导演':'演员' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createdTime" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.createdTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="更新时间" prop="updateTime" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.updateTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="id" align="center">
          <template slot-scope="{row}">
            <el-button type="primary" size="mini" @click="editPerson(row)">
              编辑
            </el-button>
            <el-button
              v-if="row.status!='deleted'"
              size="mini"
              type="danger"
              @click="deletePerson(row,'deleted')"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <Pagination :total="person.total" @change="changePage" />
    </el-footer>
    <el-dialog title="添加参演人员" :visible.sync="personAddDialog" center>
      <el-form :model="personDetail">
        <el-form-item label="添加头像">
          <Cropper :append-to-body="true" />
        </el-form-item>
        <el-form-item label="人员名字">
          <el-input v-model="personDetail.name" placeholder="影片地址" />
        </el-form-item>
        <el-form-item label="人员身份">
          <el-select v-model="personDetail.type" placeholder="人员身份">
            <el-option label="导演" :value="1" />
            <el-option label="演员" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="人员介绍">
          <el-input
            v-model="personDetail.introduce"
            type="textarea"
            placeholder="影片地址"
            :autosize="{ minRows: 4, maxRows: 6}"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="default" @click="dialogAction('cancel')">取消</el-button>
        <el-button type="primary" @click="dialogAction('finish')">确认</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Pagination from '@components/Pagination'
import Cropper from '@components/Cropper'
export default {
  name: 'PersonMange',
  components: {
    Pagination,
    Cropper
  },
  data() {
    return {
      personAddDialog: false,
      personDetail: {
        name: '',
        type: 1,
        introduce: ''
      },
      dialogStatus: 'add'
    }
  },
  computed: {
    ...mapState('content', {
      person: s => s.person
    })
  },
  mounted() {
    this.getUsers()
  },
  methods: {
    ...mapActions('content', {
      getUsers: 'getUsers',
      updateUser: 'updateUser',
      deleteUser: 'deleteUser',
      addUser: 'addUser'
    }),
    initPersonDetail(personInfo = {}) {
      this.personDetail.name = personInfo.name
      this.personDetail.type = personInfo.type
      this.personDetail.introduce = personInfo.introduce
      this.personDetail.id = personInfo.id
    },
    async dialogAction(actionStr) {
      this.personAddDialog = false
      if (actionStr === 'cancel') {
        this.initPersonDetail()
        return
      }
      if (this.dialogStatus === 'edit') {
        await this.updateUser(this.personDetail)
        this.$message({
          type: 'success',
          message: '更新成功!'
        })
      } else if (this.dialogStatus === 'add') {
        await this.addUser(this.personDetail)
        this.$message({
          type: 'success',
          message: '新增成功!'
        })
      }
    },
    editPerson(row) {
      this.dialogStatus = 'edit'
      this.initPersonDetail({
        name: row.name,
        type: +row.type,
        introduce: row.introduce,
        id: row.id
      })
      this.personAddDialog = true
    },
    deletePerson(row) {
      this.$confirm(`是否删除 ${row.name}?`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await this.deleteUser(row.id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {})
    },
    addPerson() {
      this.personAddDialog = true
      this.dialogStatus = 'add'
      this.initPersonDetail()
    },
    sortChange() {},
    changePage(pageNumber) {
      this.getUsers(pageNumber)
    }
  }
}
</script>

<style scoped>
.el-header{
  line-height: 60px;
}
</style>
