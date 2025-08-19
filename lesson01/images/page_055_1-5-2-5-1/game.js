/**================================
 * @date: 2023-11-13
 * @description: 객체 함수 정의
 * @copyright: 김동근
 * @version:1.0
 =================================**/

$CONTENT=(function(){
	/*카드 위치*/
	var path='images/page_055_1-5-2-5-1/cards/';
	/*카드 리스트*/
	var list=[
		{title:'안정성', note:'내가 하고 싶은 일을 계속해서 안정적으로 하는 것을 중요하게 여긴다.'},
		{title:'도전성', note:'실패를 두려워하지 않고 새로운 일에 도전하는 것을 중요하게 여긴다.'},
		{title:'일과 삶의 균형', note:'일과 개인 생활의 균형을 이루는 것을 중요하게 여긴다.'},
		{title:'즐거움', note:'흥미와 보람을 느끼고 즐거움을 얻는 것을 중요하게 여긴다.'},
		{title:'성취', note:'자신의 능력을 발휘하여 목표한 바를 달성하는 것을 중요하게 여긴다.'},
		{title:'자기 계발', note:'일을 통해서 능력을 개발하고 성장해 나가는것을 중요하게 여긴다.'},
		{title:'보수', note:'일을 통해 경제적 보상을 얻는 것을 중요하게 여긴다.'},
		{title:'영향력', note:'다른 사람에게 영향을 미치고 사람들을 이끄는 것을 중요하게 여긴다.'},
		{title:'사회적 기여', note:'다른 사람들의 행복과 복지에 기여하는 것을 중요하게 여긴다.'},
		{title:'소속감', note:'다른 사람들과 함께 일하면서 구성원이 되는 것을 중요하게 여긴다.'},
		{title:'사회적 인정', note:'다른 사람들에게 인정과 존경을 받는 것을 중요하게 여긴다.'},
		{title:'자율성', note:'일의 내용과 환경을 스스로 결정하고 선택하는 것을 중요하게 여긴다.'}
	];
	
	/*게임 엘리먼트*/
	var _game;
	/*미디어 객체*/
	var $m;

	return{
		ready:function(){
			
			_game=$U.query('#game-1');
			
			$m=$U.media.make(_game.query('.game-bg>video'),{
				muted:false,
				callback:function(b1){
					switch(b1.type){
						case 'ended':
							gameResult();
						break;
					};
				}/*end*/
			});
		},
		load:function(){
			gameStart();
		},
		unload:function(){
			if(_game){
				_game.query('[data-type="pick"]').off();
			};
			if($m) $m.destroy();
			
			$U.remove.array(list);
			
			_game=path=$m=list=null;
		}/*end*/
	};
	
	/**
	 * 믹스하기 
	 */
	function gamePrepare(){
		_game.query('.game-result').hide();
		_game.removeClass('result');
		
		_game.addClass('start');
		_game.query('.game-start').hide();
		_game.query('.game-start .balloon').innerHTML='<p>버튼을 눌러<br/>카드를 뽑아 활동에<br/>활용해 봐요!</p>';
		
		if($m) $m.play();
	};
	
	/**
	 * 게임 시작하기 
	 */
	function gameStart(){
		
		_game.query('.game-start').show();
		_game.query('[data-type="pick"]').off().on('click',function(){
			
			$U.media.effect.play('click');
			
			if(!_game.hasClass('result')){
				gamePrepare();
			}else{
				gamePrepare();
			};
		});
	};
	
	/**
	 * 게임 결과 받기 
	 */
	function gameResult(){
		_game.addClass('result');
		
		$U.media.effect.play('open');
		
		_game.query('.game-start .balloon').innerHTML='<p>다시 하기<br/> 버튼을 눌러 다른 <br/>카드를 뽑을 수 <br/>있어요.</p>';
		
		var _cd=_game.query('.game-card');
		
		var _title=_cd.query('.title');
		var _img=_cd.query('.img');
		var _note=_cd.query('.note');
		
		var idx=Math.floor(Math.random()*list.length);
		
		var obj=list[idx];
		
		_title.text(obj.title);
		_img.attr('src',path+obj.title+'.png');
		_note.text(obj.note);
		
		_game.query('.game-result').show();
		_game.query('.game-start').show();
	};
	
}());
