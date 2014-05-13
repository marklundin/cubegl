$(document).ready(function() {

	//	Do we have WebGL?
	var hasWebGL = ( function () { try { var canvas = document.createElement( 'canvas' ); return !! window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ); } catch( e ) { return false; } } )();
	
	var container = document.querySelector( '#container' ),
		cube 	  = new ERNO.Cube({ 
		hideInvisibleFaces:false, 
		renderer: hasWebGL ? ERNO.renderers.WebGL : ERNO.renderers.CSS3D
	}),
		motion = deviceMotion( cube, container );
	

	cube.camera.position.z += 200;
	container.appendChild( cube.domElement );


	$( '.menu-link' ).bigSlide({ menuWidth: '25em' });
	$('.menu-link').click(function(){
		
		motion.paused = !motion.paused;
		cube.mouseControlsEnabled = !cube.mouseControlsEnabled;
		cube.keyboardControlsEnabled = !cube.keyboardControlsEnabled;

		$( '#container' ).toggleClass( 'blur' );

	});

	// INTRO ANIMATION

	cube.cubelets.forEach(function( cubelet, i ){

		cubelet.position;
		var tween = new TWEEN.Tween( cubelet.position )
			.delay( i * 100 )
			.easing( TWEEN.Easing.Quadratic.InOut  )
			.to( { x:cubelet.position.x, y:cubelet.position.y, z:cubelet.position.z }, 300 )


		cubelet.position.set( 0, -100, -1000 );
		tween.start();

	})

	var tween = new TWEEN.Tween( cube.rotation )
		.to( cube.rotation )
		.start()

	cube.rotation.set( -Math.PI * 0.5, Math.PI, 0 );
	


	window.cube = cube;

});