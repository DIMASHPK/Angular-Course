import {Directive, ElementRef, HostBinding, HostListener, Input} from "@angular/core";

@Directive({
  selector: "[appDropdown]"
})
export class AppDropdownDirective {
  @Input("appDropdown")isOpenInitial = false

  @HostBinding("class.open")isOpen: boolean = this.isOpenInitial

  constructor(private elementRef: ElementRef) {
  }


  @HostListener("document:click", ["$event.target"]) toggleOpen = (target: EventTarget) => {
    this.isOpen = this.elementRef.nativeElement.contains(target) ? !this.isOpen : false
  }
}
