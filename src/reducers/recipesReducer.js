const SET_RECIPES = 'SET_RECIPES'
const ADD_LOCAL_RECIPES = 'ADD_LOCAL_RECIPES'
const REMOVE_LOCAL_RECIPES = 'REMOVE_LOCAL_RECIPES'
const SET_LOCAL_RECIPES = 'SET_LOCAL_RECIPES'
const CHANGE_BOOKMARK = 'CHANGE_BOOKMARK'
const IS_FETCHING = 'IS_FETCHING'
const SET_FORM_DATA = 'SET_FORM_DATA'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_PORTION_NUMBER = 'SET_PORTION_NUMBER'
const PAGE_SIZE = 'PAGE_SIZE'
const REQUEST_ERR = 'REQUEST_ERR'
const WRONG_SEARCH = 'WRONG_SEARCH'

export const initialState = {
    recipes : [],
    localRecipes : [],
    isFetching : false,
    formData : {
        searchQuery : 'tomato',
        diet : '',
        caloriesRange : {min : 50, max : 1500},
        ingredientsCounts : 50,
    },
    currentPage : 1,
    pageSize : 10,
    requestErr : '',
    wrongSearch : '',
    portionNumber : 1
}

export function ReciperReducer (state = initialState, action) {
    switch(action.type) {
        case SET_RECIPES :
            return {
                ...state,
                recipes : action.recipes
            }
        case ADD_LOCAL_RECIPES :
            return {
                ...state,
                recipes : state.recipes.map(res =>  {
                    if(res.recipe.label === action.label) return {...res, bookmarked : true}
                    return res;
                }),
                localRecipes : [...state.localRecipes, {...action.recipe, bookmarked : true}]

            }
        case REMOVE_LOCAL_RECIPES :
            return {
                ...state,
                recipes : state.recipes.map(res =>  {
                    if(res.recipe.label === action.label) return {...res, bookmarked : false}
                    return res;
                }),
                localRecipes : state.localRecipes.filter(res => res.recipe.label !== action.label)
            }
        case SET_LOCAL_RECIPES :
            return {
                ...state,
                recipes : state.recipes.map(({recipe, bookmarked, ...rest}) => ({
                    recipe,
                    ...rest,
                    bookmarked : action.recipe
                    .find(({recipe : {label}}) => label === recipe.label) ? true : false
                })),
                localRecipes : action.recipe
            }
        case IS_FETCHING :        
            return {
                ...state,
                isFetching : action.isFetching
            }
        case SET_FORM_DATA :
            return {
                ...state,
                formData : {...action.formData}
            }    
            
        case SET_CURRENT_PAGE : 
            return {
                ...state,
                currentPage : action.currentPage
            } 
        case PAGE_SIZE : 
            return {
                ...state,
                pageSize : action.pageSize
            }        
        case REQUEST_ERR : 
            return {
                ...state,
                requestErr : action.requestErr
            }     
        case WRONG_SEARCH : 
            return {
                ...state,
                wrongSearch : action.wrongSearch
            }    
        case SET_PORTION_NUMBER : 
            return {
                ...state,
                portionNumber : action.portionNumber
            }    
        default:
            return {...state}     
    }
}

export const setRecipes = (recipes) => ({type : SET_RECIPES, recipes})
export const addLocalRecipes = (recipe, label) => ({type : ADD_LOCAL_RECIPES, recipe, label})
export const removeLocalRecipes = (recipe, label) => ({type : REMOVE_LOCAL_RECIPES, recipe, label})
export const setLocalRecipes = (recipe) => ({type : SET_LOCAL_RECIPES, recipe})
export const isFetching = (isFetching) => ({type : IS_FETCHING, isFetching})
export const setFormData = (formData) => ({type : SET_FORM_DATA, formData})
export const setCurrentPage = (currentPage) => ({type : SET_CURRENT_PAGE, currentPage})
export const pageSize = (pageSize) => ({type : PAGE_SIZE, pageSize})
export const requestErr = (requestErr) => ({type : REQUEST_ERR, requestErr})
export const wrongSearch = (wrongSearch) => ({type : WRONG_SEARCH, wrongSearch})
export const changeBookmark = (label) => ({type : CHANGE_BOOKMARK, label})
export const setPortionNumber = (portionNumber) => ({type : SET_PORTION_NUMBER, portionNumber})
