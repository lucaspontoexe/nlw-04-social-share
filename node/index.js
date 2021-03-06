// https://nodejs.org/en/knowledge/HTTP/clients/how-to-access-query-string-parameters/
const http = require("http");
const url = require("url");
const { loadImage, registerFont, createCanvas } = require("canvas");
const Box = require("./Box");
const colors = require("./colors");

http
  .createServer(async function (req, res) {
    const queryObject = url.parse(req.url, true).query;
    // console.log(queryObject);
    const stream = await drawCanvas();
    res.writeHead(200, { "Content-Type": "image/png" });
    // res.end("Feel free to add query parameters to the end of the url");
    stream.pipe(res);
  })
  .listen(8080);

// todo: parameters
const level = 23;
const completedChallenges = 20;
const XP = 154000;

const box_stats = new Box(113, 731, 342, 404);
const advancedTextMiddlePoint = 364;

registerFont("./Inter/Inter-Bold.ttf", { family: "Inter", weight: "bold" });
registerFont("./Inter/Inter-Medium.ttf", { family: "Inter", weight: "medium" });
registerFont("./Inter/Inter-SemiBold.ttf", {
  family: "Inter",
  weight: "semibold",
});
registerFont("./Inter/Inter-Regular.ttf", {
  family: "Inter",
  weight: "regular",
});

async function drawCanvas() {
  const moveitLogo = await loadImage("./Logo.svg");
  const leafL = await loadImage("./leaf-L.svg");
  const leafR = await loadImage("./leaf-R.svg");

  const canvas = createCanvas(1200, 630);
  const ctx = canvas.getContext("2d");

  // fundo branco no canvas
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // desenhar a logo
  ctx.drawImage(moveitLogo, box_stats.left, box_stats.bottom - 50);

  // textos alinhados pelo canto superior
  ctx.textBaseline = "top";

  // texto DESAFIOS e EXPERIÊNCIA
  ctx.fillStyle = colors.texts;
  ctx.font = "700 24px Inter";
  ctx.fillText("DESAFIOS", box_stats.x, box_stats.y);
  ctx.fillText("EXPERIÊNCIA", box_stats.x, 264);

  // texto "X Completados" e "Y xp"
  ctx.font = "500 40px Inter";
  const challengesTextMeasure = ctx.measureText(String(completedChallenges));
  const XPTextMeasure = ctx.measureText(String(XP));

  // (número de desafios)
  ctx.fillStyle = colors.blue1;
  ctx.fillText(String(completedChallenges), box_stats.left, 152);
  // completados
  ctx.fillStyle = colors.texts;
  ctx.fillText(
    " completados",
    box_stats.left + challengesTextMeasure.width,
    152
  );

  // (número de experiência)
  ctx.fillStyle = colors.blue1;
  ctx.fillText(String(XP), box_stats.left, 303);
  // xp
  ctx.fillStyle = colors.texts;
  ctx.fillText(" xp", box_stats.left + XPTextMeasure.width, 303);

  // linhas divisórias
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = colors.grayLine;

  // linha divisória 1
  ctx.moveTo(box_stats.left, 232);
  ctx.lineTo(box_stats.right, 232);
  ctx.stroke();

  // linha divisória 2
  ctx.moveTo(box_stats.left, 383);
  ctx.lineTo(box_stats.right, 383);
  ctx.stroke();

  // Texto Avancei
  ctx.fillStyle = colors.texts;
  ctx.textAlign = "center";
  ctx.font = "600 56px Inter";
  ctx.fillText("Avancei para", advancedTextMiddlePoint, 397);
  // 397 + line height, que é de 60px
  ctx.fillText("o próximo level", advancedTextMiddlePoint, 457);

  // Número do nível: preparação
  ctx.fillStyle = "#5965E0";
  ctx.font = "bold 306px Inter";
  const level_measurement = ctx.measureText(String(level));

  // folhas de trás
  ctx.drawImage(
    leafL,
    advancedTextMiddlePoint -
      leafL.width -
      level_measurement.actualBoundingBoxLeft / 2,
    102
  );

  ctx.drawImage(
    leafR,
    advancedTextMiddlePoint + level_measurement.actualBoundingBoxRight / 4, // https://github.com/Automattic/node-canvas/issues/1703
    102
  );

  ctx.shadowBlur = 16;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 10;
  ctx.shadowColor = "#5965E04D";
  ctx.fillText(String(level), advancedTextMiddlePoint, 102);

  // TEST
  //   const fs = require("fs");
  //   const out = fs.createWriteStream(__dirname + "/test.png");
  const stream = canvas.createPNGStream();
  //   stream.pipe(out);
  //   out.on("finish", () => console.log("The PNG file was created."));
  return stream;
}
