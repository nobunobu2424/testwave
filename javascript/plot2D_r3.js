var Plot2D = function (canvasDom) {
	//ローカル変数
	var plotDatas = [];  //描画用データ
	//デフォルトのオプション
	this.options = {
		//デフォルト軸オプション
		axesDefaults : {
			pad : 1.05,                 //軸の描画範囲のパッディング
			labelRenderer : $.jqplot.CanvasAxisLabelRenderer, //ラベルレンダラーの指定
			labelOptions : {
				show : true,                     //ラベル描画の有無（デフォルト：true）
				angle : -90,                     //ラベル描画角度（デフォルト：-90）
				fontFamily : 'Times New Roman',  //ラベルフォント（デフォルト：'"Trebuchet MS", Arial, Helvetica, sans-serif'）
				fontSize : '20px',               //ラベルフォントサイズ（デフォルト：'11pt'）
				fontWeight : 'bold',             //ラベルウェイト（デフォルト：'nomal'）
				textColor : '#666666'            //ラベルカラー（デフォルト：'#666666'）
			},
			tickRenderer : $.jqplot.CanvasAxisTickRenderer,
			tickOptions : {
				show : true,           //目盛マークと目盛ラベル描画の有無（デフォルト：true）
				showLabel : true,      //目盛ラベル描画の有無（デフォルト：true）
				showMark : true,       //目盛マーク描画の有無（デフォルト：true）
				showGridline : true,   //グリッドラインの描画（デフォルト：true）
				mark : 'outside',      //目盛マークの描画位置の指定（デフォルト：'outside', 他は 'inside' or 'cross'）
				markSize : 4,          //目盛マークのサイズ（デフォルト：4）
				formatString : '',     //フォーマット指定子の設定（デフォルト：'', 例「%.2f」）
				fontSize : '10pt',     //目盛ラベルフォントサイズ（デフォルト：12px）
				fontWeight : 'bold',   //目盛ラベルウェイト（デフォルト：'400'）
				textColor : '#666666', //目盛ラベルカラー（デフォルト：null)
				fontFamily : 'Times New Roman',  //目盛ラベルフォント（デフォルト：'"Trebuchet MS", Arial, Helvetica, sans-serif'）
				angle : 0,             //目盛ラベル描画角度（デフォルト：0）
				prefix : ''            //目盛ラベルのプレフィックス（デフォルト：''）
			}
		},
		//軸オプション
		axes : {
			xaxis : {                 //x軸のオプション
				label : 'x',            //x軸のラベル（デフォルト：null）
				min : null,             //x軸の最小値（デフォルト：null）
				max : null,             //x軸の最大値（デフォルト：null）
				tickInterval : null,    //x軸の目盛間隔（デフォルト：null）
				labelOptions : { angle: 0} //ラベルレンダラオプション（デフォルト：{}）
			},
			yaxis : {                 //y軸のオプション
				label : 'y',            //y軸のラベル（デフォルト：null）
				min : null,             //y軸の最小値（デフォルト：null）
				max : null,             //y軸の最大値（デフォルト：null）
				tickInterval : null,    //y軸の目盛間隔（デフォルト：null）
				labelOptions : { angle : 0} //ラベルレンダラオプション（デフォルト：{}）
			}
		},
		//グリッドオプション
		grid : {
			background : '#FFFFFF'       //背景色（デフォルト：#fffdf6）
		},
		//凡例オプション
		legend : {
			show : true,                 //凡例の有無
			location : 'ne',             //凡例の設置場所 'nw'：左上, 'n'：上, 'ne'：右上, 'e'：右, 'se'：右下, 's'：下, 'sw'：左下, 'w'：左
			placement : 'insideGrid'     //凡例の設置場所（デフォルト：'insideGrid'）（値 = 'insideGrid' || 'outsideGrid'）
		},
		//カーソルオプション
		cursor : {
			show : true,                  //カーソルの描画（デフォルト：$.jqplot.config.enablePlugins）
			style : 'crosshair',          //カーソルの種類（デフォルト：'crosshair'）
			zoom : true,                  //ズームの可否（デフォルト：'false'）
			looseZoom : true,             //あいまい値利用の有無（デフォルト：'true'）
			clickReset : true,            //クリックによるズームのリセット有無（デフォルト：'false'）
			dblClickReset : false,        //あいまい値利用の有無（デフォルト：'true'）
			constrainOutsideZoom : false, //グラフ描画の外側もズーム対象としない（デフォルト：true）
			showTooltipOutsideZoom : true //「constrainOutsideZoom : false」の場合に、ツールチップに外側の値を描画
		},
		//ハイライトオプション
		highlighter : {
			show : true,               //ハイライト描画の有無（デフォルト：true）
			showTooltip : true,        //ツールチップ描画の有無（デフォルト：true）
			tooltipLocation : 'ne',    //ツールチップ描画の方向（デフォルト：'ne'）
			fadeTooltip : true,        //ツールチップフェード描画の有無（デフォルト：true）
			tooltipFadeSpeed : 'def',  //ツールチップフェードの速度（デフォルト：'fast'）（'slow','def','fast', ミリ秒）
			tooltipAxes : 'xy',        //ツールチップに描画うする軸（デフォルト：'xy'）（'x', 'y' , 'xy', 'yx'）
			sizeAdjust : 7.5           //マーカーのサイズ（デフォルト：7.5）
		}
	};

	//メソッド１：データ列追加メソッド
	this.pushData = function (data) {
		plotDatas.push(data);  //pushメソッドによる要素の追加
	}

	//メソッド２：グラフ描画メソッド
	this.linerPlot = function () {
		//描画前にCanvas要素の消去
		this.clearCanvas();                            

		//線形グラフ描画レンダラーの設定
		this.options.axes.yaxis.renderer = $.jqplot.LinerAxisRenderer;  
	
		//グラフ描画
		$.jqplot(canvasDom, plotDatas, this.options); 
	}
	
	//メソッド３：対数グラフ描画メソッド
	this.logPlot = function (base) {
		var base = base || 10; //対数の底（10, 2 or Math.E）

		//対数グラフ時の「y<0」となる描画点データの削除
		for (var i = 0; i < plotDatas.length; i++) {  //i番目の描画点データ列
			var _data = []; //一時変数
			
			//「y>0」の値だけ描画点データを残す
			for (var j = 0; j < plotDatas[i].length; j++) { //i番目の描画点データ列に対するj番目の点
				//plotDatas[i][j][0]とplotDatas[i][j][1]は、i番目の描画点データ列に対するj番目の点のx座標とy座標
				if (plotDatas[i][j][1] > 0) _data.push(plotDatas[i][j]);
			}

			//i番目の描画点データ列を初期化
			plotDatas[i] = [];

			//i番目の描画点データ列を代入（これですべての点は「y>0」となる）
			for (var j = 0; j < _data.length; j++) {
				plotDatas[i][j] = _data[j];
			}
		}

		//描画前にCanvas要素の消去
		this.clearCanvas();                            

		//対数グラフ描画レンダラーの設定
		this.options.axes.yaxis.renderer = $.jqplot.LogAxisRenderer; 

		//対数の底の設定
		this.options.axes.yaxis.rendererOptions = { base: base };    
		
		//グラフ描画
		$.jqplot(canvasDom, plotDatas, this.options); 

	}
	//メソッド４：Canvas要素消去メソッド
	this.clearCanvas = function () {
		//HTML要素の中身を消去
		document.getElementById(canvasDom).innerHTML = null;
	}
}



///////////////////////////////////////////////////
//Mathクラスのプロパティ・メソッドを単独定義
//////////////////////////////////////////////////
var E = Math.E;
var LN10 = Math.LN10;
var LN2 = Math.LN2;
var LOG10E = Math.LOG10E;
var LOG2E = Math.LOG2E;
var PI = Math.PI;
var SQRT1_2 = Math.SQRT1_2;
var SQRT2 = Math.SQRT2;

function abs(x){
	return Math.abs(x);
}
function pow(x, n){
	return Math.pow(x , n);
}
function acos(x){
	return Math.acos(x);
}
function asin(x){
	return Math.asin(x);
}
function atan(x){
	return Math.atan(x);
}
function atan2(x){
	return Math.atan2(x);
}
function cos(theta){
	return Math.cos(theta);
}
function sin(theta){
	return Math.sin(theta);
}
function tan(theta){
	return Math.tan(theta);
}
function exp(x){
	return Math.exp(x);
}
function sqrt(x){
	return Math.sqrt(x);
}
function exp(x){
	return Math.exp(x);
}
function exp(x){
	return Math.exp(x);
}
function log(x){
	return Math.log(x);
}
