// 從 Vue 3 的 ESM 版本裡，取出 createApp 這個函式，
// createApp 是「建立一個 Vue 應用程式」的入口
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'


// Vue 定式 *********************************************************
// createApp({...}) 裡面傳的物件，就是「根元件 (Root Component)」的設定，
// 對應到 index.html 裡 id="app" 的那個區塊
const app = createApp({
	// data() 要 return 一個物件，裡面放的都是「會被 Vue 追蹤變化」的資料
	// 只要這裡的資料改變，畫面上有用到它的地方就會自動重新渲染，不用自己操作 DOM
	data() {
		return {
			// counters 是一個陣列，裡面放 4 筆「場地資料」物件
			// 之所以改成陣列，是為了讓 index.html 可以用 v-for 迴圈渲染，
			// 而不用像下面註解那樣，一個一個宣告 counter1, counter2, counter3...
			counters: [
				{ id: 1, title: '游泳池', price: 100, cnt: 0, total: 0, },
				{ id: 2, title: '健身房', price: 120, cnt: 0, total: 0, },
				{ id: 3, title: '飛輪室', price: 150, cnt: 0, total: 0, },
				{ id: 4, title: '羽球館', price: 200, cnt: 0, total: 0, },
			],
			// #region 保留
			// 這是「還沒改成陣列」之前的舊寫法：每個場地各自一個獨立變數
			// 缺點：如果要新增第 5 個場地，就要多寫一個 counter4，還要多寫對應的 HTML 跟 method
			// counter1: { id: 1, title: '游泳池', price: 100, cnt: 0, total: 0, },
			// counter2: { id: 2, title: '健身房', price: 120, cnt: 0, total: 0, },
			// counter3: { id: 3, title: '飛輪室', price: 150, cnt: 0, total: 0, },
			// #endregion
		};
	},
	// methods 放的是「函式」，通常用來回應使用者操作(點擊、子元件事件...)，
	// 跟 computed 不同，methods 每次呼叫都會重新執行一次，不會被快取
	methods: {
		// 當任何一台 <my-counter> 觸發 @abc 事件時（也就是子元件按下「傳出去」按鈕），
		// 這個函式就會被呼叫，title 是子元件那邊 $emit 傳過來的參數
		onAbc(title) {
			showMsg(`${title} 的 abc 事件發生了`);
		},
		// 當任何一台 <my-counter> 的 cnt 改變時，會觸發 @cntchg 事件，呼叫這裡
		// id：是哪一台計數器（用來比對是 counters 陣列裡的哪一筆）
		// cnt：那台計數器目前的人數
		// total：那台計數器目前的收入小計
		onCntChg(id, cnt, total) {
			// 用陣列的 find() 方法，在 counters 裡找出 id 相符的那筆物件
			const counter = this.counters.find(p => p.id === id);
			if (!counter)
				return;  // 找不到就直接跳出，避免後面程式出錯
			// 把子元件回報的最新資料，同步更新回父層的 counters 陣列
			// 因為畫面上的「統計資訊」用的是 counters 裡的資料，不更新的話畫面不會變
			counter.cnt = cnt;
			counter.total = total;

			// #region 保留
			// 這是「還沒改成陣列」之前的舊寫法：
			// 因為沒有陣列可以 find()，只好用 if/else if 一個一個去比對、手動更新
			// if (id == this.counter1.id) {
			// 	this.counter1.cnt = cnt;
			// 	this.counter1.total = total;
			// } else if (id == this.counter2.id) {
			// 	this.counter2.cnt = cnt;
			// 	this.counter2.total = total;
			// } else if (id == this.counter3.id) {
			// 	this.counter3.cnt = cnt;
			// 	this.counter3.total = total;
			// }
			// #endregion
		},
		
		// #region 保留
		// 舊寫法：因為每個場地是各自獨立的變數，所以每個場地要各自寫一個 onCntChgX 事件處理函式
		// onCntChg1(id, cnt, total) {
		// 	this.counter1.cnt = cnt;
		// 	this.counter1.total = total;
		// },
		// onCntChg2(id, cnt, total) {
		// 	this.counter2.cnt = cnt;
		// 	this.counter2.total = total;
		// },
		// onCntChg3(id, cnt, total) {
		// 	this.counter3.cnt = cnt;
		// 	this.counter3.total = total;
		// },
		// #endregion
	},
	// computed（計算屬性）：像是「自動算好的資料」
	// 特點：裡面用到的資料（例如 counters）只要沒變，Vue 就會直接用上次算好的快取結果，不會重算
	// 適合拿來做「加總、篩選、格式化」這種可以從既有資料推導出來的東西
	computed: {
		// 計算「所有場地的人數總和」
		cnt: function() {
			// reduce((累加值 a, 目前這筆 p) => 新的累加值, 初始值 0)
			// 意思是：從 0 開始，把每一筆 p.cnt 一直加上去
			return this.counters.reduce((a, p) => a + p.cnt, 0);

			// #region 保留
			// 入門寫法：用最基本的 for...of 迴圈手動累加，效果跟上面的 reduce 一樣，但比較好理解
			// let sum = 0;
			// for (let c of this.counters) {
			// 	sum += c.cnt;
			// }
			// return sum;

			// 舊寫法：因為以前沒有陣列，只能把每個場地的人數用 + 號手動加起來
			// return this.counter1.cnt + this.counter2.cnt + this.counter3.cnt;
			// #endregion
		},
		// 計算「所有場地的收入總和」，邏輯跟上面 cnt 一模一樣，只是換算 total 欄位
		total: function() {
			return this.counters.reduce((a, p) => a + p.total, 0);

			// #region 保留
			// 舊寫法
			// return this.counter1.total + this.counter2.total + this.counter3.total;
			// #endregion
		},
	},
});


