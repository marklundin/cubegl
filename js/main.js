$(document).ready(function() {

	//	Do we have WebGL?
	var hasWebGL = ( function () { try { var canvas = document.createElement( 'canvas' ); return !! window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ); } catch( e ) { return false; } } )() !== null;
	

	$('.hasWebGL').attr( 'gl', hasWebGL );


	var container = document.querySelector( '#container' ),
		cube 	  = new ERNO.Cube({ 
		hideInvisibleFaces:false, 
		mouseControlsEnabled: false,
		keyboardControlsEnabled: false,
		renderer: hasWebGL ? ERNO.renderers.WebGL : ERNO.renderers.CSS3D
	});
		motion = deviceMotion( cube, container );
		motion.paused = true;
	

	cube.camera.position.z += 200;
	container.appendChild( cube.domElement );


	$( '.menu-link' ).bigSlide({ menuWidth: '35em' });
	$( '.close' ).bigSlide({ menuWidth: '35em' });
	$('.menu-link').click(function(){
		
		cube.paused = !cube.paused;
		motion.paused = !motion.paused;
		cube.mouseControlsEnabled = !cube.mouseControlsEnabled;
		cube.keyboardControlsEnabled = !cube.keyboardControlsEnabled;

		$( '#container' ).toggleClass( 'blur' );

	});

	// INTRO ANIMATION

	var initialDelay = 100;

	cube.cubelets.forEach(function( cubelet, i ){

		var delay;
		if( cubelet.type === 'core'   ) delay = Math.random() * 100;
		if( cubelet.type === 'center' ) delay = 200 + Math.random() * ( 400 - 200  );
		if( cubelet.type === 'edge'   ) delay = 400 + Math.random() * ( 800 - 400  );
		if( cubelet.type === 'corner' ) delay = 800 + Math.random() * ( 1000 - 800 );

		
		var tween = new TWEEN.Tween( cubelet.position )
			.delay( delay + initialDelay )
			.easing( TWEEN.Easing.Quartic.InOut  )
			.to( { x:cubelet.position.x, y:cubelet.position.y, z:cubelet.position.z }, 2800 )
			.onComplete( function(){
				cubelet.isTweening = false;
			}.bind( cubelet ))

		cubelet.isTweening = true;

		var distance = 1000;
		cubelet.position.set(

			cubelet.addressX * distance,
			cubelet.addressY * distance,
			cubelet.addressZ * distance
		);
		tween.start( cube.time );

	})

	var tweenRotation = new TWEEN.Tween( cube.rotation )
		.to( { x: cube.rotation.x, y: cube.rotation.y, z: cube.rotation.z }, 3000 )
		.easing( TWEEN.Easing.Quartic.InOut )
		.delay( initialDelay )
		.onComplete( function(){
			cube.mouseControlsEnabled = true;
			cube.keyboardControlsEnabled = true;
			motion.paused = false;
			cube.shuffle();
		})
		


	cube.position.y = -2000;
	var tweenPosition = new TWEEN.Tween( cube.position )
		.to( { y: 0 }, 2000 )
		.delay( initialDelay )
		.easing( TWEEN.Easing.Quartic.InOut )
		
		

	cube.rotation.set( 
		180 * Math.PI / 180,
		180 * Math.PI / 180,
		 20 * Math.PI / 180 
	);

	tweenPosition.start( cube.time );
	tweenRotation.start( cube.time );
	


	window.cube = cube;

});