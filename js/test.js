"use strict";
class c_ring2 {
    constructor(
    // 必需
    a_fix, // 修正坐标 [ 目标 index, 目标 value ]
    len_arr, // 可用元素个数 = 数组长度-首个元素索引
    // 可选
    index_first = 1, // 首个元素索引
    n_min = 1, // 最小值
    n_max = len_arr, // 最大值
    n_step = 1) {
        this.a_n = [];
        this.a_n = Array(len_arr + 1);
        let n_diff = a_fix[0] - index_first;
        let n = a_fix[1] - n_diff * n_step; // 插入值
        for (let i = index_first; i <= len_arr; i++) {
            n = (n > n_max) ? n - n_max : n;
            n = (n < n_min) ? n + n_max : n;
            this.a_n[i] = n;
            n = n + n_step;
        }
    }
}
let arr_test = new c_ring2([6, 12], 12).a_n;
console.log(arr_test, typeof (arr_test[0]));