// 註冊一個「全域自訂元件」，名稱叫 MyCounter，
// 在 HTML 裡使用時要寫成 <my-counter>（Vue 會自動把駝峰式命名轉成 kebab-case）
app.component('MyCounter', {
	// template: '#my-counter' => 告訴 Vue，這個元件長什麼樣子，
	// 去抓 index.html 裡 id="my-counter" 的那段 <script type="text/x-template"> 樣板
	template: '#my-counter',
	// 每個 <my-counter> 元件「各自獨立」擁有自己的 data，
	// 意思是 4 台計數器的 cnt 互不影響，各自從 0 開始算
	data() {
		return {
			cnt: 0,
		};
	},
	methods: {
		// 點擊「加一」按鈕時執行：把自己的 cnt 加 1
		add: function() {
			this.cnt++;
		},
		// 點擊「減一」按鈕時執行：把自己的 cnt 減 1
		sub: function() {
			this.cnt--;
		},
		// 點擊「清除」按鈕時執行：把自己的 cnt 歸零
		clr: function() {
			this.cnt = 0;
		},
		// 點擊「傳出去」按鈕時執行：
		// this.$emit('abc', this.title) 意思是「發射一個叫 abc 的事件」，並把 title 當作參數傳出去
		// 父層(index.html)那邊寫 @abc="onAbc"，就是在接收這個事件
		goOut() {
			this.$emit('abc', this.title);
		},
	},
	// props：定義這個元件「可以從外面(父層)接收哪些資料」
	// 寫在 HTML 上用 :id="..." :title="..." :price="..." 傳進來的值，就會對應到這裡
	props: {  // 屬性 (HTML attribute)
		id: {
			type: String,   // 限定型別必須是字串，如果傳錯型別，開發模式下 console 會警告
			required: true, // 表示這個 prop 是必填的，沒傳的話 console 也會警告
		},
		title: String,      // 簡寫寫法：只限定型別，沒有其他規則
		price: {
			type: Number,
			default: 100,   // 如果父層沒有傳 price 進來，就用預設值 100
		},
	},
	// props: ['id', 'title', 'price'],  // 這是更簡化(但沒有型別檢查)的舊寫法，僅列出 prop 名稱

	// emits：明確宣告這個元件「會發出哪些自訂事件」
	// 這樣寫的好處：Vue 開發模式下能幫你檢查、也讓其他人一看就知道這元件會 emit 什麼
	emits: ['abc', 'cntchg'],  // 事件 (HTML event)
	computed: {
		// 根據目前人數 cnt 決定文字顏色：
		// cnt >= 0 顯示藍色，cnt 是負的（例如按太多次「減一」）就顯示紅色示警
		fcolor: function() {
			return this.cnt >= 0 ? 'color: blue;' : 'color: red;';
		},
		// 收入小計 = 目前人數 * 票價，只要 cnt 或 price 其中一個變了，這裡就會自動重新計算
		total: function() {
			return this.cnt * this.price;
		},
	},
	// watch：專門用來「監看某一筆資料的變化」，一旦變化就執行對應的函式
	// 跟 computed 不一樣：watch 不是用來「算出一個新值」，而是用來「在變化發生時做某件事(side effect)」
	watch: {
		// 監看 cnt 這個 data，只要 cnt 改變（不管是 add/sub/clr 造成的），這個函式就會自動被呼叫
		cnt(newValue, oldValue) {  // newValue: 改變後的新值, oldValue: 改變前的舊值
			// 主動通知父層：「我的人數變了！」
			// 把 id(是哪台)、newValue(新人數)、this.total(最新收入) 一起傳出去
			// 這樣父層(index.html/main.js 根元件)就能同步更新 counters 陣列裡對應那筆資料
			this.$emit('cntchg', this.id, newValue, this.total);  // 發送事件
		},
	},
});

// 把根元件掛載到 index.html 裡 id="app" 的 DOM 節點上，畫面才會真正顯示出來
app.mount('#app');






// 訊息框操作 *********************************************************
// 以下是「純原生 JavaScript」的部分，跟 Vue 無關，操作的是 index.html 裡 id="msg" 的 <pre> 標籤

// 顯示資訊到 #msg 訊息框
// 可透過 newLine 參數設定是否換行，預設會換行
function showMsg(msg, newLine = true) {
	// textContent += ... 表示「在原本的文字後面，接續新增文字」，不會清掉舊的內容
	document.getElementById('msg').textContent += `${msg}${newLine ? '\r\n' : ''}`;
}

// 清除 #msg 訊息框資訊
function clearMsg() {
	// 直接把內容設成空字串，等於清空整個訊息框
	document.getElementById('msg').textContent = '';
}

// 幫「清除」按鈕(id="bClrMsg")綁定點擊事件，點擊時執行 clearMsg 函式
document.getElementById('bClrMsg').addEventListener('click', clearMsg);
// 訊息框操作 *********************************************************
