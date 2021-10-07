import { Component, OnInit } from '@angular/core';
import { InfiniteScrollService } from '@syncfusion/ej2-angular-grids';
import { Grid, Freeze, Selection } from '@syncfusion/ej2-grids';
import {
  PageSettingsModel,
  InfiniteScrollSettingsModel,
  ColumnChooserService,
  ToolbarService,
  PageService,
} from '@syncfusion/ej2-angular-grids';
import {
  ContextMenu,
  MenuItemModel,
  ContextMenuModel,
} from '@syncfusion/ej2-navigations';
import { enableRipple } from '@syncfusion/ej2-base';

Grid.Inject(Selection);

enableRipple(true);

const names = [
  'TOM',
  'Hawk',
  'Jon',
  'Chandler',
  'Monica',
  'Rachel',
  'Phoebe',
  'Gunther',
  'Ross',
  'Geller',
  'Joey',
  'Bing',
  'Tribbiani',
  'Janice',
  'Bong',
  'Perk',
  'Green',
  'Ken',
  'Adams',
];
const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const designation = ['Manager', 'Engineer', 'Analyst', 'Developer', 'Tester'];
const status = ['Completed', 'Open', 'In Progress', 'Review', 'Testing'];
const data = (count) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push({
      TaskID: i + 1,
      Name: names[Math.round(Math.random() * names.length)] || names[0],
      Designation:
        designation[Math.round(Math.random() * designation.length)] ||
        designation[0],
      Hours: hours[Math.round(Math.random() * hours.length)] || hours[0],
      Status: status[Math.round(Math.random() * status.length)] || status[0],
    });
  }
  return result;
};

@Component({
  selector: 'app-root',
  template: `<div id='taskid'> Context Menu text</div>
  <ul id='contextmenutaskid'></ul>
  <ejs-treegrid [dataSource]='data' height=500 enableInfiniteScrolling='true' [pageSettings]='pageSettings' allowSorting='true' allowResizing='true' allowFiltering='true' [showColumnChooser]='true' [toolbar]='toolbar'>
                <e-columns>
                    <e-column field='TaskID' headerText='Task ID' textAlign='Right' width=70></e-column>
                    <e-column field='Name' width=100></e-column>
                    <e-column id='designation' field='Designation' width=100></e-column>
                    <e-column id='hours' field='Hours' textAlign='Right' width=100></e-column>
                    <e-column id='status' field='Status' width=100></e-column>
                </e-columns>
                </ejs-treegrid>`,
  providers: [
    InfiniteScrollService,
    PageService,
    ColumnChooserService,
    ToolbarService,
  ],
})
export class AppComponent implements OnInit {
  public data: object[];
  public options: PageSettingsModel;
  public infiniteOptions: InfiniteScrollSettingsModel;
  public pageSettings: PageSettingsModel;
  public toolbar: string[];

  ngOnInit(): void {
    this.data = data(1000);
    this.options = { pageSize: 50 };
    this.infiniteOptions = { enableScroll: true };
    this.pageSettings = { pageSize: 50 };
    this.toolbar = ['ColumnChooser'];

    //Initialize menu items.
    let menuItems: MenuItemModel[] = [
      {
        text: 'Text',
      },
      {
        text: 'Num',
      },
      {
        text: 'Date',
      },
      {
        text: 'Boolean',
      },
      {
        text: 'DropDownList',
      },
    ];
    // Initialize ContextMenu options.
    let menuOptionsForTask: ContextMenuModel = {
      target: '#taskid',
      items: menuItems,
    };

    // Initialize ContextMenu component.
    let menuObjForTask: ContextMenu = new ContextMenu(
      menuOptionsForTask,
      '#contextmenutaskid'
    );
  }
}
