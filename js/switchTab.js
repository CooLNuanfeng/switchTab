// JavaScript Document

// 根据数量计算宽度 拖拽改变位置
(function($){
	function Factory(options){
		
		var tab = new SwitchTab(options);
		return tab.init(options);
		
	}
	
	$.switchTab = $.fn.switchTab = Factory;
})(jQuery)

function SwitchTab(){
	
	this.$switchTab = $(this);
	
	this.settings = {
		id : '', 
		width : 500,
		height:'auto',
		className:'',
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
	
	init : function(options){
		
		$.extend(this.settings,options);
		
		this.createTab();
	},
	
	createTab : function(){
		
		var title = [];
		var content = [];
		var titleList ='';
		var boxDiv =''
		for(var i=0; i<this.settings.count;i++){
			
			for(var attr in this.settings.title){
				title.push(this.settings.title[attr])
			}
			for(var attr in this.settings.content){
				content.push(this.settings.content[attr])
			}
			titleList +='<li '+(i==0?'class="active"':'')+'><a href="javascript:;" class="fa fa-paper-plane"></a><span>'+ title[i] +'</span></li>'
			boxDiv += '<div class="tab_box '+(i==0?'active':'') +'"></div>'
		};
		
		var html = '<div class="tab_title"><ul>'+titleList+'</ul></div>'+boxDiv
		
		$('#'+this.settings.id).addClass('tab '+this.settings.className).html(html)
		
	}
	
}





















