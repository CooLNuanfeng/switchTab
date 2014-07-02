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
		playTime : 5000,
		drag : false
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
		this.drag();
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
	
	events : function(){
		
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
				},230)
			});
			$('.tab_title li').mouseout(function(){
				clearTimeout(timer);
			})
		}
		
		if(this.settings.events == 'click'){
			$('.tab_title li').on('click',function(){
				var _this = this
				if(This.autoPlay){
					This.iNow = $(_this).index();
				}
				$('.tab_title li').removeClass('active');
				$('.tab_box').removeClass('active');
				$(_this).addClass('active');
				$('.tab_box').eq(This.iNow).addClass('active');
			});
		}
	},
	
	closedTab : function(){
		
		var This = this;
		
		if(this.settings.closedTab){
			$('.tab_title li a').on('click',function(){
				var delIndex = $(this).parent().index();
				var len = $('.tab_title li').length
				//console.log(delIndex,len)
				if(len ==1){
					return;
				}
				if(This.settings.autoPlay){
					console.log(len)
					This.settings.count = len-1;
				}
				if(delIndex == len-1){
					$('.tab_title li').eq(delIndex-1).addClass('active');
					$('.tab_box').eq(delIndex-1).addClass('active');
				}else{
					$('.tab_title li').removeClass('active');
					$('.tab_box').removeClass('active');
					$('.tab_title li').eq(delIndex+1).addClass('active');
					$('.tab_box').eq(delIndex+1).addClass('active');
				}
				$(this).parent().remove();
				$('.tab_box').eq(delIndex).remove();
			})
		}
		
	},
	
	autoPlay : function(){
		
		var This = this;
		
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
	
	},
	
	drag : function(){
		var This = this;
		var btn = true;
		var nowLeft =0;
		var atIndex =0;
		var startTime = 0;
		var endTime =0;
		if(this.settings.drag){
			
			$('.tab_title li').on('mousedown',function(e){
				var _this = this;
				startTime = new Date().getTime();
				if(btn){
					var cloneLi = $(this).clone();
					var pos_l = $(_this).position().left;
					$(cloneLi).attr('id','clone').css({
						position : 'absolute',
						top : This.settings.tabHeight+10,
						left : pos_l
					}).appendTo($('.tab_title ul'));
					//disX 不能放上边
					var disX = e.pageX - $(cloneLi).offset().left;
				}
				btn = false;
				$(document).on('mousemove',function(e){
					nowLeft = e.pageX - disX - $('#'+This.settings.id).offset().left;
					atIndex = 0;
					$(cloneLi).css({
						left : nowLeft,
						top : 0,
						cursor: 'e-resize',
						zIndex : 5,
						opacity: 0.8
					});
					
					atIndex = Math.round(nowLeft/This.settings.tabWidth);
					if(atIndex<0){
						atIndex = 0;
					}else if(atIndex>This.settings.count-1){
						atIndex = This.settings.count-1;
					}
				})
				$(document).on('mouseup',function(){
					$(cloneLi).remove();
					$(document).off();
					endTime = new Date().getTime();
					if(endTime - startTime >400){
						var _index = $(_this).index();
						if(atIndex < _index){
							$(_this).insertBefore($('.tab_title li').eq(atIndex));
							$('.tab_box').eq(_index).insertBefore($('.tab_box').eq(atIndex));
							
						}else{
							$(_this).insertAfter($('.tab_title li').eq(atIndex));
							$('.tab_box').eq(_index).insertAfter($('.tab_box').eq(atIndex))
						}
						$('.tab_title li').removeClass('active');
						$('.tab_box').removeClass('active');
						$('.tab_title li').eq(atIndex).addClass('active');
						$('.tab_box').eq(atIndex).addClass('active');
						This.iNow = atIndex;
					}
					btn = true
				})
				
				return false;
			})
		}
		
	}
	
}


















