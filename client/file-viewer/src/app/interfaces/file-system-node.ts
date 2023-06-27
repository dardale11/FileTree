import { FolderFileType } from '../enums/folder-file-type';

export default interface FileSystemNode {
  type: FolderFileType;
  name: string;
  children?: FileSystemNode[];
}
