import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  signal,
  computed,
  HostListener,
  ElementRef,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '../../icon/icon.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';

export interface SelectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'form-select',
  standalone: true,
  template: `
    <div class="space-y-3 relative" [formGroup]="form" style="z-index: 1;">
      <fieldset class="fieldset">
        <legend class="fieldset-legend">
          <app-icon [name]="iconName" [size]="iconSize" />
          {{ label }} <span class="text-error">{{ isRequired ? '*' : '' }}</span>
        </legend>
        <!-- change popover-1 and --anchor-1 names. Use unique names for each dropdown -->
        <button
          type="button"
          class="{{ getInputClasses() }}"
          [attr.popovertarget]="popoverId"
          [style.anchor-name]="'--' + popoverId"
          (click)="toggleDropdown()"
        >
          <span [class.italic]="!hasValue()" class="flex-1 text-left">
            {{ getDisplayValue() }}
          </span>
        </button>

        @if (isOpen()) {
        <div
          class="dropdown menu rounded-box bg-base-100 shadow-xl border border-base-300 fixed p-1"
          [id]="popoverId"
          [style.z-index]="99999"
          [style.top.px]="getDropdownTop()"
          [style.left.px]="getDropdownLeft()"
          [style.width.px]="getDropdownWidth()"
        >
          <!-- Input de búsqueda -->
          <div class="p-2">
            <input
              type="text"
              class="input input-sm w-full px-4"
              placeholder="Buscar..."
              [value]="searchTerm()"
              (input)="onSearchChange($event)"
              (keydown)="onKeyDown($event)"
              #searchInput
            />
          </div>

          <!-- Lista de opciones filtradas -->
          <div class="max-h-[99px] overflow-y-auto">
            @if (filteredOptions().length > 0) { @for( option of filteredOptions(); track
            option.value ){
            <li>
              <a
                (click)="selectOption(option)"
                [class.active]="highlightedIndex() === $index"
                class="cursor-pointer hover:bg-base-200 px-6 {{
                  option.value === selectedValue
                    ? 'bg-base-content text-primary-content'
                    : 'hover:bg-base-200'
                }}"
              >
                {{ option.label }}
              </a>
            </li>
            } } @else {
            <li class="p-2 text-base-content/60 text-sm">No se encontraron resultados</li>
            }
          </div>
        </div>
        }

        <!-- Campo oculto para el formulario reactivo -->
        <input type="hidden" [formControlName]="fieldName" [value]="selectedValue" />
        <app-error-message [form]="form" [fieldName]="fieldName" [formUtils]="formUtils" />
      </fieldset>
    </div>
  `,
  imports: [ReactiveFormsModule, IconComponent, ErrorMessageComponent],
})
export class FormSelectComponent implements OnInit, OnDestroy {
  @Input() form!: FormGroup;
  @Input() fieldName!: string;
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() options: SelectOption[] = [];
  @Input() iconName!: string;
  @Input() iconSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | string = 'md';
  @Input() formUtils: any;
  @Input() isRequired: boolean = false;
  @Input() popoverId: string = 'popover-default';
  @Input() enableFilter: boolean = true;

  constructor(private elementRef: ElementRef) {}

  // Signals para el estado reactivo (Angular 20)
  isOpen = signal(false);
  searchTerm = signal('');
  highlightedIndex = signal(-1);

  // Computed para opciones filtradas
  filteredOptions = computed(() => {
    if (!this.enableFilter || !this.searchTerm()) {
      return this.options;
    }

    const term = this.searchTerm().toLowerCase().trim();
    return this.options.filter(
      (option) =>
        option.label.toLowerCase().includes(term) || option.value.toLowerCase().includes(term)
    );
  });

