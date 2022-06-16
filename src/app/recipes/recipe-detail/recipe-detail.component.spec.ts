import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute, Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { concatMap } from "rxjs-compat/operator/concatMap";
import { ShoppingListService } from "src/app/shopping-list/shopping-list.service";
import { RecipeService } from "../recipe.service";
import { RecipeDetailComponent } from "./recipe-detail.component";

describe('RecipeDetailComponent', () => {
  let component: RecipeDetailComponent;
  let fixture: ComponentFixture<RecipeDetailComponent>;
  let recipeServiceMock = jasmine.createSpyObj('RecipeService',
    ['getRecipe', 'addIngredientsToShoppingList', 'deleteRecipe']
  );
  const routerMock = {
    navigate: jasmine.createSpy('navigate')
  }

  const mockActivateRoute = {
    params: of({
      id: 3
    })
  }

  const recipeMock = {
      "description": "This is ham",
      "imagePath": "https://upload.wikimedia.org/wikipedia/commons/b/b5/Honey_glazed_ham.jpg",
      "ingredients": [
          {
              "amount": 3,
              "name": "Buns"
          },
          {
              "amount": 2,
              "name": "Meat"
          }
      ],
      "name": "A Test Recipe 2"
    }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        RecipeDetailComponent
      ],
      providers: [
        {provide: RecipeService, useValue: recipeServiceMock},
        ShoppingListService,
        {provide: Router, useValue: routerMock},
        {provide: ActivatedRoute, useValue: mockActivateRoute}
      ],
      imports: [
        RouterTestingModule
      ]
    });
    TestBed.compileComponents();

    fixture = TestBed.createComponent(RecipeDetailComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create the Recipe Detail component', () => {

    expect(component).toBeTruthy();
  });

  it('should read from the route to set up the id and recipe', () => {
    component.ngOnInit();
    recipeServiceMock.getRecipe.and.returnValue(recipeMock);
    fixture.detectChanges();

    expect(component.id).toBe(3);
    expect(recipeServiceMock.getRecipe).toHaveBeenCalledWith(component.id);
    // expect(component.recipe).toBe(recipeMock);
  });

  it('should add to shopping list', () => {
    // recipeServiceMock.getRecipe.and.returnValue(recipeMock);
    // component.ngOnInit();
    // recipeServiceMock.addIngredientsToShoppingList.and.returnValue(recipeMock.ingredients);
    component.recipe = recipeMock;
    component.onAddToShoppingList();
    expect(recipeServiceMock.addIngredientsToShoppingList).toHaveBeenCalledWith(recipeMock.ingredients);
  });

  it('should stay on the same url on edit', () => {
    component.onEditRecipe();
    expect(routerMock.navigate).toHaveBeenCalledWith(['edit'], {relativeTo: mockActivateRoute});
  });

  it('should navigate to recipes and delete recipe on onDeleteRecipe', () => {
    // spyOn(recipeServiceMock, 'deleteRecipe');

    component.onDeleteRecipe();
    expect(recipeServiceMock.deleteRecipe).toHaveBeenCalledWith(component.id);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/recipes']);
  });

});
