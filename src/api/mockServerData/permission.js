import Mock from 'mockjs'
export default {
    getMenu: config => {
        console.log(config);
        const { username, password } = JSON.parse(config.body)
        // 先判断用户是否存在
        // 判断账号和密码是否对应
        if (username === 'admin' && password === 'admin') {
            return {
                code: 20000,
                data: {
                    menu: [
                        {
                            path: "/",
                            name: "home",
                            label: "首页",
                            icon: "s-home",
                            url: "Home/Home",
                        },
                        {
                            path: "/mall",
                            name: "mall",
                            label: "商品管理",
                            icon: "video-play",
                            url: "MallManage/MallManage",
                        },
                        {
                            path: "/user",
                            name: "user",
                            label: "用户管理",
                            icon: "user",
                            url: "UserManage/UserManage",
                        },
                        {
                            label: "其他",
                            icon: "location",
                            children: [
                                {
                                    path: "/other/pageOne",
                                    name: "page1",
                                    label: "页面1",
                                    icon: "setting",
                                    url: "Other/PageOne",
                                },
                                {
                                    path: "/other/pageTwo",
                                    name: "page2",
                                    label: "页面2",
                                    icon: "setting",
                                    url: "Other/PageTwo",
                                },
                            ],
                        },
                    ],
                    token: Mock.Random.guid(),
                    message: '获取成功'
                }
            }
        } else if (username === 'test' && password === 'test') {
            return {
                code: 20000,
                data: {
                    menu: [
                        {
                            path: "/",
                            name: "home",
                            label: "首页",
                            icon: "s-home",
                            url: "Home/Home",
                        },
                        {
                            path: "/user",
                            name: "user",
                            label: "用户管理",
                            icon: "user",
                            url: "UserManage/UserManage",
                        },
                    ],
                    token: Mock.Random.guid(),
                    message: '获取成功'
                }
            }
        } else {
            return {
                code: -999,
                data: {
                    message: '账号/密码错误'
                }
            }
        }

    }
}

