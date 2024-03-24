var opts = {
    // Whether to scan continuously for QR codes. If false, use scanner.scan() to
    // manually scan. If true, the scanner emits the "scan" event when a QR code is
    // scanned. Default true.
    continuous: true,
    // The HTML element to use for the camera's video preview. Must be a <video>
    // element. When the camera is active, this element will have the "active" CSS
    // class, otherwise, it will have the "inactive" class. By default, an invisible
    // element will be created to host the video.
    video: document.getElementById('preview'),
    // facing mode to environment to enable the back camera on a mobile device,
    // source: https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/facingMode
    facingMode: 'environment',
    // Whether to include the scanned image data as part of the scan result. See the
    // "scan" event for image format details. Default false.
    captureImage: false,
    // Only applies to continuous mode. Whether to actively scan when the tab is not
    // active.
    // When false, this reduces CPU usage when the tab is not active. Default true.
    backgroundScan: true,
    // Only applies to continuous mode. The period, in milliseconds, before the same QR
    // code will be recognized in succession. Default 5000 (5 seconds).
    refractoryPeriod: 5000,
    // Only applies to continuous mode. The period, in rendered frames, between scans. A
    // lower scan period increases CPU usage but makes scan response faster.
    // Default 1 (i.e. analyze every frame).
    scanPeriod: 1
};

var scanner = new Instascan.Scanner(opts);

document.getElementById("button").addEventListener("click", function(){
    Instascan.Camera.getCameras().then(function (cameras) {
        // find if the device supports the back camera
        // source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
        let backCamera = cameras.find(function(camera) {
            // source: https://forum.freecodecamp.org/t/javascript-string-prototype-indexof-index-of-explained-with-examples/15936
            return camera.name.indexOf('back') !== -1;
        });
        // if back camera is true then start the scanner
        if (backCamera){
            scanner.start(backCamera);
        }
        // else pop up the message that back camera is not found
        else {
            console.error('No back camera found.');
            alert("No back camera found.");
        }


    }).catch(function (e) {
        console.error(e);
    });
})

scanner.addListener('scan', function (content) {
    console.log(content);
    document.getElementById("content").innerHTML = content;
});
