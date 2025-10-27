# Guía para Construcción de Módulos CRUD

Esta guía te ayudará a construir módulos CRUD completos siguiendo el patrón establecido en el módulo de `patients`. Cada módulo incluye páginas de lista, creación y actualización.

## 📋 Información Mínima Requerida

Para construir un módulo CRUD necesitas proporcionar la siguiente información:

### 1. **Entidad Principal**

- **Nombre de la entidad** (ej: `Patient`, `User`, `Product`)
- **Campos de la entidad** con sus tipos y validaciones
- **Campos requeridos** vs opcionales
- **Relaciones** con otras entidades (si las hay)

### 2. **Estructura de Datos**

```typescript
// Ejemplo basado en Patient
interface EntityName {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  notes?: string;
}
```

### 3. **Endpoints de API**

- **GET** `/entities` - Listar con paginación
- **GET** `/entities/:id` - Obtener por ID
- **POST** `/entities` - Crear nuevo
- **PATCH** `/entities/:id` - Actualizar existente

### 4. **Rutas de Navegación**

- **Lista**: `/authenticated/entities`
- **Crear**: `/authenticated/entities/create`
- **Actualizar**: `/authenticated/entities/update/:id`

## 🏗️ Estructura del Módulo

Cada módulo debe seguir esta estructura de carpetas:

```
src/app/private/[module-name]/
├── components/
│   └── form-[module-name]/
│       ├── form-[module-name].ts
│       ├── form-[module-name].html
│       └── form-[module-name].service.ts
├── interfaces/
│   └── [module-name].interface.ts
├── pages/
│   ├── [module-name]-list/
│   │   ├── [module-name]-page.ts
│   │   └── [module-name]-page.html
│   ├── [module-name]-create/
│   │   ├── [module-name]-create.ts
│   │   └── [module-name]-create.html
│   └── [module-name]-update/
│       ├── [module-name]-update.ts
│       └── [module-name]-update.html
└── services/
    └── [module-name].service.ts
```

## 📝 Archivos Necesarios

### 1. **Interface** (`interfaces/[module-name].interface.ts`)

```typescript
import {
  PaginatedResponse,
  PaginationParams,
} from '../../../shared/interfaces/pagination.interface';

export interface EntityName {
  id: number;
  // ... otros campos
}

export interface EntityNameFilterParams extends PaginationParams {}

export type EntityNameListResponse = PaginatedResponse<EntityName>;
```

### 2. **Servicio** (`services/[module-name].service.ts`)

```typescript
@Injectable({ providedIn: 'root' })
export class EntityNameService {
  private http = inject(HttpClient);
  private urlHelper = inject(UrlHelperService);

  private entitiesCache = new Map<string, EntityNameListResponse>();
  private entityCache = new Map<string, EntityName>();

  getEntities(params: EntityNameFilterParams): Observable<EntityNameListResponse> {
    // Implementación con cache
  }

  getEntity(id: number): Observable<EntityName> {
    // Implementación con cache
  }

  createEntity(entity: EntityName): Observable<EntityName> {
    // Implementación con limpieza de cache
  }

  updateEntity(id: number, entity: EntityName): Observable<EntityName> {
    // Implementación con limpieza de cache
  }
}
```

### 3. **Formulario** (`components/form-[module-name]/form-[module-name].ts`)

```typescript
@Component({
  selector: 'form-[module-name]',
  imports: [
    /* componentes necesarios */
  ],
  templateUrl: './form-[module-name].html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FormEntityNameComponent {
  form = input.required<FormGroup>();
  pageTitle = input.required<string>();
  pageSubtitle = input.required<string>();
  submitButtonText = input.required<string>();
  cancelRoute = input.required<string>();
  isSubmitBlocked = input<boolean>(false);

  formSubmit = output<void>();
  formUtils = FormUtils;

  onSubmit() {
    if (this.isSubmitBlocked()) return;
    this.formSubmit.emit();
  }
}
```

### 4. **Servicio del Formulario** (`components/form-[module-name]/form-[module-name].service.ts`)

