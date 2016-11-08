
var canvasArray = ["Canvas1", "Canvas2", "Canvas3", "Canvas4", "Canvas5", "Canvas6", "Canvas7", "Canvas8", "Canvas9"];
var totalNumber = canvasArray.length;
var playerWin = false;
var computerWin = false;
var isTie = false;
var keepGoing = true;
var level;

var winArray = [
	["Canvas1","Canvas2","Canvas3"],
	["Canvas4","Canvas5","Canvas6"],
	["Canvas7","Canvas8","Canvas9"],
	["Canvas1","Canvas4","Canvas7"],
	["Canvas2","Canvas5","Canvas8"],
	["Canvas3","Canvas6","Canvas9"],
	["Canvas1","Canvas5","Canvas9"],
	["Canvas3","Canvas5","Canvas7"]
]

var winAlertArray = [
	["Canvas1","Canvas2"],
	["Canvas2","Canvas3"],
	["Canvas4","Canvas5"],
	["Canvas5","Canvas6"],
	["Canvas7","Canvas8"],
	["Canvas8","Canvas9"],
	["Canvas1","Canvas4"],
	["Canvas4","Canvas7"],
	["Canvas2","Canvas5"],
	["Canvas5","Canvas8"],
	["Canvas3","Canvas6"],
	["Canvas6","Canvas9"],
	["Canvas1","Canvas5"],
	["Canvas5","Canvas9"],
	["Canvas1","Canvas3"],
	["Canvas4","Canvas6"],
	["Canvas7","Canvas9"],
	["Canvas1","Canvas7"],
	["Canvas2","Canvas8"],
	["Canvas3","Canvas9"],
	["Canvas1","Canvas9"],
	["Canvas3","Canvas7"],
	["Canvas3","Canvas5"],
	["Canvas5","Canvas7"],

]

$('#easyLevel').on('click',function(e){
	level = "easy";
	$(this).siblings().removeClass("chosenLevel");
	$(this).addClass("chosenLevel");
})
$('#mediumLevel').on('click',function(e){
	level = "medium";
	$(this).siblings().removeClass("chosenLevel");
	$(this).addClass("chosenLevel");
})
$('#hardLevel').on('click',function(e){
	level = "hard";
	$(this).siblings().removeClass("chosenLevel");
	$(this).addClass("chosenLevel");
})

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
					keepGoing = false;
				}

				if($(object0ID).hasClass("computer") && $(object1ID).hasClass("computer") && $(object2ID).hasClass("computer") ){
					computerWin = true;
					keepGoing = false;
				}
			}else{
				if($(object0ID).hasClass("player") && $(object1ID).hasClass("player") && $(object2ID).hasClass("player") ){
					playerWin = true;
					keepGoing = false;
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
	target.addClass("chosen");
	target.addClass("player");
	totalNumber --;
	
	checkWinning();

}

function drawCircleEasy(target){
	var ctx = target[0].getContext("2d");
		if(ctx){
			ctx.beginPath();
			ctx.arc(75,75,70,0,2*Math.PI);
			ctx.strokeStyle = "#F9CE00";
			ctx.lineWidth = 5;
			ctx.stroke();
			ctx.closePath();
		}
		target.addClass("chosen");
		target.addClass("computer");
		
		totalNumber --;

		checkWinning();
}

function getRandom(latestArray){
	var number = Math.floor((Math.random() * latestArray.length));
	return number;
}

$("#Canvas1,#Canvas2,#Canvas3,#Canvas4,#Canvas5,#Canvas6,#Canvas7,#Canvas8,#Canvas9").on('click',function(e){
	if($(this).hasClass("chosen")){
		console.log("Taken");	
	}else{
		drawCross($(this));
		console.log(keepGoing);
		canvasArray.splice( canvasArray.indexOf($(this)[0]['id']) , 1);
		var newSplice = canvasArray[getRandom(canvasArray)];
		var newID = "#" + newSplice;
		if(keepGoing == true){
			if(totalNumber > 0){
			drawCircleEasy($(newID));
			canvasArray.splice( canvasArray.indexOf(newSplice) ,1);
			}
		}
	}
})
