var board = new Array();
var score = 0;
var flag = true;
var hasConflicted = new Array();

var startX =0;
var startY =0;
var endX =0;
var endY =0;
$(document).ready(function(){
	prepareForMobile();
	newgame();
});
function newgame(){
	//初始化棋盘
	init();
	//在随机两个格子生成数字
	generateOneNumber();
	generateOneNumber();
}
function prepareForMobile(){
	if(documentWidth>500){
		gridContainerWidth = 500;
		cellSpace =20;
		cellSideLength =100;
	}
 $('#grid-container').css('width',gridContainerWidth - 2*cellSpace);
 $('#grid-container').css('height',gridContainerWidth - 2*cellSpace);
 $('#grid-container').css('padding',cellSpace);
 $('#grid-container').css('border-radius',gridContainerWidth*0.02);

 $('.grid-cell').css('width',cellSideLength);
 $('.grid-cell').css('height',cellSideLength);
 $('.grid-cell').css('border-radius',0.02*cellSideLength);
}
function init(){
	for(var i=0;i<4;i++)
		for(var j=0;j<4;j++){
			var gridCell=$('#grid-cell-'+i+'-'+j);
			gridCell.css('top',getPosTop(i,j));
			gridCell.css('left',getPosLeft(i,j));
		}

	for(var i=0;i<4;i++){
		board[i]= new Array();
		hasConflicted[i]= new Array();
		for(var j=0;j<4;j++){
			board[i][j] = 0;
			hasConflicted[i][j]=false;
		}
	}
	score = 0;
	updateScore(score)
	updateBoardView();
}

function updateBoardView(){
	$(".number-cell").remove();
	for(var i=0;i<4;i++)
		for(var j=0;j<4;j++){
			$("#grid-container").append('<div class = "number-cell" id="number-cell-'+i+'-'+j+'"> </div>');
			var theNumberCell = $('#number-cell-'+i+'-'+j);

			if(board[i][j] ==0){
				theNumberCell.css('width','0px');
				theNumberCell.css('height','0px');
				theNumberCell.css('top',getPosTop(i,j)+cellSideLength/2);
				theNumberCell.css('left',getPosLeft(i,j)+cellSideLength/2);
			}else{
				theNumberCell.css('width',cellSideLength);
				theNumberCell.css('height',cellSideLength);
				theNumberCell.css('top',getPosTop(i,j));
				theNumberCell.css('left',getPosLeft(i,j));
				theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
				theNumberCell.css('color',getNumberColor(board[i][j]));
				theNumberCell.text(board[i][j]);
			}
			hasConflicted[i][j] = false;
		}
		$('.number-cell').css('line-height',cellSideLength+'px');
		$('.number-cell').css('font-size',cellSideLength*0.6+'px');

}
function generateOneNumber(){
	if(nospace(board))
		return false;
	//随机一个位置
	var randx = parseInt(Math.floor(Math.random()*4));
	var randy = parseInt(Math.floor(Math.random()*4));

	var timers= 0;
	while(timers <50){
		if(board[randx][randy]==0)
			break;
		randx = parseInt(Math.floor(Math.random()*4));
		randy = parseInt(Math.floor(Math.random()*4));
		timers ++;
	}
	if(timers ==50){
		for(var i=0;i<4;i++)
			for(var j=0;j<4;j++){
				if(board[i][j]==0)
					randx = i;
					randy =j;
			}
	}
	//随机一个数字
	var randNumber = Math.random()<0.5?2:4;
	//在随机位置显示随机数字
	board[randx][randy] = randNumber;
	showNumberWithAnimation(randx,randy,randNumber);
	return true;
}
$(document).keydown(function(event){
	event = event||window.event;
	if(event.preventDefault){
		event.preventDefault();
	}else{
		event.returnValue = false;
	}
	// switch(event.keyCode){
	// 	case 37://left
	// 		if(moveLeft()){
	// 			setTimeout("generateOneNumber()",210);
	// 			setTimeout("isgameover()",300);
	// 		}
	// 		break;
	// 	case 38://up
	// 		if(moveUp()){
	// 			setTimeout("generateOneNumber()",210);
	// 			setTimeout("isgameover()",300);
	// 		}
	// 		break;
	// 	case 39: //right
	// 		if(moveRight()){
	// 			setTimeout("generateOneNumber()",210);
	// 			setTimeout("isgameover()",300);
	// 		}
	// 		break;
	// 	case 40://down
	// 		if(moveDown()){
	// 			setTimeout("generateOneNumber()",210);
	// 			setTimeout("isgameover()",300);
	// 		}
	// 		break;
	// 	default://default
	// 		break;
	// }
 	var actions ={
 		'37':function(){
 			if(moveLeft()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
	 		}
 		},
 		'38':function(){
 			if(moveUp()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
	 		}
 		},
 		'39':function(){
 			if(moveRight()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
	 		}
 		},
 		'40':function(){
 			if(moveDown()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
	 		}
 		}
 	};
 	if(typeof actions[event.keyCode]!=='function'){
 		return;
 	}
 	return actions[event.keyCode]();
});

