var express = require("express");
var pm2 = require("pm2");

var app = express();
app.use(express.json());

// Process handler start
pm2.connect((error) => {
  if (error) {
    console.error(err);
    process.exit(2);
  }
});

app.get("/start/:phoneNumber/:companyName", function async(req, res) {
  pm2.start(
    {
      name: `${req.params.phoneNumber}`,
      script: "index.js",
      cwd: 'dist',
      env: {
        commerceName: req.params.companyName,
        commerceNumber: req.params.phoneNumber,
      },
    },
    (err, apps) => {
      pm2.disconnect();
      if (err) {
        console.error("***-> Error:", err);
      }
    }
  );
  res.send("App started");
});

app.get("/list", function (req, res) {
  pm2.list((err, list) => {
    console.log(err, list);
    res.send(list);
  });
});

app.get("/stop/:phoneNumber", function (req, res) {
    pm2.stop(req.params.phoneNumber);
})

app.listen(3000, () => {
  console.log("server is running");
});
