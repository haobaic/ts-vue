//登录
const login="/api/users/login";
//修改密码
const findPwd="/api/users/findPwd";
//修改账号密码
const changePwd="/api/users/changePwd";

//列表数据
const loadMore=`/api/profiles/loadMore/${this.page}/${this.size}`  //page当前page  //size请求数据的个数 默认5
//搜索  searchVal搜索东西
const search=`/api/profiles/search/${this.searchVal}/${this.page}/${this.size}`

//编辑接口
const Form=`/api/profiles/edit/${this.form._id}`

//删除接口
const Delete=`/api/profiles/delete/${this.row._id}`

//添加课程
const add=`api/profiles/add`
//账户管理
const allUsers='/api/users/allUsers'

//点击编辑管理员
const row1=`/api/users/editUser/${this.row._id}`
//删除管理员
const deleteUser=`/api/users/deleteUser/${this.row._id}`