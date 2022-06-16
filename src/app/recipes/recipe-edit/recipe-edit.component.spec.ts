import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';

import { RecipeEditComponent } from './recipe-edit.component';

describe('RecipeEditComponent', () => {
  let component: RecipeEditComponent;
  let fixture: ComponentFixture<RecipeEditComponent>;
  let mockActivateRoute = {
    params: of({
      id: 3
    }),
    snapshot: {}
  };
  const recipeMock = {
    "description": "This is ham",
    "imagePath": "https://upload.wikimedia.org/wikipedia/commons/b/b5/Honey_glazed_ham.jpg",
    "ingredients": [
        {
            "name": "Buns",
            "amount": 3,
        },
        {
            "name": "Meat",
            "amount": 2,

        }
    ],
    "name": "A Test Recipe 2"
  }
  let mockRecipeService = jasmine.createSpyObj('RecipeService',
    ['getRecipe', 'updateRecipe', 'addRecipe']
  );

  let mockRouter = jasmine.createSpyObj('Router',
    ['navigate']
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeEditComponent ],
      providers: [
        {provide: RecipeService, useValue: mockRecipeService},
        ShoppingListService,
        { provide: Router, useValue: mockRouter},
        {provide: ActivatedRoute, useValue: mockActivateRoute}
      ],
      imports: [ RouterTestingModule, ReactiveFormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    mockRecipeService.getRecipe.and.returnValue(recipeMock);
    fixture = TestBed.createComponent(RecipeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set editMode to true if params[id] is not null', () => {
    component.ngOnInit();
    expect(component.editMode).toBeTrue();
  });

  it('should call updateRecipe if editMode is true', () => {
    spyOn(component, 'onCancel');
    component.recipeForm = new FormGroup({
      'name': new FormControl("A Test Recipe 2", Validators.required),
      'imagePath': new FormControl("https://upload.wikimedia.org/wikipedia/commons/b/b5/Honey_glazed_ham.jpg", Validators.required),
      'description': new FormControl(recipeMock.description, Validators.required),
      'ingredients': new FormControl([{name: 'Buns', amount: 3}, {name: 'Meat', amount: 2}])
    });
    component.editMode = true;

    component.onSubmit();
    expect(mockRecipeService.updateRecipe).toHaveBeenCalledWith(3, component.recipeForm.value);
    expect(component.onCancel).toHaveBeenCalled();
  });

  it('should call addRecipe if editMode is false', () => {
    spyOn(component, 'onCancel');
    component.recipeForm = new FormGroup({
      'name': new FormControl("A Test Recipe 2", Validators.required),
      'imagePath': new FormControl("https://upload.wikimedia.org/wikipedia/commons/b/b5/Honey_glazed_ham.jpg", Validators.required),
      'description': new FormControl(recipeMock.description, Validators.required),
      'ingredients': new FormControl([{name: 'Buns', amount: 3}, {name: 'Meat', amount: 2}])
    });
    component.editMode = false;

    component.onSubmit();
    expect(mockRecipeService.addRecipe).toHaveBeenCalledWith(component.recipeForm.value);
    expect(component.onCancel).toHaveBeenCalled();
  });

  it('should be called controls for ingredients', () => {

    component.recipeForm = new FormGroup({
      'name': new FormControl("A Test Recipe 2", Validators.required),
      'imagePath': new FormControl("https://upload.wikimedia.org/wikipedia/commons/b/b5/Honey_glazed_ham.jpg", Validators.required),
      'description': new FormControl(recipeMock.description, Validators.required),
      'ingredients': new FormControl([{name: 'Buns', amount: 3}, {name: 'Meat', amount: 2}])
    });
    component.ngOnInit();

    // component.controls;
    const ingredients = component.controls[0].value;
    // console.log("hello", ingredients);
    expect(ingredients.name).toBe("Buns");

  });

  it('should new empty ingredients', () => {
    component.recipeForm = new FormGroup({
      'name': new FormControl("A Test Recipe 2", Validators.required),
      'imagePath': new FormControl("https://upload.wikimedia.org/wikipedia/commons/b/b5/Honey_glazed_ham.jpg", Validators.required),
      'description': new FormControl(recipeMock.description, Validators.required),
      'ingredients': new FormControl([{name: 'Buns', amount: 3}, {name: 'Meat', amount: 2}])
    });

    component.ngOnInit();
    fixture.detectChanges();
    component.onAddIngredient();

    const ingredients = component.controls;
    expect(ingredients.length).toBe(3);

  });

  it('should delete an ingredient from the array', () => {
    component.recipeForm = new FormGroup({
      'name': new FormControl("A Test Recipe 2", Validators.required),
      'imagePath': new FormControl("https://upload.wikimedia.org/wikipedia/commons/b/b5/Honey_glazed_ham.jpg", Validators.required),
      'description': new FormControl(recipeMock.description, Validators.required),
      'ingredients': new FormControl([{name: 'Buns', amount: 3}, {name: 'Meat', amount: 2}])
    });
    component.ngOnInit();
    fixture.detectChanges();

    component.onDeleteIngredient(1);
    const ingredients = component.recipeForm.controls.ingredients.value;
    // console.log("hello", ingredients);
    expect(ingredients.length).toBe(1);

  });

  it('should navigate back to the parent route', () => {
    component.onCancel();
    // console.log("hello", component.route);
    expect(mockRouter.navigate).toHaveBeenCalled();
  });
});
