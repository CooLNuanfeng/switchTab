// JavaScript Document

// 根据数量计算宽度 拖拽改变位置
$(function(){
	
	function Factory(options){
		
		var tab = new SwitchTab(options);
		return tab.init(options);
		
	}
	
	$.switchTab = $.fn.switchTab = Factory;
	
})(jQuery)

function SwitchTab(){
	
	this.$switchTab = null;
	
	this.settings = {
		width : 500,
		height:'auto',
		count : 3,
		drag : false,
		title :{
			tab1 : '标题一',
			tab2: '标题二',
			tab3: '标题三'
		},
		content:{
			tab1 : '',
			tab2: '',
			tab3: ''
		},
		events : 'mouseover',
		autoPlay : false
	}
}

SwitchTab.prototype = {
	
	constructor : SwitchTab,
	
	init : function(){
	}
	
}