```typescript
@Injectable({ providedIn: 'root' })
export class FormEntityNameService {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  createForm(isCreate: boolean = true): FormGroup {
    const formConfig = {
      // Configuración de campos con validaciones
    };
    return this.formBuilder.group(formConfig);
  }

  patchFormWithEntity(form: FormGroup, entity: EntityName): void {
    // Llenar formulario con datos existentes
  }
}
```

### 5. **Página de Lista** (`pages/[module-name]-list/[module-name]-page.ts`)

```typescript
@Component({
  selector: '[module-name]-page',
  imports: [
    /* componentes necesarios */
  ],
  templateUrl: './[module-name]-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class EntityNamePage {
  private entityService = inject(EntityNameService);
  private paginationService = inject(PaginationService);
  private router = inject(Router);

  fullNavigationPaths = FULL_NAVIGATION_PATHS;
  tableHeads = signal<string[]>(['Columna 1', 'Columna 2', 'Acciones']);

  entitiesResource = rxResource({
    params: () => ({
      page: this.paginationService.currentPage(),
      limit: this.paginationService.itemsPerPage(),
    }),
    stream: () =>
      this.entityService.getEntities({
        page: this.paginationService.currentPage(),
        limit: this.paginationService.itemsPerPage(),
      }),
  });

  navigateToEntityCreate(): void {
    this.router.navigate([this.entityCreatePath]);
  }
}
```

### 6. **Página de Crear** (`pages/[module-name]-create/[module-name]-create.ts`)

```typescript
@Component({
  selector: 'create-[module-name]',
  imports: [FormEntityNameComponent, ConfirmationModalComponent, CommonModule],
  templateUrl: './[module-name]-create.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateEntityName {
  private entityService = inject(EntityNameService);
  private formEntityService = inject(FormEntityNameService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  fullNavigationPaths = FULL_NAVIGATION_PATHS;
  entitiesListPath = FULL_NAVIGATION_PATHS.ENTITIES_LIST;

  form = this.formEntityService.createForm();
  showConfirmationModal = signal(false);

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toastService.error('Por favor, completa todos los campos requeridos');
      return;
    }
    this.showConfirmationModal.set(true);
  }

  onConfirmCreate() {
    this.showConfirmationModal.set(false);
    const entityData = this.form.value;

    this.entityService.createEntity(entityData).subscribe({
      next: (entity) => {
        this.toastService.success('Entidad creada exitosamente');
        this.router.navigate([this.entitiesListPath]);
      },
      error: (error) => {
        console.error('Error creating entity:', error);
        this.toastService.error('Error al crear la entidad. Por favor, intenta nuevamente');
      },
    });
  }
}
```

### 7. **Página de Actualizar** (`pages/[module-name]-update/[module-name]-update.ts`)

```typescript
@Component({
  selector: 'update-[module-name]',
  imports: [FormEntityNameComponent, ConfirmationModalComponent, CommonModule],
  templateUrl: './[module-name]-update.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateEntityName {
  private entityService = inject(EntityNameService);
  private formEntityService = inject(FormEntityNameService);
  private toastService = inject(ToastService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  fullNavigationPaths = FULL_NAVIGATION_PATHS;
  entitiesListPath = FULL_NAVIGATION_PATHS.ENTITIES_LIST;

  entityId = toSignal(this.route.params.pipe(map((params) => params['entityId'])));

  form = this.formEntityService.createForm(false);
  showConfirmationModal = signal(false);

  entityResource = rxResource({
    stream: () =>
      this.entityService.getEntity(parseInt(this.entityId())).pipe(
        tap((entity: EntityName) => {
          this.formEntityService.patchFormWithEntity(this.form, entity);
        })
      ),
  });

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toastService.error('Por favor, completa todos los campos requeridos');
      return;
    }
    this.showConfirmationModal.set(true);
  }

  onConfirmUpdate() {
    this.showConfirmationModal.set(false);
    const entityData = this.form.value;
    const entityId = parseInt(this.entityId());

    this.entityService.updateEntity(entityId, entityData).subscribe({
      next: (entity) => {
        this.toastService.success('Entidad actualizada exitosamente');
        this.router.navigate([this.fullNavigationPaths.ENTITIES_LIST]);
      },
      error: (error) => {
        console.error('Error updating entity:', error);
        this.toastService.error('Error al actualizar la entidad. Por favor, intenta nuevamente');
      },
    });
  }
}
```

