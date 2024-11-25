"use strict";
// 主代码
// 循环数组
function fn_arr_rotate(
// 必需
a_fix, // 修正坐标 [ 目标 index, 目标 value ]
len_arr, // 数组长度
// 可选
index_first = 1, // 首个元素索引
n_min = 1, // 最小值
n_max = len_arr, // 最大值
n_step = 1 // 步长
) {
    let a_n = Array(len_arr + 1);
    let n_diff = a_fix[0] - index_first;
    let n = a_fix[1] - n_diff * n_step; // 插入值
    for (let i = index_first; i <= len_arr; i++) {
        n = (n > n_max) ? n - n_max : n;
        n = (n < n_min) ? n + n_max : n;
        a_n[i] = n;
        n = n + n_step;
    }
    return a_n;
}
// 排布
class c_infer {
    constructor(month_eb12, hour_eb12) {
        this.a_lord = Array(13);
        this.a_action = Array(13);
        // 排布
        // console.log('(15-month_eb12)%12 =', (15-month_eb12)%12)
        this.a_lord = fn_arr_rotate([hour_eb12, (15 - month_eb12) % 12], 12);
        this.a_action = fn_arr_rotate([hour_eb12, month_eb12], 12);
    }
}
// 测试
let test_infer = new c_infer(12, 6);
console.log("文件：main.js\n测试", '\n月将:', test_infer.a_lord, '\n建除:', test_infer.a_action);
