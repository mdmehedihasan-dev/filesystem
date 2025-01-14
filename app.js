const fs = require("fs/promises");

(async () => {
  const myFile = await fs.open("./command.txt", "r");

  let indexPath = "./index.html";

  myFile.on("change", async function () {
    // console.log( await myFile.stat())
    let size = (await myFile.stat()).size;
    let buf = Buffer.alloc(size);
    let offset = 0;
    let length = buf.byteLength;
    let position = 0;
    await myFile.read(buf, offset, length, position);
    // console.log(buf)
    let myCmd = buf.toString("utf-8");
    if (myCmd.startsWith("create link")) {
      let read = await fs.readFile(indexPath, "utf-8");
      await fs.writeFile(indexPath, `${read} <a href='#'>button</a> `, "utf-8");
    } else if (myCmd.startsWith("create button")) {
      let read = await fs.readFile(indexPath, "utf-8");
      await fs.writeFile(
        indexPath,
        `${read} <button>Node JS</button> `,
        "utf-8"
      );
    } else if (myCmd.startsWith("create navbar")) {
      let read = await fs.readFile(indexPath, "utf-8");

      await fs.writeFile(
        indexPath,
        ` ${read} <!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}

.topnav {
  position: relative;
  overflow: hidden;
  background-color: #333;
}

.topnav a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav a.active {
  background-color: #04AA6D;
  color: white;
}

.topnav-centered a {
  float: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.topnav-right {
  float: right;
}

/* Responsive navigation menu (for mobile devices) */
@media screen and (max-width: 600px) {
  .topnav a, .topnav-right {
    float: none;
    display: block;
  }
  
  .topnav-centered a {
    position: relative;
    top: 0;
    left: 0;
    transform: none;
  }
}
</style>
</head>
<body>

<!-- Top navigation -->
<div class="topnav">

  <!-- Centered link -->
  <div class="topnav-centered">
    <a href="#home" class="active">Home</a>
  </div>
  
  <!-- Left-aligned links (default) -->
  <a href="#news">News</a>
  <a href="#contact">Contact</a>
  
  <!-- Right-aligned links -->
  <div class="topnav-right">
    <a href="#search">Search</a>
    <a href="#about">About</a>
  </div>
  
</div>

<div style="padding-left:16px">
  <h2>Responsive Top Navigation with Centered and Right-Aligned Links</h2>
  <p>Resize the browser window to see the responsive effect.</p>
</div>

</body>
</html>   `,
        "utf-8"
      );
    }else if(myCmd.startsWith("create footer")){
      let read = await fs.readFile(indexPath, "utf-8");

      await fs.writeFile(
        indexPath,
        ` ${read}  <!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}

.navbar {
  overflow: hidden;
  background-color: #333;
  position: fixed;
  bottom: 0;
  width: 100%;
}

.navbar a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.navbar a:hover {
  background: #f1f1f1;
  color: black;
}

.navbar a.active {
  background-color: #04AA6D;
  color: white;
}

.main {
  padding: 16px;
  margin-bottom: 30px;
}
</style>
</head>
<body>

<div class="navbar">
  <a href="#home" class="active">Home</a>
  <a href="#news">News</a>
  <a href="#contact">Contact</a>
</div>

<div class="main">
  <h1>Bottom Navigation Bar</h1>
  <p>Some text some text some text.</p>
</div>

</body>
</html>
 `,
        "utf-8"
      )
    }
  });

  const watcher = fs.watch("./command.txt");
  for await (const x of watcher) {
    if (x.eventType == "change") {
      myFile.emit("change");
    }
  }
})();