## 🎨 Templates HTML

### Lista de Entidades

```html
<div class="max-w-7xl mx-auto">
  <!-- Header -->
  <page-header title="Entidades" subtitle="Gestiona tus entidades" iconName="ICON_NAME" />

  <!-- Botón de crear -->
  <div class="flex justify-end mb-4">
    <button class="btn btn-primary btn-lg" [routerLink]="[fullNavigationPaths.ENTITIES_CREATE]">
      <app-icon name="PLUS" size="md"></app-icon>
      <span>Agregar Entidad</span>
    </button>
  </div>

  <!-- Estados de carga, error y vacío -->
  @if (entitiesResource.isLoading()) {
  <app-loading-state message="Cargando entidades..." />
  } @if (entitiesResource.error()) {
  <app-error-state
    title="Error al cargar las entidades"
    message="Por favor, intenta nuevamente más tarde"
  />
  }

  <!-- Lista de entidades -->
  @if (entitiesResource.value(); as response) { @if (response.data.length === 0) {
  <app-empty-state
    iconName="ICON_NAME"
    title="No hay entidades"
    message="Comienza agregando tu primera entidad"
  />
  } @else { @if (response.pagination.totalPages > 1) {
  <app-pagination
    [currentPage]="response.pagination.page"
    [totalPages]="response.pagination.totalPages"
    [total]="response.pagination.total"
    [limit]="response.pagination.limit"
  />
  }

  <!-- Tabla de entidades -->
  <div class="card bg-base-100 shadow-sm border border-base-300">
    <!-- Tabla para desktop -->
    <div class="hidden lg:block overflow-x-auto">
      <table class="table table-zebra">
        <thead>
          <tr>
            @for (head of tableHeads(); track head) {
            <th class="text-base-content/70">{{ head }}</th>
            }
            <th class="text-base-content/70">Acciones</th>
          </tr>
        </thead>
        <tbody>
          @for (entity of response.data; track entity.id) {
          <tr>
            <!-- Campos de la entidad -->
            <td class="text-right">
              <button [routerLink]="[entityUpdatePath, entity.id]" class="btn btn-ghost btn-sm">
                <app-icon name="edit" size="sm" />
              </button>
            </td>
          </tr>
          }
        </tbody>
      </table>
    </div>

    <!-- Cards para mobile -->
    <div class="lg:hidden">
      @for (entity of response.data; track entity.id) {
      <div class="border-b border-base-300 p-3 sm:p-4">
        <!-- Información de la entidad -->
        <button [routerLink]="[entityUpdatePath, entity.id]" class="btn btn-ghost btn-sm">
          <app-icon name="edit" size="sm" />
        </button>
      </div>
      }
    </div>
  </div>
  } }
</div>
```

### Formulario de Entidad

```html
<div class="container mx-auto max-w-4xl">
  <page-header [title]="pageTitle()" [subtitle]="pageSubtitle()" iconName="ICON_NAME" />

  <div class="bg-base-100 rounded-3xl shadow-2xl border border-base-300 overflow-hidden">
    <form-header title="Formulario de Entidad" iconName="EDIT" />

    <form [formGroup]="form()" (ngSubmit)="onSubmit()" class="space-y-6 p-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-0">
        <!-- Campos del formulario -->
        <form-text
          [form]="form()"
          fieldName="fieldName"
          label="Label del Campo"
          placeholder="Placeholder del campo"
          inputType="text"
          iconName="ICON_NAME"
          [formUtils]="formUtils"
          [isRequired]="true"
        />
      </div>

      <form-actions
        [cancelRoute]="cancelRoute()"
        [submitText]="submitButtonText()"
        [isLoading]="isSubmitBlocked()"
        (onSubmit)="onSubmit()"
        [isSubmitDisabled]="isSubmitBlocked() || form().invalid"
      />
    </form>
  </div>
</div>
```

