import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const brandsDirectory = path.join(process.cwd(), "public", "brands");
const ignoredFiles = new Set(["SOURCES.md"]);

const isPng = (buffer) =>
  buffer.length >= 8 &&
  buffer[0] === 0x89 &&
  buffer.subarray(1, 4).toString("ascii") === "PNG";

const isJpeg = (buffer) =>
  buffer.length >= 3 &&
  buffer[0] === 0xff &&
  buffer[1] === 0xd8 &&
  buffer[2] === 0xff;

const isWebp = (buffer) =>
  buffer.length >= 12 &&
  buffer.subarray(0, 4).toString("ascii") === "RIFF" &&
  buffer.subarray(8, 12).toString("ascii") === "WEBP";

const validateFile = async (fileName) => {
  const filePath = path.join(brandsDirectory, fileName);
  const buffer = await readFile(filePath);
  const extension = path.extname(fileName).toLowerCase();
  const beginning = buffer.subarray(0, 1024).toString("utf8").trimStart();

  if (/access denied|<html|<!doctype html/i.test(beginning)) {
    return `${fileName}: resposta HTML ou bloqueio salvo como imagem`;
  }

  if (extension === ".svg" && !/<svg(?:\s|>)/i.test(beginning)) {
    return `${fileName}: conteudo invalido para SVG`;
  }

  if (extension === ".png" && !isPng(buffer)) {
    return `${fileName}: assinatura invalida para PNG`;
  }

  if ([".jpg", ".jpeg"].includes(extension) && !isJpeg(buffer)) {
    return `${fileName}: assinatura invalida para JPEG`;
  }

  if (extension === ".webp" && !isWebp(buffer)) {
    return `${fileName}: assinatura invalida para WebP`;
  }

  return null;
};

const files = (await readdir(brandsDirectory)).filter(
  (fileName) => !ignoredFiles.has(fileName),
);

const problems = (await Promise.all(files.map(validateFile))).filter(Boolean);

if (problems.length > 0) {
  throw new Error(`Logos invalidas:\n- ${problems.join("\n- ")}`);
}

console.log(`Logos verificadas: ${files.length} arquivos validos.`);
