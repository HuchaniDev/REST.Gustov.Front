import { Directive } from '@angular/core';

@Directive({
  selector: '[primary-button]',
  standalone: true,
  host: {
    class:
      'text-sm text-white rounded-[4px] w-20 md:w-28 h-[34px] bg-orange-300 flex justify-center items-center gap-2 hover:bg-orange-500 focus:outline-orange-200 cursor-pointer disabled:bg-gray-200',
  },
})

export class ButtonDirective { }
