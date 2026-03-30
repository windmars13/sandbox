// JS 基本練習
let personName = "金城武";
let age = 43;
let isMale = true;

function showInfo() {
    console.log("有執行 JS");

    // 性別轉換成文字
    // 三元運算子 => 條件 ? 條件為真時的值 : 條件為假時的值
    let genderText = isMale ? "男" : "女";

    // 組合輸出字串
    let info = `${personName}, 年齡: ${age}, 性別: ${genderText}`;

    // 顯示在網頁上
    document.getElementById("output").textContent = info;
}
// 呼叫函式
showInfo();

let infoText = "<b>金城武</b>, <h3>年齡: 43,</h3> 性別: 男";

// 使用 textContent → 顯示純文字，不解析 HTML
document.getElementById("textOutput").textContent = infoText;

// 使用 innerHTML → 解析 HTML 標籤，顯示加粗效果
document.getElementById("htmlOutput").innerHTML = infoText;