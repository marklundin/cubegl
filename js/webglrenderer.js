ERNO.renderers = ERNO.renderers || {};

ERNO.renderers.WebGL = function( cubelets, cube ){


	WAGNER.vertexShadersPath = 'vertex-shaders';
	WAGNER.fragmentShadersPath = 'fragment-shaders';
	WAGNER.assetsPath = 'assets';


	var renderer = new THREE.WebGLRenderer(),
		scene 	 = new THREE.Scene(),
		mesh;


	cube.camera.fov = 25;
	cube.rotation.set( Math.PI * 0.17, Math.PI * 0.25, 0 )
	cube.camera.position.z = 1500;
	scene.add( cube.object3D )
	renderer.setClearColor( 0x222222 )

	var cubeletGeometry = new THREE.BoxGeometry( cube.cubeletSize, cube.cubeletSize, cube.cubeletSize ),
		texture 		= THREE.ImageUtils.loadTexture( 'assets/textures/texture2.png'),
		materialType	= THREE.MeshBasicMaterial;
		faceMaterialsObj= {
			red : 		new materialType({ color: ERNO.RED.hex, 	map: texture }),
			white : 	new materialType({ color: ERNO.WHITE.hex, 	map: texture }),
			green : 	new materialType({ color: ERNO.GREEN.hex, 	map: texture }),
			blue : 		new materialType({ color: ERNO.BLUE.hex, 	map: texture }),
			orange : 	new materialType({ color: ERNO.ORANGE.hex, 	map: texture }),
			yellow : 	new materialType({ color: ERNO.YELLOW.hex, 	map: texture }),
			NA : 		new materialType({ color: 0x000000, 	 	map: texture })
		}
		cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, map: texture });
		wireframe = false,
		blend = THREE.MultiplyBlending;


	cubelets.forEach( function( cubelet ){

		cubelet.add( mesh = new THREE.Mesh( cubeletGeometry, 
			new THREE.MeshFaceMaterial([ 
				faceMaterialsObj[ cubelet.right.color.name ], 
				faceMaterialsObj[ cubelet.left.color.name ], 
				faceMaterialsObj[ cubelet.up.color.name ], 
				faceMaterialsObj[ cubelet.down.color.name ], 
				faceMaterialsObj[ cubelet.front.color.name ], 
				faceMaterialsObj[ cubelet.back.color.name ]
			]) ));

	})



	// POST

	composer 	= new WAGNER.Composer( renderer, { useRGBA: false } );
	bloomPass 	= new WAGNER.MultiPassBloomPass();
	bloomPass.params.strength = 1;
	bloomPass.params.applyZoomBlur = true;
	bloomPass.params.zoomBlurStrength = 1;
	bloomPass.params.useTexture = false;

	vignettePass = new WAGNER.Vignette2Pass();
	vignettePass.params.boost = 1.4;
	vignettePass.params.reduction = 2.8;

	fxaaPass = new WAGNER.FXAAPass();
	dirtPass = new WAGNER.DirtPass();
	blurPass = new WAGNER.GuidedFullBoxBlurPass();





	// Resize

	window.addEventListener( 'resize', setSize )


	function setSize(){


		cube.camera.aspect = window.innerWidth / window.innerHeight
		cube.camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );

		composer.setSize( window.innerWidth, window.innerHeight );
		bloomPass.params.zoomBlurCenter.set( .5 * composer.width, .5 * composer.height );

	}

	setSize();


	// Render


	function render( t ){

		renderer.setSize( window.innerWidth, window.innerHeight );
		requestAnimationFrame( render );

		if( !cube.paused ){

			composer.reset();

			composer.render( scene, cube.camera );

			// blurPass.params.invertBiasMap = 0;
			// blurPass.params.amount = 20;
			// blurPass.params.tBias = depthTexture;
			// blurPass.params.from = 1;
			// blurPass.params.to = .5;
			// composer.pass( blurPass );

			// bloomPass.zoomBlur.strength = 0;

			composer.pass( bloomPass );
			composer.pass( vignettePass );
			composer.pass( dirtPass );
			composer.pass( fxaaPass );


			composer.toScreen();
			
		}


	}

	requestAnimationFrame( render );


	return renderer;


}