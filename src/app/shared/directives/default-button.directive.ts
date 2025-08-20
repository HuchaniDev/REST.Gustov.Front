import { Directive } from '@angular/core';

@Directive({
  selector: '[default-button]',
  standalone: true,
  host: {
    class:
      'text-sm text-black rounded-[4px] w-16 md:w-28 h-[34px] px-1 border-[1px] flex justify-center items-center gap-2 hover:bg-gray-50 focus:outline-gray-200 cursor-pointer',
  },
})

export class DefaultButtonDirective { }