// 择吉 三门四户

//// -- 通用 --

// 五行
enum em_nature { '金' = 1, '水', '木', '火', '土' }

// 生克（扶：我同，生：我生，克：我克，耗：克我，泻：生我）
enum em_reaction { '耗' = -2, '泻', '扶', '生', '克'}

// 判断生克     let n = (new c_reaction(1, 2)).fn_react()
class c_reaction {
    constructor(
        public h:  1 | 2 | 3 | 4 | 5,	// 主（我）五行
        public g:  1 | 2 | 3 | 4 | 5	// 客五行
    ) {}
    fn_react(): number {
        let n: number = this.g - this.h
        if(n > 2) {
            n = n - 5
        } else if (n < -2) {
            n = n + 5
        }
        return n
    }
}

// 基础类：能量（名称、五行）
class c_energy {
    constructor(
        public name: string,    // 名称
        public nature: 1 | 2 | 3 | 4 | 5    // 五行
    ) {}
}

// 继承类：地支
class c_branch extends c_energy {
    constructor(
        name: string, nature: 1 | 2 | 3 | 4 | 5,
        public lead: string,
        public action: string,
        public couple: number
    ) { super(name, nature) }
}
// 类数组：12地支
const arr_branch: Array<c_branch> = [ new c_branch('地支', 1, '月将', '建除', 0),
    // 首个元素 array[0] 不可用，可用元素从 array[1] 开始
    new c_branch('子', 2, '神后', '建', 2),
    new c_branch('丑', 5, '大吉', '除', 1),
    new c_branch('寅', 3, '功曹', '满', 12),
    new c_branch('卯', 3, '太冲', '平', 11),
    new c_branch('辰', 5, '天罡', '定', 10),
    new c_branch('巳', 4, '太乙', '执', 9),
    new c_branch('午', 4, '胜光', '破', 8),
    new c_branch('未', 5, '小吉', '危', 7),
    new c_branch('申', 1, '传送', '成', 6),
    new c_branch('酉', 1, '从魁', '收', 5),
    new c_branch('戌', 5, '河魁', '开', 4),
    new c_branch('亥', 2, '登明', '闭', 3)
]
// 继承类：天干
class c_stem extends c_energy {
    constructor(
        name: string, nature: 1 | 2 | 3 | 4 | 5,
        public polarity: 0 | 1 // 阴 0 阳 1
    ) { super(name, nature) }
}
// 类数组：10天干
const arr_stem:Array<c_stem> = [ new c_stem('天干', 1, 0),
    // 首个元素 array[0] 不可用，可用元素从 array[1] 开始
    new c_stem('甲', 3, 1), new c_stem('乙', 3, 0),
    new c_stem('丙', 4, 1), new c_stem('丁', 4, 0),
    new c_stem('戊', 5, 1), new c_stem('己', 5, 0),
    new c_stem('庚', 1, 1), new c_stem('辛', 1, 0),
    new c_stem('壬', 2, 1), new c_stem('癸', 2, 0)
]
// 循环数组
class c_ring {
    a_n: number[] = [];
    constructor(
        // 必需
        a_fix: number[],    // 修正坐标 [ 目标 index, 目标 value ]
        len_arr: number,      // 数组长度
        // 可选
        index_first: number = 1,    // 首个元素索引
        n_min: number = 1,  // 最小值
        n_max: number = len_arr,  // 最大值
        n_step: number = 1, // 步长
    ) {
        this.a_n = Array(len_arr + 1)
        let n_diff: number = a_fix[0] - index_first
        let n: number = a_fix[1] - n_diff * n_step  // 插入值
        for (let i:number = index_first; i <= len_arr; i++) {
            n = (n > n_max)? n - n_max: n
            n = (n < n_min)? n + n_max: n
            this.a_n[i] = n
            n = n + n_step
        }
    }
}

//// -- 通用 --

//// -- 函数 --

// Html文本：干支历
class c_html_scc {
    constructor(
        public ys: number, public yb: number,
        public ms: number, public mb: number,
        public ds: number, public db: number,
        public hs: number, public hb: number,
    ) {}
    fn_html(): string {
        let s_year:string = arr_stem[this.ys].name + arr_branch[this.yb].name
        let s_month:string = arr_stem[this.ms].name + arr_branch[this.mb].name
        let s_day:string = arr_stem[this.ds].name + arr_branch[this.db].name
        let s_hour:string = arr_stem[this.hs].name + arr_branch[this.hb].name
        return s_year + '年 ' + s_month + '月 ' + s_day + '日 ' + s_hour + '时'
    }
}
// 排布
class c_infer {
	a_lead: string[] = Array(13);
	a_action: string[] = Array(13);
    constructor(month_branch: number, hour_branch: number){
        // 排布
        let a_n_lead: number[] = new c_ring([hour_branch, arr_branch[month_branch].couple], 12).a_n
        let a_n_action: number[] = new c_ring([hour_branch, month_branch], 12).a_n
        // 替换为中文
        for (let i = 1; i <= 12; i++) {
            this.a_lead[i] = arr_branch[a_n_lead[i]].lead
            this.a_action[i] = arr_branch[a_n_action[i]].action
        }
    }
}

//// -- 函数 --

// 测试
let test_html_scc:string = (new c_html_scc(1,2,1,1,1,1,1,1)).fn_html()
let test_infer:c_infer = new c_infer(12, 6)
console.log(
    "文件：main.js\n测试：\nhtml_scc:", test_html_scc,
    '\ninfer:',
    test_infer.a_lead, test_infer.a_action
)
