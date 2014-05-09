<!DOCTYPE html>
<html>
<head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        // <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

       
        <link rel="stylesheet" href="style.css">
        <link href='http://fonts.googleapis.com/css?family=Amatic+SC|Advent+Pro:400,200' rel='stylesheet' type='text/css'>

     
    </head>
    <body>
     


    <audio autoplay src="nera_web_1.m4a"></audio>
 

 

    
     <div class="textItem">
     <p id="text1" >my brother died in the beginning of the war, did you know that ? he was on the front lines. </p>
     <p id="text2">my village-donestk in the ukraine was captured and my home was turned into a gestapo police station.</p>
     <p id="text3"> my parents are still alive, i think. i havent heard from them in a while. </p>
     </div>
</body>

<script>
    document.addEventListener("DOMContentLoaded", function () {

	var pop=Popcorn("#audio");

		pop.play();

		// // change this to the map url
		// window.open('http://localhost:8000/', '_self');




	pop.cue(2, function(){
		$('#text1').fadeIn(5000);
		
	});

	pop.cue(11, function(){
		$('#text2').fadeIn(5000);
	});
	
	pop.cue(17, function(){
		$('#text3').fadeIn(5000);
	});

	// pop.cue(26, function(){
	// 	$('#video').fadeOut(2000);
	// });
	

});
</script>

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
     
       <script src="http://popcornjs.org/code/dist/popcorn-complete.min.js"></script> 
        <script src="main.js"></script>

    
    
</html>
