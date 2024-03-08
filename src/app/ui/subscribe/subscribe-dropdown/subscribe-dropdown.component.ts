import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'app-subscribe-dropdown',
  templateUrl: './subscribe-dropdown.component.html',
  styleUrl: './subscribe-dropdown.component.css',
})
export class SubscribeDropdownComponent {
  @Input() isDropdownActived = false;
  @Input() dropdownData: { id: number; name: string; groupName?: string }[] =
    [];
  @Input() selectedDropdownOptions:
    | { id: number; name: string; groupName?: string }[]
    | undefined;
  @Input() optionsLimit: number | null = null;
  @Output() toggleDropdownOption = new EventEmitter();
  @ViewChildren('dropdownOptionCheckbox') dropdownOptionsCheckBbox:
    | QueryList<ElementRef>
    | undefined;

  // 存取groupName在陣列中起始位子
  groupNamesPos: number[] = [];

  searchText = '';
  searchTextPlaceholder = '';
  filteredData: { id: number; name: string; groupName?: string }[] = [];

  ngOnChanges() {
    this.searchTextPlaceholder =
      this.groupNamesPos.length > 0 ? '搜尋區域關鍵字' : '搜尋職務關鍵字';

    if (this.filteredData.length === 0) {
      this.filteredData = this.dropdownData;
    }

    if (
      this.groupNamesPos.length === 0 &&
      this.filteredData &&
      this.filteredData.length > 0 &&
      this.filteredData[0].groupName
    ) {
      this.setGroupNamesPos();
    }

    // 下拉選單關閉後 如果有搜尋文字 則重置選項
    if (!this.isDropdownActived && this.searchText) {
      this.searchText = '';
      this.filteredData = this.dropdownData;
      this.filteredData[0].groupName ? this.setGroupNamesPos() : '';
    }
  }

  resetFlags() {
    this.dropdownOptionsCheckBbox?.forEach(
      (input) => (input.nativeElement.checked = false)
    );

    this.selectedDropdownOptions = [{ id: 0, name: '不拘' }];
  }

  removeFlag(id: number) {
    if (id === 0 || !this.selectedDropdownOptions) {
      return;
    }

    this.selectedDropdownOptions.splice(
      this.selectedDropdownOptions.findIndex((option) => option.id === id),
      1
    );

    const input = this.dropdownOptionsCheckBbox?.find(
      (input) => id === parseInt(input.nativeElement.id)
    )?.nativeElement;

    input.checked = false;

    if (this.selectedDropdownOptions.length === 0) {
      this.selectedDropdownOptions = [{ id: 0, name: '不拘' }];
    }
  }

  // 存取groupName位子
  setGroupNamesPos() {
    this.groupNamesPos = [];
    this.groupNamesPos.push(0);
    let tempGroupName = this.filteredData[0].groupName;

    this.filteredData.forEach((data, i) => {
      if (data.groupName !== tempGroupName) {
        tempGroupName = data.groupName!;
        this.groupNamesPos.push(i);
      }
    });
  }

  // 存取groupName分類後的input
  getGroupByInputs(groupById: number) {
    // groupById需要加上他在groupNamesPos中的位子，
    // 才能取得正確的起始元素，lastIndex中，必須+1才能取得正確的最後元素

    const groupByIdPos = this.groupNamesPos.findIndex(
      (pos) => pos === groupById
    );

    const startIndex = groupById + groupByIdPos;

    const lastIndex =
      this.groupNamesPos.length - 1 === groupByIdPos
        ? undefined
        : this.groupNamesPos[groupByIdPos + 1] + groupByIdPos + 1;

    // 取得選擇所有地區後的inputs
    const inputs = this.dropdownOptionsCheckBbox!.map(
      (input) => input.nativeElement
    ).slice(startIndex, lastIndex);

    return inputs;
  }

  // 確認區域選擇是否全選
  setGroupNameChecked(id: number) {
    const index = this.groupNamesPos.findIndex((pos) => pos > id);
    const groupById =
      this.groupNamesPos[
        index >= 0 ? index - 1 : this.groupNamesPos.length - 1
      ];

    const inputs = this.getGroupByInputs(groupById);
    const isInputsChecked = inputs.slice(1).every((input) => input.checked);

    isInputsChecked ? (inputs[0].checked = true) : (inputs[0].checked = false);
  }

  // 已選擇更換背景顏色
  setOptionsBGColor() {
    this.dropdownOptionsCheckBbox?.forEach((input) => {
      const el = input.nativeElement;
      const optionEl = el.closest('.dropdown_option');
      el.checked
        ? optionEl.classList.add('dropdown_option--active')
        : optionEl.classList.contains('dropdown_option--active')
        ? optionEl.classList.remove('dropdown_option--active')
        : '';
    });
  }

  // 選取結果
  sendDropdownOptions(input: HTMLInputElement) {
    if (!this.selectedDropdownOptions) {
      return;
    }

    const name =
      input.nextElementSibling && input.nextElementSibling.textContent;

    input.checked
      ? this.selectedDropdownOptions.some(
          (option) => option.id === parseInt(input.id)
        )
        ? ''
        : this.selectedDropdownOptions.push({
            id: parseInt(input.id),
            name: name || '不拘',
            groupName:
              this.filteredData.find((data) => data.name === name)?.groupName ||
              undefined,
          })
      : this.selectedDropdownOptions.splice(
          this.selectedDropdownOptions.findIndex(
            (option) => option.id === parseInt(input.id)
          ),
          1
        );

    // 限制數量
    if (
      typeof this.optionsLimit === 'number' &&
      this.optionsLimit &&
      this.selectedDropdownOptions.length === this.optionsLimit + 1
    ) {
      const shiftOption = this.selectedDropdownOptions.shift();
      const input = this.dropdownOptionsCheckBbox?.find(
        (input) => parseInt(input.nativeElement.id) === shiftOption?.id
      )?.nativeElement;

      input.checked = false;
    }

    this.setOptionsBGColor();

    // 當沒有選擇時 預設為不拘
    if (this.selectedDropdownOptions.length === 0) {
      this.selectedDropdownOptions = [{ id: 0, name: '不拘' }];
    }

    // 有選擇時 移除不拘
    if (
      this.selectedDropdownOptions[0].id === 0 &&
      this.selectedDropdownOptions.length > 1
    ) {
      this.selectedDropdownOptions.splice(0, 1);
    }
  }

  toggleAllOptions(groupById: number) {
    const inputs = this.getGroupByInputs(groupById);

    !inputs.some((input) => input.checked) ||
    inputs.every((input) => input.checked)
      ? inputs.forEach((input) => (input.checked = !input.checked))
      : inputs.forEach((input) => (input.checked = true));

    inputs.slice(1).forEach((input) => this.sendDropdownOptions(input));
  }

  toggleOption(e: Event, id: number) {
    const target = e.target as Element;

    if (target.tagName === 'LABEL') {
      return;
    }

    const input = target.querySelector('input');

    if (
      target.tagName === 'LI' &&
      target.classList.contains('dropdown_option') &&
      input
    ) {
      input.checked = !input.checked;
    }

    if (this.groupNamesPos.length) {
      this.setGroupNameChecked(id);
    }

    this.sendDropdownOptions(input!);
  }

  filterOptions() {
    this.filteredData = this.dropdownData.filter((data) => {
      return (
        data.name.includes(this.searchText) ||
        data.groupName?.includes(this.searchText)
      );
    });

    this.filteredData[0].groupName ? this.setGroupNamesPos() : '';
  }
}
