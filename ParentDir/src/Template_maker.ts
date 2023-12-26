import fs from 'fs';
import path from 'path';

class TemplateMaker {
  private parent_directory: string;
  private directory_map: object;
  private ignore_list: Set<string>;

  constructor(parent_directory = '.') {
    this.parent_directory = parent_directory;
    this.directory_map = {};
    this.ignore_list = this.loadIgnoreList();
    this.ignore_list.add('.git');
  }

  loadIgnoreList(): Set<string> {
    const ignoreFile = path.join(this.parent_directory, '.templateignore');
    if (fs.existsSync(ignoreFile)) {
      const ignoreContent = fs.readFileSync(ignoreFile, 'utf-8');
      const patterns = ignoreContent
        .split('\n')
        .map((p) => p.trim())
        .filter((p) => p !== '');
      return new Set(patterns);
    }
    return new Set();
  }

  isIgnored(name: string): boolean {
    return Array.from(this.ignore_list).some((pattern) => {
      if (pattern.startsWith('/')) {
        return name === pattern.slice(1); // Exact match for files/directories
      } else {
        return name.includes(pattern); // Partial match for files/directories
      }
    });
  }

  mapDirectory(directory = this.parent_directory): object {
    const contents = fs.readdirSync(directory);
    const entries: any = {};

    for (const item of contents) {
      if (item === '.' || item === '..' || this.isIgnored(item)) {
        continue; // Skip system-created and ignored files/directories
      }
      const itemPath = path.join(directory, item);
      const stats = fs.statSync(itemPath);

      if (stats.isDirectory()) {
        entries[item] = this.mapDirectory(itemPath); // Recursively map subdirectories
      } else {
        const fileContent = fs.readFileSync(itemPath, 'utf-8');
        entries[item] = fileContent; // Store file content
      }
    }

    this.directory_map[path.basename(directory)] = entries;
    return this.directory_map;
  }

  generateFilesFromTemplate(template: any, baseDirectory: string): void {
    if (template === undefined) {
      template = this.directory_map;
    }

    for (const itemName in template) {
      const itemPath = path.join(baseDirectory, itemName);
      const item = template[itemName];

      if (typeof item === 'object') {
        // If it's a folder, create the folder and recurse into it
        fs.mkdirSync(itemPath, { recursive: true });
        this.generateFilesFromTemplate(item, itemPath);
      } else {
        // If it's a file, create the file with content
        fs.writeFileSync(itemPath, item);
      }
    }
  }
}

// Example usage with a specified parent directory
const baseDirectory = process.cwd(); // Current working directory
const parentDirectory = path.join(baseDirectory, 'ParentDir'); // Specified parent directory
if (!fs.existsSync(parentDirectory)) {
  fs.mkdirSync(parentDirectory, { recursive: true });
}

const maker = new TemplateMaker(parentDirectory);
const directoryMap = maker.mapDirectory();
maker.generateFilesFromTemplate(undefined, parentDirectory);
console.log(directoryMap);
