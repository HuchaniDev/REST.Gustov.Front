import { Directive} from "@angular/core";

@Directive({
  selector: '[app-input]',
  standalone: true,
  host: {
    class: 'w-full h-8 p-2 bg-white border border-gray-300 rounded-md text-[16px] shadow-inner  outline-none placeholder-gray-400 focus:border-orange-400 transition duration-300'
  }
})
export class InputDirective {}
