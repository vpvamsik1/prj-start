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

  let mockIngredients = [
    {
        "amount": 4,
        "name": "Meat"
    },
    {
        "amount": 20,
        "name": "Fries"
    }
  ]

  let recipeSpy = jasmine.createSpyObj('RecipeService',
    ['setRecipes', 'getRecipes', 'getRecipe', 'addRecipe'],
    {recipesChanged: of(mockRecipes), recipes: mockRecipes}
  );

  let mockShoppingListServiceSpy = jasmine.createSpyObj('ShoppingListService',
    ['addIngredients']
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        // RecipeService,
        {provide: RecipeService, useValue: recipeSpy},
        // {provide: ShoppingListService, useValue: mockShoppingListServiceSpy}
      ],
    }).compileComponents();
    service = TestBed.inject(RecipeService);
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });

  it('should set the recipes', () => {
    recipeSpy.setRecipes.and.returnValue(of(mockRecipes));
    service.setRecipes(mockRecipes);
    expect(service.recipes).toBe(mockRecipes);
    service.recipesChanged.subscribe((data) => {
      expect(data[0].description).toBe('This is simply a test');
    });
  });

  it('should slice the copy on getRecipes', () => {
    recipeSpy.getRecipes.and.returnValue(mockRecipes);
    const newRecipes = service.getRecipes();
    expect(newRecipes[0].description).toBe("This is simply a test");
  });

  it('should get the recipe per the index', () => {
    recipeSpy.getRecipe.and.returnValue(mockRecipes[1]);
    const newRecipe = service.getRecipe(1);
    expect(recipeSpy.getRecipe).toHaveBeenCalledWith(1);
  });

  it('should add the recipe', (done) => {

    const newRecipe2 = {
        "description": "ham 2!",
        "imagePath": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Egg_Sandwich.jpg/330px-Egg_Sandwich.jpg",
        "ingredients": [
            {
                "amount": 4,
                "name": "Leaves"
            }
        ],
        "name": "Burger with pig"

    }
    recipeSpy.getRecipes.and.returnValue([...mockRecipes, newRecipe2]);

    service.addRecipe(newRecipe2);
    expect(recipeSpy.addRecipe).toHaveBeenCalledWith(newRecipe2);
    const newRecipeList = service.getRecipes();

    expect(newRecipeList[3].description).toBe("ham 2!");
    // recipeSpy.recipesChanged.and.returnValue(of([...mockRecipes, newRecipe2]));
    // spyOnProperty(recipeSpy, 'recipesChanged', 'get').and.returnValue(of([...mockRecipes, newRecipe2]))
    // spyOn(service.recipesChanged, 'next');
    expect(service.recipesChanged.next).toHaveBeenCalled();
    // service.recipesChanged.subscribe((data) => {
    //   console.log("hello", data[3]);
    //   expect(data[3].description).toBe('ham 2fdbd!');
    //   done();
    // });
  });

});

describe('RecipeServiceForShoppingList', () => {

  let service: RecipeService;

  let mockIngredients = [
    {
        "amount": 4,
        "name": "Meat"
    },
    {
        "amount": 20,
        "name": "Fries"
    }
  ]

  let mockShoppingListServiceSpy = jasmine.createSpyObj('ShoppingListService',
    ['addIngredients']
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        RecipeService,
        // {provide: RecipeService, useValue: recipeSpy},
        {provide: ShoppingListService, useValue: mockShoppingListServiceSpy}
      ],
    }).compileComponents();
    service = TestBed.inject(RecipeService);
  });

  it('should add ingredients to the shopping list', () => {
    service.addIngredientsToShoppingList(mockIngredients);
    expect(mockShoppingListServiceSpy.addIngredients).toHaveBeenCalledWith(mockIngredients);
  });

});


