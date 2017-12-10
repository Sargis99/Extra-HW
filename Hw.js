const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const backImage = new Image();
backImage.src= "http://www.yim778.com/data/out/79/904644.jpg";

const player1nkar = new Image();
player1nkar.src = "https://images.vexels.com/media/users/3/141148/isolated/preview/716b4a53cd25869a4473d1df9257330d-santa-claus-cartoon-7-by-vexels.png";

const player2nkar = new Image();
player2nkar.src = "https://images.vexels.com/media/users/3/141148/isolated/preview/716b4a53cd25869a4473d1df9257330d-santa-claus-cartoon-7-by-vexels.png"; 

const ballImage = new Image();
ballImage.src = "http://weclipart.com/gimg/4B69D77980E5B22F/christmas-presents-clip-art-happy-holidays-830x889.png"
const RectsIntersection = function(rect1X, rect1Y, rect1W, rect1H, rect2X, rect2Y, rect2W, rect2H) {
    return rect1X < rect2X + rect2W && rect1X + rect1W > rect2X && rect1Y < rect2Y + rect2H && rect1H + rect1Y > rect2Y;
  };
  const rand = function(num) {
    return Math.floor(Math.random() * num);
  }; 
const cordinates =	{
			x: 600,
			y: 350,
			width: 30,
			height:	30,
			xDelta: 5,
			yDelta: 5,
			color: "red"
		};
  
const player1 = {
  		x: 50,
  		y:10,
  		width:100,
  		height:150,
  		score: 0
  };
const player2 = {
  	x: 1050,
  	y: 10,
  	width:100,
  	height:150,
  	score: 0
  };
const draw = function(){  
context.clearRect(0,0,canvas.width,canvas.height);
		  context.drawImage(backImage, 0, 0, canvas.width, canvas.height);
		  context.fillStyle = cordinates.color;
		context.drawImage(ballImage,cordinates.x,cordinates.y, cordinates.width,cordinates.height);
		context.drawImage(player1nkar,player1.x,player1.y,player1.width,player1.height);
		context.drawImage(player2nkar,player2.x,player2.y,player2.width,player2.height);
		context.font = "40px Arial";
    	context.fillText(player1.score, 300,50);
    	 context.fillText(player2.score, 900,50);
  };
 const img=["http://images.clipartpanda.com/gift-clipart-bTyMAyXTL.png","http://www.covenanthousebc.org/wp-content/uploads/2014/12/christmas_present_2[1].png","http://images.clipartpanda.com/gift-clipart-Christmas-Gift-Clip-Art-Templates-Geographics-2.png","http://res.freestockphotos.biz/pictures/7/7065-illustration-of-a-blue-wrapped-present-pv.png","https://cdn.pixabay.com/photo/2014/04/03/10/22/gift-box-310224_960_720.png","http://weclipart.com/gimg/DAF632B843A2215B/xmas-present.gif","http://www.iconarchive.com/download/i60915/himacchi/sweetbox/gift.ico"]
  
  const updateData = function(){
		  if(cordinates.x >= canvas.width-cordinates.width){
			cordinates.x=player2.x-cordinates.width;
			cordinates.y=player2.y;
			player1.score+=1;
			ballImage.src=img[rand(6)];
			cordinates.xDelta = -cordinates.xDelta;
			if(player1.score===10){ 
				alert("Player1 win !!!!");
				player2.score=0;
				player1.score=0;
			}
		}else if(cordinates.x<=0){
			cordinates.x=player1.x+player1.width;
			cordinates.y=player1.y;
			player2.score+=1;
			ballImage.src=img[rand(6)];
			if(player2.score===10){ 
				alert("Player2 win !!!!");
				player2.score=0;
				player1.score=0;
			}
			cordinates.xDelta = -cordinates.xDelta;
		}
		if(cordinates.y >= canvas.height-cordinates.height){
			cordinates.yDelta = -cordinates.yDelta;
		}else if(cordinates.y<=0){
			cordinates.yDelta = -cordinates.yDelta;
		}
		cordinates.x =	 cordinates.x + cordinates.xDelta;
		cordinates.y = cordinates.y + cordinates.yDelta;

    if(RectsIntersection(player1.x,player1.y,player1.width,player1.height,cordinates.x,cordinates.y,cordinates.width,cordinates.height)){
        cordinates.xDelta = - cordinates.xDelta;
      }else if(RectsIntersection(player2.x,player2.y,player2.width,player2.height,cordinates.x,cordinates.y,cordinates.width,cordinates.height)){
        cordinates.xDelta = - cordinates.xDelta;
      } 
		
  };
  

const loop = function(){
    
    draw();
    updateData();
    window.requestAnimationFrame(loop);
  };
  
  loop();
  const upKey = 38;
  const downKey = 40;
  const w = 87;
  const s = 83;
   document.addEventListener('keydown', function(event) {
    event.preventDefault();
  
    if(event.keyCode === upKey) {
      if(player1.y>= 0 && player1.y<= canvas.height-player1.height) {
        player1.y= player1.y - 15;
      }		
      else if(player1.y<3){player1.y=3;}
    }
    else if(event.keyCode === downKey){
      if(player1.y>= 0 && player1.y<= canvas.height-player1.height) {
        player1.y= player1.y +  15;      }
      else if(player1.y>=canvas.height-player1.height){player1.y=canvas.height-player1.height;}
    }
  }, false);

     document.addEventListener('keydown', function(event) {
   if(event.keyCode === w){
   	if(player2.y>= 0 ) {
        player2.y= player2.y - 15;
      	}
      	else if(player2.y<3){player2.y=3;}
      }	
   else if(event.keyCode === s){
      if(player2.y>= 0 && player2.y<= canvas.height-player2.height) {
        player2.y= player2.y +  15;      }
    }
   
  }, false);