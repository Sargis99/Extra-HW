const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

   const backImage = new Image();
  backImage.src= "dasht.png";

  const RectsIntersection = function(rect1X, rect1Y, rect1W, rect1H, rect2X, rect2Y, rect2W, rect2H) {
    return rect1X < rect2X + rect2W && rect1X + rect1W > rect2X && rect1Y < rect2Y + rect2H && rect1H + rect1Y > rect2Y;
  };
  
const rand = function(num) {
	return Math.floor(Math.random() * num) + 1;
};
  const createPoint = function(num, canvasWidth, canvasHeight){
	  const a = [];
	  const r = function(n){
		if(n<=0){
			return "";
		}  
		const b = 5;
		a.push({
			x: rand(canvasWidth - 60),
			y: rand(canvasHeight - 60),
			width: 30,
			height:	30,
			xDelta: b,
			yDelta: b,
			color: "white"
		})
		r(n-1);
	  }
	  r(num);
	  return a;
  };
  const point = createPoint(1, canvas.width,canvas.height);
  const hero = {
  		x: 50,
  		y:10,
  		width:26,
  		height:70,
  		score: 0
  };
  const hero2 = {
  	x: 1150,
  	y: 10,
  	width:26,
  	height:70,
  	score: 0
  };
  const draw = function(){  
context.clearRect(0,0,canvas.width,canvas.height);
	  const drawEvery = function(arr,i){
		  if(i === arr.length){
			  return "";
		  }
		  context.drawImage(backImage, 0, 0, canvas.width, canvas.height);
		  context.fillStyle = arr[i].color;
		context.fillRect(arr[i].x,arr[i].y, arr[i].width,arr[i].height);
		context.fillRect(hero.x,hero.y,hero.width,hero.height);
		context.fillRect(hero2.x,hero2.y,hero2.width,hero2.height);
		context.font = "40px Arial";
    	context.fillText(Math.floor(hero.score), 300,50);
    	 context.fillText(Math.floor(hero2.score), 900,50);
		  drawEvery(arr,i+1);
	  };
	  drawEvery(point,0);
  };
 
  
  const updateData = function(){
	  const forevery = function(arr, i){
		  if(i === arr.length){
			  return "";
		  }
		  if(arr[i].x >= canvas.width-arr[i].width){
			arr[i].x=hero2.x-arr[i].width;
			arr[i].y=hero2.y;
			hero.score+=1;
			arr[i].xDelta = -arr[i].xDelta;
		}else if(arr[i].x<=0){
			arr[i].x=hero.x+hero.width;
			arr[i].y=hero.y;
			hero2.score+=1;
			arr[i].xDelta = -arr[i].xDelta;
		}
		if(arr[i].y >= canvas.height-arr[i].height){
			arr[i].yDelta = -arr[i].yDelta;
		}else if(arr[i].y<=0){
			arr[i].yDelta = -arr[i].yDelta;
		}
		arr[i].x =	 arr[i].x + arr[i].xDelta;
		arr[i].y = arr[i].y + arr[i].yDelta;
		
		forevery(arr,i+1);
	  };
	  forevery(point,0);
  };
  const updateData1 = function(){
  		if(RectsIntersection(hero.x,hero.y,hero.width,hero.height,point[0].x,point[0].y,point[0].width,point[0].height)){
  			point[0].xDelta = - point[0].xDelta;
  		}else if(RectsIntersection(hero2.x,hero2.y,hero2.width,hero2.height,point[0].x,point[0].y,point[0].width,point[0].height)){
  			point[0].xDelta = - point[0].xDelta;
  		}	
  }

const loop = function(){
    
    draw();
    updateData();
    updateData1();
    window.requestAnimationFrame(loop);
  };
  
  loop();
  const upKey = 38;
  const downKey = 40;
  const w = 87;
  const s = 83;
   document.addEventListener('keydown', function(event) {
  
    if(event.keyCode === upKey) {
      if(hero.y>= 0 && hero.y<= canvas.height-hero.height) {
        hero.y= hero.y - 15;
      }		
      else if(hero.y<3){hero.y=3;}
    }
    else if(event.keyCode === downKey){
      if(hero.y>= 0 && hero.y<= canvas.height-hero.height) {
        hero.y= hero.y +  15;      }
      else if(hero.y>=canvas.height-hero.height){hero.y=canvas.height-hero.height;}
    }
  }, false);

     document.addEventListener('keydown', function(event) {
   if(event.keyCode === w){
   	if(hero2.y>= 0 ) {
        hero2.y= hero2.y - 15;
      	}
      	else if(hero2.y<3){hero2.y=3;}
      }	
   else if(event.keyCode === s){
      if(hero2.y>= 0 && hero2.y<= canvas.height-hero2.height) {
        hero2.y= hero2.y +  15;      }
    }
   
  }, false);