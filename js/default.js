 var mesh1, mesh2;
 var newMeshReady = false;
 var sizeMesh1 = 22;
 var sizeMesh2 = 8;
 var radius1 = 3;
 var radius2x = 12;
 var radius2z = 10;
 var omega1 =  1.032;
 var omega2 = -3.729;
 var time_s = 0;
 var time1 = 0;
 var time0 = 0;
 var windowWidth = window.innerWidth, windowHeight = window.innerHeight;

 var scene,camera,renderer;
 Init();
 readSTLs('resource/apple2.stl'); 
 animate();
 function Init(){
 		scene = new THREE.Scene();

		//setup camera
 		camera = new LeiaCamera();
        camera.position.copy(_camPosition);
        camera.lookAt(_tarPosition);
		
 		renderer = new LeiaWebGLRenderer({
        antialias:true, 
 		renderMode: _renderMode,  
		shaderMode: _nShaderMode,
		devicePixelRatio: 1 
        } );
 		renderer.Leia_setSize( windowWidth, windowHeight );
 		document.body.appendChild( renderer.domElement );
 		
 		var xl = new THREE.DirectionalLight( 0x555555 );
 			xl.position.set( 1, 0, 2 );
 			scene.add( xl );
 			var pl = new THREE.PointLight(0x111111);
 			pl.position.set(-20, 10, 20);
 			scene.add(pl);
 
 			var ambientLight = new THREE.AmbientLight(0x111111);	
 			scene.add(ambientLight);
 
 	time1 = Date.now() * 0.001; 
 	time0 = Date.now() * 0.001;
 }
 function readSTLs(filename) 
 {
 	var xhr = new XMLHttpRequest();
 	xhr.onreadystatechange = function () {
 	if ( xhr.readyState == 4 ) {
 		if ( xhr.status == 200 || xhr.status == 0 ) {
 			var rep = xhr.response; // || xhr.mozResponseArrayBuffer;
 			mesh1 = parseStlBinary(rep);
 			mesh1.scale.set(sizeMesh1, sizeMesh1, sizeMesh1);
 			scene.add(mesh1);
 			mesh2 = parseStlBinary(rep);
 			mesh2.scale.set(sizeMesh2, sizeMesh2, sizeMesh2);
 			scene.add(mesh2);
 			newMeshReady = true;
 			}
 		}
 	};
 	xhr.onerror = function(e) {
 		console.log(e);
 	};
 	xhr.open( "GET", filename, true );
 	xhr.responseType = "arraybuffer";
 	xhr.send( null );
 }
 
 
 function animate() 
 {
 	requestAnimationFrame( animate );
 	if (newMeshReady) {
 	time1 = Date.now() * 0.001; 
 	time_s = time1 - time0;
 		mesh1.position.set(-radius1*Math.cos(time_s)-1, 0, 1.0-radius1*Math.sin(time_s)+3); 
 		mesh2.position.set(radius2x*Math.cos(time_s)-1, -1, 1.0+radius2z*Math.sin(time_s)+3); 
 		mesh1.rotation.y = omega1*time_s;
 		mesh2.rotation.y = omega2*time_s;
 	}
    renderer.setClearColor(new THREE.Color().setRGB(1.0, 1.0, 1.0)); 
	renderer.Leia_render(scene, camera,undefined,undefined,_holoScreenScale,_camFov,_messageFlag);
 }
