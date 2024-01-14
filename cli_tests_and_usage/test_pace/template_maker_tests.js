import fs from "fs";
import path from "path";
import { TemplateMaker } from "../cli/dist/Template_maker"; // Adjust the import path as per your project structure

describe("TemplateMaker", () => {
  let templateMaker;

  beforeAll(() => {
    // Create a temporary directory for testing
    const tempDir = path.join(__dirname, "tempTestDir");
    fs.mkdirSync(tempDir);

    // Add necessary test files and folders for simulation
    fs.writeFileSync(path.join(tempDir, "file1.txt"), "File 1 content");
    fs.mkdirSync(path.join(tempDir, "subfolder"));
    fs.writeFileSync(
      path.join(tempDir, "subfolder", "file2.txt"),
      "File 2 content"
    );

    // Initialize TemplateMaker with the temporary directory
    templateMaker = new TemplateMaker("tempTestDir");
  });

  afterAll(() => {
    // Clean up: Remove the temporary directory after tests
    fs.rmdirSync(path.join(__dirname, "tempTestDir"), { recursive: true });
  });

  test("loadIgnoreList should correctly load ignore patterns from .templateignore", () => {
    // Mocking the .templateignore file content for testing
    const ignoreContent = "ignoredFile1\n/ignoredFolder";
    jest.spyOn(fs, "existsSync").mockReturnValue(true);
    jest.spyOn(fs, "readFileSync").mockReturnValue(ignoreContent);

    const ignoreList = templateMaker.loadIgnoreList();
    expect(ignoreList.size).toBe(2);
    expect(ignoreList.has("ignoredFile1")).toBe(true);
    expect(ignoreList.has("/ignoredFolder")).toBe(true);
  });

  test("isIgnored should correctly identify ignored files/folders", () => {
    // Assuming certain files/folders are in the ignore list
    templateMaker.ignore_list = new Set(["ignoredFile1", "/ignoredFolder"]);

    expect(templateMaker.isIgnored("ignoredFile1")).toBe(true);
    expect(templateMaker.isIgnored("/ignoredFolder/someFile.txt")).toBe(true);
    expect(templateMaker.isIgnored("notIgnoredFile.txt")).toBe(false);
  });

  test("mapDirectory should correctly map directories and files", () => {
    const directoryMap = templateMaker.mapDirectory();
    expect(Object.keys(directoryMap).length).toBe(2); // Assuming two items were created
    expect(directoryMap["file1.txt"]).toBe("File 1 content");
    expect(Object.keys(directoryMap["subfolder"]).length).toBe(1); // Assuming one item in subfolder
    expect(directoryMap["subfolder"]["file2.txt"]).toBe("File 2 content");
  });

  test("generateFilesFromTemplate should create files and folders from the template", () => {
    const tempTemplate = {
      testFolder: {
        "testFile.txt": "Test file content",
      },
    };

    const tempBaseDir = path.join(__dirname, "tempTestDir");
    templateMaker.generateFilesFromTemplate(tempTemplate, tempBaseDir);

    expect(fs.existsSync(path.join(tempBaseDir, "testFolder"))).toBe(true);
    expect(
      fs.existsSync(path.join(tempBaseDir, "testFolder", "testFile.txt"))
    ).toBe(true);
    expect(
      fs.readFileSync(
        path.join(tempBaseDir, "testFolder", "testFile.txt"),
        "utf-8"
      )
    ).toBe("Test file content");
  });
});
