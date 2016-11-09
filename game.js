
var canvasArray = ["Canvas1", "Canvas2", "Canvas3", "Canvas4", "Canvas5", "Canvas6", "Canvas7", "Canvas8", "Canvas9"];
var takenArray = [];
var totalNumber = canvasArray.length;
var playerWin = false;
var computerWin = false;
var isTie = false;
var keepGoing = true;
var computerGoForWin = false;
var computerGoForWinTargetID;
var computerHasToStopPlayer = false;
var computerStoppingPlayerTargetID;
var level = "";

var winArray = [
	["Canvas1","Canvas2","Canvas3"],
	["Canvas4","Canvas5","Canvas6"],
	["Canvas7","Canvas8","Canvas9"],
	["Canvas1","Canvas4","Canvas7"],
	["Canvas2","Canvas5","Canvas8"],
	["Canvas3","Canvas6","Canvas9"],
	["Canvas1","Canvas5","Canvas9"],
	["Canvas3","Canvas5","Canvas7"]
];

$('#easyLevel').on('click',function(e){
	level = "easy";
	$(this).siblings().removeClass("chosenLevel");
	$(this).addClass("chosenLevel");
});

$('#mediumLevel').on('click',function(e){
	level = "medium";
	$(this).siblings().removeClass("chosenLevel");
	$(this).addClass("chosenLevel");
});
$('#hardLevel').on('click',function(e){
	level = "hard";
	$(this).siblings().removeClass("chosenLevel");
	$(this).addClass("chosenLevel");
});

function checkWinning(){

	for(var i =0; i<8; i++){

			var object0 = winArray[i][0];
			var object1 = winArray[i][1];
			var object2 = winArray[i][2];

			var object0ID = "#" + object0; 
			var object1ID = "#" + object1; 
			var object2ID = "#" + object2;

			if(totalNumber > 0){
				if($(object0ID).hasClass("player") && $(object1ID).hasClass("player") && $(object2ID).hasClass("player") ){
					playerWin = true;
				}

				if($(object0ID).hasClass("computer") && $(object1ID).hasClass("computer") && $(object2ID).hasClass("computer") ){
					computerWin = true;
				}
			}else{
				if($(object0ID).hasClass("player") && $(object1ID).hasClass("player") && $(object2ID).hasClass("player") ){
					playerWin = true;
				}else{
					isTie = true;
				}
		}
	}

	if(playerWin){
		$("#Canvas1,#Canvas2,#Canvas3,#Canvas4,#Canvas5,#Canvas6,#Canvas7,#Canvas8,#Canvas9").off('click');
		$("#playerWin").css("display", "block");
		keepGoing = false;
	}else if(computerWin){
		$("#Canvas1,#Canvas2,#Canvas3,#Canvas4,#Canvas5,#Canvas6,#Canvas7,#Canvas8,#Canvas9").off('click');
		$("#computerWin").css("display", "block");
		keepGoing = false;
	}else if(isTie){
		$("#tie").css("display", "block");
	}
}

function computerCheckWinning() {
	for(var i =0; i<8; i++) {
		var object0 = winArray[i][0];
		var object1 = winArray[i][1];
		var object2 = winArray[i][2];

		var object0ID = "#" + object0;
		var object1ID = "#" + object1;
		var object2ID = "#" + object2;

		if($(object0ID).hasClass("computer") && $(object1ID).hasClass("computer") && $(object2ID).hasClass("taken")==false ){
			computerGoForWinTargetID = object2ID;
			computerGoForWin = true;
		}else if ($(object0ID).hasClass("computer") && $(object2ID).hasClass("computer") && $(object1ID).hasClass("taken")==false){
			computerGoForWinTargetID = object1ID;
			computerGoForWin = true;
		}else if($(object1ID).hasClass("computer") && $(object2ID).hasClass("computer") && $(object0ID).hasClass("taken")==false){
			computerGoForWinTargetID = object0ID;
			computerGoForWin = true;
		}
	}
}

