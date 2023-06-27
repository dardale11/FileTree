import { NestedTreeControl } from '@angular/cdk/tree';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import FileSystemNode from '../../interfaces/file-system-node';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css'],
})
export class TreeViewComponent implements OnInit, OnChanges {
  @Input() treeData: FileSystemNode[] = [];
  treeControl = new NestedTreeControl<FileSystemNode>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<FileSystemNode>();

  constructor() {
    this.dataSource.data = [];
  }

  ngOnInit(): void {
    this.dataSource.data = this.treeData;
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.dataSource.data = this.treeData;
  }

  hasChild = (_: number, node: FileSystemNode) =>
    !!node.children && node.children.length > 0;
}
