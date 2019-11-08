const bodyParser = require('body-parser')
const { bookNavData, bookMallData, bookMallDetailData } = require('./src/data')
let userList = [
    {
        username: 'admin',
        password: 123456
    }
],
    mybook = []
module.exports = {
    devServer: {
        before(app) {
            app.use(bodyParser.json())
            //登陆
            app.post('/islogin', (req, res) => {
                const { username, password } = req.body
                let user = userList.find(item => item.username === username)
                if (user) {
                    if (user.password == password) {
                        res.send({
                            code: 200,
                            message: '登录成功',
                            data: user
                        })
                    } else {
                        res.send({
                            code: 400,
                            message: '密码不正确'
                        })
                    }
                } else {
                    res.send({
                        code: 400,
                        message: '用户不存在'
                    })
                }
            })
            //navlist
            app.get('/navlist', (req, res) => {
                res.send({
                    code: 200,
                    list: bookNavData,
                    message: '导航列表'
                })
            })
            //list
            app.get('/list', (req, res) => {
                const { id } = req.query
                let newList = bookMallData.find(item => item.id == id).list
                newList.forEach(item => {
                    item.is_my_book = mybook.findIndex(i => i.id === item.id) >= 0 //true false
                })
                res.send({
                    code: 200,
                    list: newList,
                    message: '列表'
                })

            })
            //详情
            app.post('/detail', (req, res) => {
                const { id } = req.body
                bookMallDetailData.forEach(item => {
                    item.list.forEach(val => {
                        val.is_my_book = mybook.findIndex(i => i.id === val.id) >= 0 //true false
                        if (val.id == id) {
                            res.send({
                                code: 200,
                                data: val,
                                message: '详情'
                            })
                        }
                    })
                })

            })
            //点击收藏，添加到mybook
            app.post('/add_mybook', (req, res) => {
                const { book } = req.body
                if (mybook.indexOf(book) < 0) {
                    book.num = 1
                    book.flag = false
                    mybook.push(book)
                }
                res.send({
                    code: 200,
                    message: '收藏成功'
                })
            }),
                //store获取 mybook
                app.get('/get_mybook', (req, res) => {
                    res.send({
                        code: 200,
                        data: mybook,
                        message: '书架列表'
                    })
                })
            //点击加减后，更新一下store里的mybook，避免刷新后改变的数据恢复以前的
            app.post('/updata_mybook', (req, res) => {
                const { newbook } = req.body
                mybook = newbook
                res.send({
                    code: 200,
                    data: mybook,
                    message: '更新'
                })
            })
            //取消收藏
            app.post('/del_mybook', (req, res) => {
                const { id } = req.body
                let index = mybook.findIndex(item => item.id == id)
                mybook.splice(index, 1)
                res.send({
                    code: 200,
                    data: mybook,
                    message: '取消收藏'
                })
            })
            //注册
            app.post('/register', (req, res) => {
                const { username, password } = req.body
                let flag = userList.some(item => item.username === username)
                if (flag) {
                    res.send({
                        code: 400,
                        data: username,
                        message: '账号重复'
                    })
                } else {
                    userList.push({
                        username,
                        password
                    })
                    console.log(userList)
                    res.send({
                        code: 200,
                        data: username,
                        message: '注册成功'
                    })
                }
            })
        }
    }

}   