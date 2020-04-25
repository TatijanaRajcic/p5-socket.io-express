function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  socket = io.connect();
  // We make a named event called 'mouse' and write an anonymous callback function
  socket.on("mouse", function (data) {
    // for drawing the circles on the client who is the receiver
    console.log("Got: " + data.x + " " + data.y);
    // Draw a blue circle
    fill(0, 0, 255);
    noStroke();
    ellipse(data.x, data.y, 80, 80);
  });
}

// for the client drawing the circles
function mouseDragged() {
  // Draw some white circles
  fill(255);
  noStroke();
  ellipse(mouseX, mouseY, 80, 80);
  // Send the mouse coordinates
  sendmouse(mouseX, mouseY);
}

// Function for sending to the socket
function sendmouse(xpos, ypos) {
  // We are sending!
  console.log("sendmouse: " + xpos + " " + ypos);

  // Make a little object with  and y
  var data = {
    x: xpos,
    y: ypos,
  };

  // Send that object to the socket
  socket.emit("mouse", data);
}
