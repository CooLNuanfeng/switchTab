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
	
	this.iNow = 0;
	this.autoTimer = null;
	
	this.settings = {
		id : '', 
		width : 500,
		height:'auto',
		tabWidth : 120,
		tabHeight: 28,
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
		autoPlay : false,
		closedTab : true,
		playTime : 5000
	}
}

SwitchTab.prototype = {
	
	constructor : SwitchTab,
	
	init : function(options){
		
		$.extend(this.settings,options);
		
		this.createTab();
		this.tabSize();
		this.events();
		this.closedTab();
		this.autoPlay();
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
			if(this.settings.closedTab){
				titleList +='<li '+(i==0?'class="active"':'')+'><a href="javascript:;" class="fa fa-paper-plane"></a><span>'+ title[i] +'</span></li>'
			}else{
				titleList +='<li '+(i==0?'class="active"':'')+'><span>'+ title[i] +'</span></li>'
			}
			boxDiv += '<div class="tab_box '+(i==0?'active':'') +'">'+content[i]+'</div>'
		};
		
		var html = '<div class="tab_title"><ul>'+titleList+'</ul></div>'+boxDiv
		
		$('#'+this.settings.id).addClass('tab '+this.settings.className).html(html)
		
	},
	
	tabSize : function(){
		
		$('#'+this.settings.id).css({
			width : this.settings.width
			}).find('.tab_box').css({ height : this.settings.height})
		$('.tab_title li').css({
			width: this.settings.tabWidth,
			height : this.settings.tabHeight,
			lineHeight :this.settings.tabHeight+'px'
		})
	},
	
	events : function(n){
		
		var This = this;
		
		if(this.settings.autoPlay){
			$('#'+this.settings.id).mouseover(function(){
				clearInterval(This.autoTimer)
			})
			$('#'+this.settings.id).mouseout(function(){
				This.autoPlay();
			})
		}
		
		if(this.settings.events == 'mouseover'){
			var timer = null;
			$('.tab_title li').mouseover(function(){
				var _this = this
				if(This.autoPlay){
					This.iNow = $(_this).index();
				}
				timer = setTimeout(function(){
					$('.tab_title li').removeClass('active');
					$('.tab_box').removeClass('active');
					$(_this).addClass('active');
					$('.tab_box').eq(This.iNow).addClass('active');
				},300)
			});
			$('.tab_title li').mouseout(function(){
				clearTimeout(timer);
			})
		}
	},
	
	closedTab : function(){
		
		if(this.settings.closedTab){
			$('.tab_title li a').click(function(){
				$(this).parent().remove();
				$('.tab_box').eq($(this).index()).remove();
			})
		}
		
	},
	
	autoPlay : function(n){
		
		var This = this;
		if(n){
			this.iNow = n;
		}
		
		if(this.settings.autoPlay){
			this.autoTimer = setInterval(function(){
				This.iNow++;
				if(This.iNow>This.settings.count-1){
					This.iNow = 0;
				}
				
				$('.tab_title li').removeClass('active');
				$('.tab_box').removeClass('active');
				$('.tab_title li').eq(This.iNow).addClass('active');
				$('.tab_box').eq(This.iNow).addClass('active')
				
			},this.settings.playTime)
		}
	
	}
	
}





