document.addEventListener('touchstart',function(event){
	startX = event.touches[0].pageX;
	startY = event.touches[0].pageY;
})
document.addEventListener('touchmove',function(event){
	event = event||window.event;
	if(event.stopPropagation){
		event.stopPropagation();
	}else{
		event.returnValue = false;
	}
})
document.addEventListener('touchend',function(event){
	endX = event.changedTouches[0].pageX;
	endY = event.changedTouches[0].pageY;

	var deltaX = endX - startX;
	var deltaY = endY - startY;

	if(Math.abs(deltaX)<0.2*documentWidth&&Math.abs(deltaY)<0.2*documentWidth)
		return;

	if(Math.abs(deltaX)>= Math.abs(deltaY)){
		if(deltaX >0){
			if(moveRight()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
			}
		}else{
			if(moveLeft()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
			}
		}
	}else{
		if(deltaY>0){
			if(moveDown()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
			}
		}else{
			if(moveUp()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
			}
		}
	}
})


function isgameover(){
	if(nospace(board) && nomove(board)){
		gameover();
	}
}
function gameover(){
	alert('gameover!');
}
function moveLeft(){
	if(!canMoveLeft(board))
		return false;
	//moveLeft
	for(var i =0;i<4;i++)
		for(var j=1;j<4;j++){
			if(board[i][j]!=0){

				for(var k=0;k<j;k++){
					if(board[i][k] ==0&&noBlockHorizontal(i,k,j,board)){
						flag = true;
						//move
						showMoveAnimation(i,j,i,k,flag);
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[i][j]==board[i][k] &&noBlockHorizontal(i,k,j,board) && !hasConflicted[i][k]){
						flag = false;
						//move
						showMoveAnimation(i,j,i,k,flag);
						//add
						board[i][k] += board[i][j];
						board[i][j] = 0;
						score += board[i][k];
						updateScore(score);
						hasConflicted[i][k] = true;
						continue;
					}
				}
			}
		}
	setTimeout("updateBoardView()",200);
	return true;
}
function moveRight(){
	if(!canMoveRight(board))
		return false;
	//moveLeft
	for(var i =0;i<4;i++)
		for(var j=2;j>-1;j--){
			if(board[i][j]!=0){

				for(var k=3;k>j;k--){
					if(board[i][k] ==0&&noBlockHorizontal(i,j,k,board)){
						//move
						flag = true;
						showMoveAnimation(i,j,i,k,flag);
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[i][j]==board[i][k] &&noBlockHorizontal(i,j,k,board)&& !hasConflicted[i][k]){
						//move
						flag = false;
						showMoveAnimation(i,j,i,k,flag);
						//add
						board[i][k] += board[i][j];
						board[i][j] = 0;
						score += board[i][k];
						updateScore(score);
						hasConflicted[i][k]=true;
						continue;
					}
				}
			}
		}
	setTimeout("updateBoardView()",200);
	return true;
}
function moveUp(){
	if(!canMoveUp(board))
		return false;
	//moveLeft
	for(var i =1;i<4;i++)
		for(var j=0;j<4;j++){
			if(board[i][j]!=0){

				for(var k=0;k<i;k++){
					if(board[k][j] ==0&&noBlockHorizontal2(j,k,i,board)){
						//move
						flag= true;
						showMoveAnimation(i,j,k,j,flag);
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[i][j]==board[k][j] &&noBlockHorizontal(j,k,i,board)&& !hasConflicted[k][j]){
						//move
						flag = false;
						showMoveAnimation(i,j,k,j,flag);
						//add
						board[k][j] += board[i][j];
						board[i][j] = 0;
						score += board[k][j];
						updateScore(score);
						hasConflicted[k][j] = true;
						continue;
					}
				}
			}
		}
	setTimeout("updateBoardView()",200);
	return true;
}
function moveDown(){
	if(!canMoveDown(board))
		return false;
	//moveLeft
	for(var j=0;j<4;j++)
		for(var i =2;i>-1;i--){
			if(board[i][j]!=0){

				for(var k=3;k>i;k--){
					if(board[k][j] ==0&&noBlockHorizontal2(j,i,k,board)){
						flag =true;
						//move
						showMoveAnimation(i,j,k,j,flag);
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[i][j]==board[k][j] &&noBlockHorizontal2(j,i,k,board) && !hasConflicted[k][j]){
						flag = false;
						//move
						showMoveAnimation(i,j,k,j,flag);
						//add
						board[k][j] += board[i][j];
						board[i][j] = 0;
						score += board[k][j];
						updateScore(score);
						hasConflicted[k][j] = true;
						continue;
					}
				}
			}
		}
	setTimeout("updateBoardView()",200);
	return true;
}
