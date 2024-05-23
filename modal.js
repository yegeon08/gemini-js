const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("API_KEY");

function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType,
    },
  };
}

async function run() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

  const prompt = "이 고양이는 어떤 종류의 고양이니?";

  const imageParts = fileToGenerativePart("다운로드.png", "image/png");

  const result = await model.generateContent([prompt, imageParts]);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();
