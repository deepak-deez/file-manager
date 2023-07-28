import process from "process";
import fs from "fs";
import path from "path";

var args = process.argv;
const __dirname = process.cwd();
function execute(choice) {
  switch (choice) {
    case "0":
      menu();
      break;
    case "1":
      createFolder(args[3], args[4] = "./");
      menu();
      break;
    case "2":
      deleteFolder(args[3], args[4] = "./");
      menu();
      break;
    case "3":
      getCurrentFilenames(__dirname);
      menu();
      break;
    case "4":
      renameFolder(args[3], args[4], args[5] = "./");
      menu();
      break;
    case "5":
      createFile(args[3], args[4] = "./");
      menu();
      break;
    case "6":
      deleteFile(args[3], args[4] = "./");
      menu();
      break;
    case "7":
      editFile(args[3], args[4], args[5], args[6] = "./");
      menu();
      break;
    case "8":
      move(args[3], args[4]);
      menu();
      break;
    case "9":
      copy(args[3], args[4]);
      menu();
      break;
  }
}

function getCurrentFilenames() {
  console.log("\nCurrent folder contains");
  fs.readdirSync(__dirname).forEach((file) => {
    console.log(file);
  });
  console.log("\n");
}

function createFolder(fname, pathName) {
  if (!fs.existsSync(path.join(pathName, fname))) {
    fs.mkdirSync(path.join(pathName, fname));
  }
}

function deleteFolder(fname, pathName) {
  if (fs.existsSync(path.join(pathName, fname))) {
    fs.rm(
      path.join(pathName, fname),
      {
        recursive: true,
      },
      () => {
        console.log("Folder Deleted!");
      }
    );
  }
}

function renameFolder(fname, newname, pathName) {
  if (fs.existsSync(path.join(pathName, fname))) {
    fs.renameSync(path.join(pathName, fname), path.join(pathName, newname));
  }
}

function createFile(fname, pathName) {
  if (!fs.existsSync(path.join(pathName, fname))) {
    fs.writeFileSync(path.join(pathName, fname), "");
  }
  console.log("File created successfully");
}

function deleteFile(fname, pathName) {
  fs.rm(path.join(pathName, fname), { recursive: true }, (err) => {
    if (err) {
      // File deletion failed
      console.error(err.message);
      return;
    }
    console.log("File deleted successfully");
  });
}

function editFile(fname, oldData, newData, pathName) {
  fs.readFile(path.join(pathName, fname), "utf8", function (err, data) {
    if (err) {
      console.error(err);
    }
    var newValue = data.replace(oldData, newData);
    fs.writeFile(path.join(pathName, fname), newValue, function () {
      console.log(newValue);
    });
  });

  console.log("You have modified the file ");
}

function move(src, dest) {
  fs.rename(src, dest, (err) => {
    if (err) return console.log(err);
    console.log(`File successfully moved!!`);
  });
}

function copy(src, dest) {
  fs.cp(src, dest, { recursive: true }, (err) => {
    if (err) {
      console.error(err);
    }
    console.log(`File successfully copied!!`);
  });
}

if (args.length > 2) {
  execute(args[2]);
}
else
  menu();

function menu() {
  console.log("0: list menu");
  console.log("1: create folder \t args=(foldername, path)");
  console.log("2: delete folder \t args=(foldername, path)");
  console.log("3: list current directory");
  console.log("4: rename folder \t args=(foldername, newname, path)");
  console.log("5: create file \t args=(filename, path)");
  console.log("6: delete file \t args=(filename, path)");
  console.log("7: edit file \t args=(filename, oldText, newText, path)");
  console.log("8: move \t args=(src/filename, dest/filename, path)");
  console.log("9: copy \t args=(src/filename, dest/filename, path)");
}
