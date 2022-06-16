import { TestBed } from "@angular/core/testing";
import { of, Subject } from "rxjs";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service"

// class mockRecipeService {
//   recipesChanged = new Subject<Recipe[]>();

//   private recipes: Recipe[] = [];

//   setRecipes(recipes: Recipe[]) {
//     this.recipes = recipes;
//     this.recipesChanged.next(this.recipes.slice());
//   }

//   getRecipes() {
//     return this.recipes.slice();
//   }
// }

fdescribe('RecipeService', () => {

  let service: RecipeService;


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

  const recipeSpy = jasmine.createSpyObj('RecipeService',
    ['setRecipes', 'getRecipes'],
    {recipesChanged: of(mockRecipes), recipes: mockRecipes}
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ShoppingListService,
        {provide: RecipeService, useValue: recipeSpy}
      ],
    }).compileComponents();
    service = TestBed.inject(RecipeService);
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });

  it('should set the recipes', () => {
    recipeSpy.setRecipes.and.returnValue(of(mockRecipes));
    service.recipesChanged.subscribe((data) => {
      // console.log("data20022", data);
      expect(data[0].description).toBe('This is simply a test');
    });
    // service.setRecipes(mockRecipes);

  });

  it('should slice the copy on getRecipes', () => {
    // service.recipes = mockRecipes
    recipeSpy.setRecipes.and.returnValue(of(mockRecipes));
    const recipe = service.getRecipes();
    console.log("hi", recipe);
    expect(recipe[0].description).toBe('This is simply a test');
  });
})
