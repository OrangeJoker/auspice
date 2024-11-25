// 中文术语

// const c_a_polarity: string[] = ['阴','阳']
const c_a_nature: string[] = ['五行', '金', '水', '木', '火', '土']
const c_a_hs10: string[] = ['10天干', '甲','乙','丙','丁','戊','己','庚','辛','壬','癸']
const c_a_eb12: string[] = ['12地支', '子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥']
const c_a_action: string[] = ['12建除', '建','除','满','平','定','执','破','危','成','收','开','闭']
const c_a_lord: string[] = ['12神将',
    '神后', '大吉', '功曹', '太冲', '天罡', '太乙',
    '胜光', '小吉', '传送', '从魁', '河魁', '登明'
]

// Html文本：干支历
function fn_html_scc (
        y_hs10: number, y_eb12: number,
        m_hs10: number, m_eb12: number,
        d_hs10: number, d_eb12: number,
        h_hs10: number, h_eb12: number
    ): string {
    let s_year:string = c_a_hs10[y_hs10] + c_a_eb12[y_eb12]
    let s_month:string = c_a_hs10[m_hs10] + c_a_eb12[m_eb12]
    let s_day:string = c_a_hs10[d_hs10] + c_a_eb12[d_eb12]
    let s_hour:string = c_a_hs10[h_hs10] + c_a_eb12[h_eb12]
    return `${s_year}年 ${s_month}月 ${s_day}日 ${s_hour}时`
}

// 字符串数组：数字转文字
function fn_cn_arr (arr_n:number[], s_switch:string):string[] {
    let a_result: string[] = []
    let a_replace_cn: string[] = []
    switch (s_switch) {
        case '五行': a_replace_cn = c_a_nature; break;
        case '天干': a_replace_cn = c_a_hs10; break;
        case '地支': a_replace_cn = c_a_eb12; break;
        case '建除': a_replace_cn = c_a_action; break;
        case '月将': a_replace_cn = c_a_lord; break;
    }
    for (let v of arr_n) a_result.push(a_replace_cn[v])
    return a_result
}

// 测试
console.log(fn_html_scc(1,1,1,1,1,1,1,1))
console.log(fn_cn_arr([10,11,12,1,2,3,4,5,6,7,8,9], '月将'))