  selectedValue: string = '';
  private valueSubscription: any;
  private buttonElement: HTMLElement | null = null;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (this.isOpen() && !this.elementRef.nativeElement.contains(event.target)) {
      this.closeDropdown();
    }
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    // Cerrar el dropdown al hacer scroll para evitar problemas de posicionamiento
    if (this.isOpen()) {
      this.closeDropdown();
    }
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    // Cerrar el dropdown al redimensionar para evitar problemas de posicionamiento
    if (this.isOpen()) {
      this.closeDropdown();
    }
  }

  ngOnInit(): void {
    this.initializeSelectedValue();
    this.subscribeToFormValue();
    // Obtener referencia al botón
    this.buttonElement = this.elementRef.nativeElement.querySelector('button');
  }

  ngOnDestroy(): void {
    if (this.valueSubscription) {
      this.valueSubscription.unsubscribe();
    }
  }

  private initializeSelectedValue(): void {
    const controlValue = this.form.get(this.fieldName)?.value;
    if (controlValue) {
      this.selectedValue = controlValue;
    }
  }

  private subscribeToFormValue(): void {
    this.valueSubscription = this.form.get(this.fieldName)?.valueChanges.subscribe((value) => {
      this.selectedValue = value || '';
    });
  }

  hasValue(): boolean {
    const control = this.form.get(this.fieldName);
    return control ? control.value && control.value.toString().trim() !== '' : false;
  }

  getDisplayValue(): string {
    if (!this.selectedValue) {
      return this.placeholder;
    }

    const selectedOption = this.options.find((opt) => opt.value === this.selectedValue);
    return selectedOption ? selectedOption.label : this.placeholder;
  }

  selectOption(option: SelectOption): void {
    this.selectedValue = option.value;
    this.form.get(this.fieldName)?.setValue(option.value);
    this.closeDropdown();
  }

  // Métodos para calcular posición del dropdown
  getDropdownTop(): number {
    if (!this.buttonElement) return 0;
    const rect = this.buttonElement.getBoundingClientRect();
    return rect.bottom + 2; // 2px de margen debajo del botón
  }

  getDropdownLeft(): number {
    if (!this.buttonElement) return 0;
    const rect = this.buttonElement.getBoundingClientRect();
    return rect.left;
  }

  getDropdownWidth(): number {
    if (!this.buttonElement) return 208; // w-52 = 208px como fallback
    const rect = this.buttonElement.getBoundingClientRect();
    return rect.width;
  }

  // Métodos para controlar el dropdown
  toggleDropdown(): void {
    this.isOpen.update((open) => !open);
    if (this.isOpen()) {
      this.highlightedIndex.set(-1);
      // Asegurar que el botón esté disponible
      if (!this.buttonElement) {
        this.buttonElement = this.elementRef.nativeElement.querySelector('button');
      }
      // Focus en el input de búsqueda después de que se abra
      setTimeout(() => {
        const searchInput = document.querySelector(`#${this.popoverId} input`) as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      }, 0);
    } else {
      this.searchTerm.set('');
    }
  }

  closeDropdown(): void {
    this.isOpen.set(false);
    this.searchTerm.set('');
    this.highlightedIndex.set(-1);
  }

  // Métodos para el filtro
  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm.set(target.value);
    this.highlightedIndex.set(-1);
  }

  // Navegación por teclado
  onKeyDown(event: KeyboardEvent): void {
    const filteredOptions = this.filteredOptions();

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.highlightedIndex.update((index) =>
          index < filteredOptions.length - 1 ? index + 1 : 0
        );
        break;

      case 'ArrowUp':
        event.preventDefault();
        this.highlightedIndex.update((index) =>
          index > 0 ? index - 1 : filteredOptions.length - 1
        );
        break;

      case 'Enter':
        event.preventDefault();
        const highlightedIndex = this.highlightedIndex();
        if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
          this.selectOption(filteredOptions[highlightedIndex]);
        }
        break;

      case 'Escape':
        event.preventDefault();
        this.closeDropdown();
        break;
    }
  }

  getInputClasses(): string {
    const baseClasses =
      'select select-bordered w-full focus:border-primary focus:ring-4 focus:ring-primary/20 cursor-pointer focus:bg-base-100 focus-within:bg-base-100';

    if (this.hasValue()) {
      return `${baseClasses} bg-base-300/40 border-base-300`;
    }

    return `${baseClasses} bg-base-300/20 border-base-300/70 placeholder-base-content/25`;
  }
}
