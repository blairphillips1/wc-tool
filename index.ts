import { Command } from "commander";
import * as fs from "fs";

const program = new Command();

const params: Array<string> = ['count', 'lines', 'words', 'characters'];

program
  .version("0.0.1")
  .description(
    "CLI written in Typescript to do some word, line, char and byte counts"
  )
  .option("-c, --count <value>", "Gets size of file")
  .option("-l, --lines <value>", "Gets number of lines in file")
  .option("-w, --words <value>", "Gets number of words in file")
  .option("-m, --characters <value>", "Gets number of characters in file");

program.parse(process.argv);

const options = program.opts();

const key = params.reduce((acc, curr) => {
  if (options.hasOwnProperty(curr)) {
    acc = curr;
  }
  return acc;
}, {})

switch (key) {
  case "count":
    getFileSize(options.count);
    break;
  case "lines":
    getNumberOfLines(options.lines);
    break;
  case "words":
    getNumberOfWords(options.words);
    break;
  case "characters":
    getNumberOfCharacters(options.characters);
    break;
}

if (Object.keys(options).length === 0 && process.argv[2]) {
  getAllStats(process.argv[2]);
}

function getFileSize(filepath: string) {
  const file = fs.statSync(filepath);
  const sizeInBytes = file.size;
  console.log(sizeInBytes, filepath);
}

function getNumberOfLines(filepath: string) {
  const linesInFile = fs.readFileSync(filepath).toString().split('\n').length - 1;
  console.log(linesInFile, filepath);
}

function getNumberOfWords(filepath: string) {
  const data = fs.readFileSync(filepath).toString();
  const words = data.trim().split(/\s+/);
  console.log(words.length, filepath);
}

function getNumberOfCharacters(filepath: string) {
  const chars = fs.readFileSync(filepath).toString().length;
  console.log(chars, filepath);
}

function getAllStats(filepath: string) {
  const linesInFile =
    fs.readFileSync(filepath).toString().split("\n").length - 1;
  const chars = fs.readFileSync(filepath).toString().length;
  const data = fs.readFileSync(filepath).toString();
  const words = data.trim().split(/\s+/);
  console.log(linesInFile, words.length, chars, filepath);
}
