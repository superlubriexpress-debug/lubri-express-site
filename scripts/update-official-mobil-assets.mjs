import { writeFile } from "node:fs/promises";
import path from "node:path";

const brandsDirectory = path.join(process.cwd(), "public", "brands");
const mobilSource =
  "https://corporate.exxonmobil.com/-/media/digizuite-media-library/2025/08/28/04/20/2544502.jpg?usecustomfunctions=1&centercrop=1";
const mobilOneSource = "https://loveofdriving.mobil.com/";

const fetchOk = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Falha ao baixar ${url}: HTTP ${response.status}`);
  }

  return response;
};

const mobilResponse = await fetchOk(mobilSource);
const mobilBuffer = Buffer.from(await mobilResponse.arrayBuffer());

if (
  mobilBuffer.length < 3 ||
  mobilBuffer[0] !== 0xff ||
  mobilBuffer[1] !== 0xd8 ||
  mobilBuffer[2] !== 0xff
) {
  throw new Error("A fonte oficial da Mobil nao retornou um JPEG valido.");
}

const mobilOneResponse = await fetchOk(mobilOneSource);
const mobilOneHtml = await mobilOneResponse.text();
const logoStart = mobilOneHtml.indexOf(
  'data-framer-name="mobil_1_horizontal"',
);

if (logoStart < 0) {
  throw new Error("O bloco oficial da logo Mobil 1 nao foi encontrado.");
}

const logoBlock = mobilOneHtml.slice(logoStart, logoStart + 30_000);
const embeddedLogo = logoBlock.match(
  /background-image:url\('data:image\/svg\+xml,([^']+)'\)/,
);
const logoSvg = embeddedLogo
  ? decodeURIComponent(embeddedLogo[1])
  : undefined;

if (!logoSvg?.startsWith("<svg") || !logoSvg.includes("</svg>")) {
  throw new Error("O SVG oficial da Mobil 1 nao foi encontrado.");
}

await Promise.all([
  writeFile(path.join(brandsDirectory, "mobil.jpg"), mobilBuffer),
  writeFile(path.join(brandsDirectory, "mobil-1.svg"), logoSvg, "utf8"),
]);

console.log("Logos oficiais Mobil e Mobil 1 atualizadas.");
