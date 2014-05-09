$(document).ready(function() {


	var hasWebGL = ( function () { try { var canvas = document.createElement( 'canvas' ); return !! window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ); } catch( e ) { return false; } } )();
	
	var cube 	  = new ERNO.Cube({ 
			hideInvisibleFaces:false, 
			renderer: hasWebGL ? ERNO.renderers.WebGL : ERNO.renderers.CSS3D
		}),
		container = document.querySelector( '#container' );

	cube.camera.position.z += 200;

	container.appendChild( cube.domElement );
	var dm = deviceMotion( cube, container );


	$( '.menu-link' ).bigSlide({ menuWidth: '25em' });


	$('.menu-link').click(function(){
		
		dm.paused = !dm.paused;
		cube.mouseControlsEnabled = !cube.mouseControlsEnabled;
		cube.keyboardControlsEnabled = !cube.keyboardControlsEnabled;

		$( '#container' ).toggleClass( 'blur' );

	})



	window.cube = cube;

	// deviceMotion( cube, document );

	function update(){

		requestAnimationFrame( update );
		cube.autoRotateObj3D.rotation.y += 0.05;

	}

	update();
	

});