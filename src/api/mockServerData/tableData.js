import Mock from 'mockjs';

let list = [];
//根据随机数0/1 来给予性别
function getSex() {
    const num = Math.round(Math.random());
    return num === 0 ? "男" : "女" ;
}
export default {
    getTableData: () => {
        // const data = {
        //     date: "2016-05-02",
        //     name: "李民康",
        //     age: "20",
        //     sex: "男",
        //     address: "上海市普陀区金沙江路 1518 弄",
        // };
        // const tableData = new Array(20).fill(data);
        // return tableData;
        for (let index = 0; index < 20; index++) {
            list.push(
                Mock.mock({
                    date: Mock.Random.date(),
                    name: Mock.Random.cname(),
                    age: Mock.Random.integer(18, 30).toString(),
                    sex: getSex(),
                    // address: Mock.Random.address(),
                    address: Mock.Random.county(true),
                })
            )
        }
        return {
            code: 200,
            data: {list}
        }
    }
}