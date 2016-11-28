function showNumberWithAnimation(i,j,randomNumber){
	var numberCell = $('#number-cell-'+i+'-'+j);

	numberCell.css('background-color',getNumberBackgroundColor(randomNumber));
	numberCell.css('color',getNumberColor(randomNumber));
	numberCell.text(randomNumber);

	numberCell.animate({
		width:cellSideLength,
		height:cellSideLength,
		top:getPosTop(i,j),
		left:getPosLeft(i,j)
	},300)
}
function showMoveAnimation(fromx ,fromy,tox,toy,bool)
{
    var numberCell=$('#number-cell-'+fromx+'-'+fromy);
    // if(bool==true){
		numberCell.animate(
		{
			top:getPosTop(tox,toy),
			left:getPosLeft(tox,toy),
		},200)
}
function updateScore(score){
	$('#score').text(score);
}