// 主代码

// 循环数组
function fn_arr_rotate(
    // 必需
    a_fix: number[],	// 修正坐标 [ 目标 index, 目标 value ]
    len_arr: number,	// 数组长度
    // 可选
    index_first: number = 1,    // 首个元素索引
    n_min: number = 1,  // 最小值
    n_max: number = len_arr,  // 最大值
    n_step: number = 1	// 步长
): number[] {
    let a_n: number[] = Array(len_arr + 1)
    let n_diff: number = a_fix[0] - index_first
    let n: number = a_fix[1] - n_diff * n_step  // 插入值
    for (let i:number = index_first; i <= len_arr; i++) {
        n = (n > n_max)? n - n_max: n
        n = (n < n_min)? n + n_max: n
        a_n[i] = n
        n = n + n_step
    }
    return a_n
}

// 排布
class c_infer {
    a_lord: number[] = Array(13);
    a_action: number[] = Array(13);
    constructor(month_eb12: number, hour_eb12: number){
        // 排布
        // console.log('(15-month_eb12)%12 =', (15-month_eb12)%12)
        this.a_lord = fn_arr_rotate([hour_eb12, (15-month_eb12)%12], 12)
        this.a_action = fn_arr_rotate([hour_eb12, month_eb12], 12)
    }
}

// 测试
let test_infer:c_infer = new c_infer(12, 6)
console.log(
    "文件：main.js\n测试",
    '\n月将:',test_infer.a_lord,
    '\n建除:',test_infer.a_action
)
