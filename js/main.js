window.onload = function(){
	
	
	var cube = new ERNO.Cube({ hideInvisibleFaces:false, renderer: ERNO.renderers.WebGL }),
		container = document.querySelector( '#container' );



	container.appendChild( cube.domElement );


	window.cube = cube;
	

}