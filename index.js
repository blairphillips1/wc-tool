"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var fs = __importStar(require("fs"));
var program = new commander_1.Command();
var params = ['count', 'lines', 'words', 'characters'];
program
    .version("0.0.1")
    .description("CLI written in Typescript to do some word, line, char and byte counts")
    .option("-c, --count <value>", "Gets size of file")
    .option("-l, --lines <value>", "Gets number of lines in file")
    .option("-w, --words <value>", "Gets number of words in file")
    .option("-m, --characters <value>", "Gets number of characters in file");
program.parse(process.argv);
var options = program.opts();
var key = params.reduce(function (acc, curr) {
    if (options.hasOwnProperty(curr)) {
        acc = curr;
    }
    return acc;
}, {});
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
function getFileSize(filepath) {
    var file = fs.statSync(filepath);
    var sizeInBytes = file.size;
    console.log(sizeInBytes, filepath);
}
function getNumberOfLines(filepath) {
    var linesInFile = fs.readFileSync(filepath).toString().split('\n').length - 1;
    console.log(linesInFile, filepath);
}
function getNumberOfWords(filepath) {
    var data = fs.readFileSync(filepath).toString();
    var words = data.trim().split(/\s+/);
    console.log(words.length, filepath);
}
function getNumberOfCharacters(filepath) {
    var chars = fs.readFileSync(filepath).toString().length;
    console.log(chars, filepath);
}
function getAllStats(filepath) {
    var linesInFile = fs.readFileSync(filepath).toString().split("\n").length - 1;
    var chars = fs.readFileSync(filepath).toString().length;
    var data = fs.readFileSync(filepath).toString();
    var words = data.trim().split(/\s+/);
    console.log(linesInFile, words.length, chars, filepath);
}
