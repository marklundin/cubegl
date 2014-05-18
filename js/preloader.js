function Preloader( context ) {

	this.context = context;
	this.sounds = {};
	this.loaded = 0;
	this.toLoad = 0;
	this.queue = [];

}

Preloader.prototype.addSound = function( id, filename ) {

	this.sounds[ id ] = {
		filename: filename,
		bufferData: null,
		loaded: false,
		type: 'sound'
	};

	this.addToQueue( this.sounds[ id ] );

}

Preloader.prototype.addToQueue = function( task ) {

	this.queue.push( task );
	this.toLoad++;

}

Preloader.prototype.loadSound = function( asset ) {

	var request = new XMLHttpRequest();
    request.open( 'GET', asset.filename, true );
    request.responseType = 'arraybuffer';
 
    request.onload = function() {
		this.context.decodeAudioData(request.response, function(buffer) {
			asset.bufferData = buffer;
			asset.loaded = true;
			this.onAssetLoaded();
    	}.bind( this ) , function() {
    		console.log( 'error' );
    	});
    }.bind( this );
 
    request.send();

}

Preloader.prototype.processQueue = function() {

	var a = this.queue.pop();
	this.loadSound( a );

}

Preloader.prototype.onAssetLoaded = function() {

	this.loaded++;
	if( this.loaded == this.toLoad ) {
		this.onComplete();
		return;
	}

	this.processQueue();

}

Preloader.prototype.onComplete = function() {

	if( this.onCompleteCallback ) this.onCompleteCallback();

}

Preloader.prototype.load = function( callback ) {

	this.onCompleteCallback = callback;
	this.processQueue();

}

Preloader.prototype.getSound = function( id ) {

	return this.sounds[ id ];

}