## 🎨 Iconos

### Verificación y Adición de Iconos

Antes de usar cualquier icono en tu módulo, debes verificar que existe en `src/app/shared/constants/icons.constant.ts`. Si el icono no existe, debes agregarlo siguiendo este patrón:

```typescript
ICON_NAME: {
  div: {
    class: '',
  },
  svg: {
    class: 'w-4 h-4 text-primary',
    fill: 'none',
    stroke: 'currentColor',
    viewBox: '0 0 24 24',
  },
  path: {
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth: '2',
    d: 'M...', // SVG path data
  },
},
```

### Iconos Disponibles para Módulos CRUD

- **EDIT**: Para botones de edición
- **PLUS**: Para botones de agregar
- **TAG**: Para campos de formulario
- **USER**: Para módulos de usuarios
- **DOCUMENT**: Para documentos
- **CALENDAR**: Para fechas

## 🔧 Configuración Adicional

### 1. **Rutas en `navigation-path.ts`**

```typescript
export const NAVIGATION_PATHS = {
  ENTITIES: 'entities',
  ENTITIES_CREATE: 'create',
  ENTITIES_UPDATE: 'update/:entityId',
};

export const FULL_NAVIGATION_PATHS = {
  ENTITIES_LIST: `/${NAVIGATION_PATHS.AUTHENTICATED}/${NAVIGATION_PATHS.ENTITIES}`,
  ENTITIES_CREATE: `/${NAVIGATION_PATHS.AUTHENTICATED}/${NAVIGATION_PATHS.ENTITIES}/${NAVIGATION_PATHS.ENTITIES_CREATE}`,
  ENTITIES_UPDATE: `/${NAVIGATION_PATHS.AUTHENTICATED}/${
    NAVIGATION_PATHS.ENTITIES
  }/${NAVIGATION_PATHS.ENTITIES_UPDATE.replace(':entityId', '')}`,
};
```

### 2. **Rutas en `private.routes.ts`**

```typescript
{
  path: NAVIGATION_PATHS.ENTITIES,
  loadComponent: () => import('./entities/pages/entities-list/entities-page').then(m => m.default)
},
{
  path: NAVIGATION_PATHS.ENTITIES_CREATE,
  loadComponent: () => import('./entities/pages/entity-create/entity-create').then(m => m.CreateEntity)
},
{
  path: NAVIGATION_PATHS.ENTITIES_UPDATE,
  loadComponent: () => import('./entities/pages/entity-update/entity-update').then(m => m.UpdateEntity)
}
```

## 📋 Checklist de Implementación

- [ ] **Interface** con campos y tipos definidos
- [ ] **Servicio** con métodos CRUD y cache
- [ ] **Formulario** reutilizable con validaciones
- [ ] **Servicio del formulario** para manejo de datos
- [ ] **Página de lista** con tabla responsive y paginación
- [ ] **Página de crear** con formulario y confirmación
- [ ] **Página de actualizar** con carga de datos existentes
- [ ] **Rutas** configuradas en navigation-path y routing
- [ ] **Estados de carga, error y vacío** implementados
- [ ] **Validaciones** de formulario configuradas
- [ ] **Manejo de errores** y mensajes de toast
- [ ] **Navegación** entre páginas funcional

## 🎯 Ejemplo de Uso

Para crear un módulo de "Products", necesitarías:

1. **Entidad**: `Product` con campos como `name`, `price`, `description`, `category`
2. **Endpoints**: `/products` (GET, POST), `/products/:id` (GET, PATCH)
3. **Rutas**: `/authenticated/products`, `/authenticated/products/create`, `/authenticated/products/update/:id`
4. **Campos del formulario**: name (required), price (required), description, category
5. **Tabla**: mostrar name, price, category con acciones de editar

Siguiendo esta guía, podrás construir cualquier módulo CRUD de manera consistente y escalable.
