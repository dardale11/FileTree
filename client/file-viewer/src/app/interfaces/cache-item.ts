import FileSystemNode from './file-system-node';

export default interface CacheItem {
  value: FileSystemNode[];
  expiresAt: number;
}
