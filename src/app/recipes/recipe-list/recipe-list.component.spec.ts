import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute, Router } from "@angular/router";
import { of } from "rxjs";
import { RecipeService } from "../recipe.service";
import { RecipeListComponent } from "./recipe-list.component"

describe('RecipeListComponent', () => {
  let component: RecipeListComponent;
  let fixture: ComponentFixture<RecipeListComponent>;



  let mockRouter = jasmine.createSpyObj('Router',
    ['navigate']
  );



  let mockRecipes = [
    {
        "description": "This is simply a test",
        "imagePath": "https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg",
        "ingredients": [
            {
                "amount": 4,
                "name": "Meat"
            },
            {
                "amount": 20,
                "name": "Fries"
            }
        ],
        "name": "A Test Recipe hello"
    },
    {
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
    },
    {
        "description": "Fishy!",
        "imagePath": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Egg_Sandwich.jpg/330px-Egg_Sandwich.jpg",
        "ingredients": [
            {
                "amount": 1,
                "name": "Oil"
            }
        ],
        "name": "Another one"
    }
  ]

  let mockRecipeService = jasmine.createSpyObj('RecipeService',
    ['getRecipes'],
    {
      'recipesChanged': of(mockRecipes),
    }
  );

  const fakeActivatedRoute = {
    snapshot: {  }
  } as ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeListComponent],
      providers: [
        { provide: RecipeService, useValue: mockRecipeService},
        { provide: Router, useValue: mockRouter},
        {provide: ActivatedRoute, useValue: fakeActivatedRoute}
      ]
    })
    .compileComponents();

  });

  beforeEach(() => {
    // mockRecipeService.recipesChanged.and.returnValue(of(mockRecipes));
    // (mockRecipeService as any).recipesChanged = of(mockRecipes); this also worked
    // Object.getOwnPropertyDescriptor(mockRecipeService, "recipesChanged").get.and.returnValue(of(mockRecipes));
    // spyOnProperty(mockRecipeService, 'recipesChanged', 'get').and.returnValue(of(mockRecipes));
    // mockRecipeService.recipesChanged.get.and.returnValue(of(mockRecipes));
    fixture = TestBed.createComponent(RecipeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the recipe on init', () => {
    mockRecipeService.getRecipes.and.returnValue(mockRecipes);
    component.ngOnInit();
    // console.log("data", component.recipes);
    expect(component.recipes).toBe(mockRecipes);
  });

  it('should navigate to new upon newRecipe click', () => {
    component.onNewRecipe();

    expect(mockRouter.navigate).toHaveBeenCalledWith([ 'new' ], Object({ relativeTo: Object({ snapshot: Object({  }) }) }));
  });

  it('should unsubscribe from the subscription upon leaving component', () => {
    spyOn(component.subscription, 'unsubscribe');

    component.ngOnDestroy();

    expect(component.subscription.unsubscribe).toHaveBeenCalled();
  });
})