function computerStoppingPlayer() {
	for(var i =0; i<8; i++) {
		var object0 = winArray[i][0];
		var object1 = winArray[i][1];
		var object2 = winArray[i][2];

		var object0ID = "#" + object0;
		var object1ID = "#" + object1;
		var object2ID = "#" + object2;

		if($(object0ID).hasClass("player") && $(object1ID).hasClass("player") && $(object2ID).hasClass("taken")==false ){
			computerStoppingPlayerTargetID = object2ID;
			computerHasToStopPlayer = true;
		}else if ($(object0ID).hasClass("player") && $(object2ID).hasClass("player") && $(object1ID).hasClass("taken")==false){
			computerStoppingPlayerTargetID = object1ID;
			computerHasToStopPlayer = true;
		}else if($(object1ID).hasClass("player") && $(object2ID).hasClass("player") && $(object0ID).hasClass("taken")==false){
			computerStoppingPlayerTargetID = object0ID;
			computerHasToStopPlayer = true;
		}

	}
}

function drawCross(target){
	var ctx = target[0].getContext("2d");
	if(ctx){
		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo(150,150);
		ctx.strokeStyle = "#F9CE00";
		ctx.lineWidth = 5;
		ctx.stroke();
		ctx.closePath();

		ctx.beginPath();
		ctx.moveTo(150,0);
		ctx.lineTo(0,150);
		ctx.strokeStyle = "#F9CE00";
		ctx.lineWidth = 5;
		ctx.stroke();
		ctx.closePath();
	}
	target.addClass("taken");
	takenArray.push(target[0]);
	target.addClass("player");
	totalNumber --;
	
	checkWinning();

}

function drawCircle(target){
	var ctx = target[0].getContext("2d");
		if(ctx){
			ctx.beginPath();
			ctx.arc(75,75,70,0,2*Math.PI);
			ctx.strokeStyle = "#F9CE00";
			ctx.lineWidth = 5;
			ctx.stroke();
			ctx.closePath();
		}
		target.addClass("taken");
		takenArray.push(target[0]);
		target.addClass("computer");
		
		totalNumber --;

		checkWinning();
}

function getRandom(latestArray){
	var number = Math.floor((Math.random() * latestArray.length));
	return number;
}

$("#resetButton").on('click', function(){
	location.reload();
});

$("#Canvas1,#Canvas2,#Canvas3,#Canvas4,#Canvas5,#Canvas6,#Canvas7,#Canvas8,#Canvas9").on('click',function(e){
	if( level === "" ){
		alert("Please Choose Level First !!!");
	}else{
		if($(this).hasClass("taken")){
			alert("Already Taken");
		}else{
			drawCross($(this));
			canvasArray.splice( canvasArray.indexOf($(this)[0]['id']) , 1);

			// easy level - all random
			if(level == "easy"){
				if(keepGoing == true){
					if(totalNumber > 0){
						var newCanvas = canvasArray[getRandom(canvasArray)];
						drawCircle($("#" + newCanvas));
						canvasArray.splice( canvasArray.indexOf(newCanvas) ,1);
					}
				}
			}

			// medium level - AI try to win if it can
			// computer check itself, see a win chance, and take it
			if(level == "medium"){
				if(keepGoing == true){
					if(totalNumber > 0){
						computerCheckWinning();
						if(computerGoForWin == true) {
							drawCircle($(computerGoForWinTargetID));
						}else{
							var newCanvas = canvasArray[getRandom(canvasArray)];
							drawCircle($("#" + newCanvas));
							canvasArray.splice( canvasArray.indexOf(newCanvas) ,1);
						}
					}
				}
			}

			// hard level - AI will not lose
			// computer check itself, see a win chance, and take it
			// computer check player's choice and stop player from winning
			if( level == "hard" ){
				if(keepGoing == true){
					if(totalNumber > 0){
						computerCheckWinning();
						if(computerGoForWin == true) {
							drawCircle($(computerGoForWinTargetID));
						}else{
							// check player choice, stop player from winning
							computerStoppingPlayer();
							if(computerHasToStopPlayer){
								if($(computerStoppingPlayerTargetID).hasClass("taken")== false){
									drawCircle($(computerStoppingPlayerTargetID));
								}else{
									var newCanvas = canvasArray[getRandom(canvasArray)];
									drawCircle($("#" + newCanvas));
									canvasArray.splice( canvasArray.indexOf(newCanvas) ,1);
								}
							}else{
								var newCanvas = canvasArray[getRandom(canvasArray)];
								drawCircle($("#" + newCanvas));
								canvasArray.splice( canvasArray.indexOf(newCanvas) ,1);
							}
						}
					}
				}
			}
		}
	}
});
