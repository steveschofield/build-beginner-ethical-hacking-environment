"use strict";

const statusElement = document.querySelector("#status");

async function measureFrames(model, frame, count = 5) {
  const times = [];
  for (let index = 0; index < count; index += 1) {
    const startedAt = performance.now();
    await model.send({ image: frame });
    times.push(performance.now() - startedAt);
  }
  const warm = times.slice(1);
  return {
    coldMs: Math.round(times[0]),
    warmAverageMs: Math.round(warm.reduce((sum, value) => sum + value, 0) / warm.length),
  };
}

async function runModelSmokeTest() {
  let holisticModel;
  let handsModel;
  try {
    holisticModel = new window.Holistic({
      locateFile: (file) => `../vendor/mediapipe/holistic/${file}`,
    });
    holisticModel.setOptions({
      selfieMode: true,
      modelComplexity: 0,
      enableSegmentation: true,
      smoothSegmentation: true,
    });

    let receivedHolisticResults = false;
    holisticModel.onResults(() => { receivedHolisticResults = true; });
    await holisticModel.initialize();

    handsModel = new window.Hands({
      locateFile: (file) => `../vendor/mediapipe/hands/${file}`,
    });
    handsModel.setOptions({
      selfieMode: true,
      maxNumHands: 2,
      modelComplexity: 0,
    });
    let receivedHandResults = false;
    handsModel.onResults(() => { receivedHandResults = true; });
    await handsModel.initialize();

    const frame = document.createElement("canvas");
    frame.width = 320;
    frame.height = 180;
    const context = frame.getContext("2d");
    context.fillStyle = "#101522";
    context.fillRect(0, 0, frame.width, frame.height);
    const holisticTiming = await measureFrames(holisticModel, frame);
    const handsTiming = await measureFrames(handsModel, frame);

    if (!receivedHolisticResults || !receivedHandResults) throw new Error("One or more models did not return a result callback.");
    window.SMOKE_RESULTS = { holistic: holisticTiming, hands: handsTiming };
    statusElement.textContent = `PASS — Holistic cold ${holisticTiming.coldMs} ms / warm ${holisticTiming.warmAverageMs} ms; Hands Lite cold ${handsTiming.coldMs} ms / warm ${handsTiming.warmAverageMs} ms.`;
    document.title = "PASS — Local MediaPipe model";
  } catch (error) {
    console.error(error);
    statusElement.textContent = `FAIL — ${error.message}`;
    statusElement.style.color = "#ff8a9a";
    document.title = "FAIL — Local MediaPipe model";
  } finally {
    await holisticModel?.close();
    await handsModel?.close();
  }
}

runModelSmokeTest();
