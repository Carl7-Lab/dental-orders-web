import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICONS } from '../../constants/icons.constant';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="getIconConfig().div.class">
      <svg
        [class]="getIconConfig().svg.class"
        [attr.fill]="getIconConfig().svg.fill"
        [attr.stroke]="getIconConfig().svg.stroke"
        [attr.viewBox]="getIconConfig().svg.viewBox"
      >
        @if (hasCircle()) {
        <circle
          [class]="getCircleConfig()?.class || ''"
          [attr.cx]="getCircleConfig()?.cx || ''"
          [attr.cy]="getCircleConfig()?.cy || ''"
          [attr.r]="getCircleConfig()?.r || ''"
          [attr.stroke]="getCircleConfig()?.stroke || ''"
          [attr.stroke-width]="getCircleConfig()?.strokeWidth || ''"
        ></circle>
        }
        <path
          [attr.stroke-linecap]="getPathConfig()?.strokeLinecap || ''"
          [attr.stroke-linejoin]="getPathConfig()?.strokeLinejoin || ''"
          [attr.stroke-width]="getPathConfig()?.strokeWidth || ''"
          [attr.fill-rule]="getPathConfig()?.fillRule || ''"
          [attr.clip-rule]="getPathConfig()?.clipRule || ''"
          [attr.d]="getPathConfig()?.d || ''"
        ></path>
      </svg>
    </div>
  `,
  styles: [],
})
export class IconComponent {
  name = input.required<string>();
  customClasses = input<string>('');
  size = input<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | string>('md');

  getIconConfig() {
    const iconName = this.name().toUpperCase() as keyof typeof ICONS;
    const icon = ICONS[iconName];

    if (!icon) {
      console.warn(`Icon "${this.name()}" not found`);
      return {
        div: { class: '' },
        svg: { class: '', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
      };
    }

    const sizeClasses = this.getSizeClasses();

    if (this.customClasses()) {
      return {
        ...icon,
        svg: {
          ...icon.svg,
          class: `${icon.svg.class} ${sizeClasses} ${this.customClasses()}`.trim(),
        },
      };
    }

    return {
      ...icon,
      svg: {
        ...icon.svg,
        class: `${icon.svg.class} ${sizeClasses}`.trim(),
      },
    };
  }

  getSizeClasses(): string {
    const size = this.size();

    if (!size) return '';

    // Tamaños predefinidos
    const sizeMap: Record<string, string> = {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
      xl: 'w-8 h-8',
      '2xl': 'w-10 h-10',
      '3xl': 'w-12 h-12',
    };

    if (sizeMap[size]) {
      return sizeMap[size];
    }

    return size;
  }

  hasCircle() {
    const iconName = this.name().toUpperCase() as keyof typeof ICONS;
    const icon = ICONS[iconName];
    return icon && 'circle' in icon;
  }

  getCircleConfig(): any {
    const iconName = this.name().toUpperCase() as keyof typeof ICONS;
    const icon = ICONS[iconName];
    return icon && 'circle' in icon ? icon.circle : null;
  }

  getPathConfig(): any {
    const iconName = this.name().toUpperCase() as keyof typeof ICONS;
    const icon = ICONS[iconName];
    return icon && 'path' in icon ? icon.path : null;
  }
}
