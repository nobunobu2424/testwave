var Plot2D = function (canvasDom) { //<------------------------------------------------------（※１）
	//ローカル変数
	var plotDatas = [];  //描画用データ

	//仮想物理実験室で利用するデフォルトのオプション
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
		//this.clearCanvas();
		$.jqplot(canvasDom, plotDatas, this.options);  //グラフ描画
	}
	
}
