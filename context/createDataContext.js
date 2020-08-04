import React, { useReducer, createContext } from 'react'

/* 
 Helper function it will recive 3 props 
 reducer, actions, initailState.
*/

export default (reducer, actions, initailState) => {
    // Create context //
    const Context = createContext();

    /* Making provider that will available 
       to our whole application 
       by retruning children arg 
       this will be like <Provider>{children}</Provider>
       children as a <jsx>...</jsx>
    */
    const Provider = ({ children }) => {
        const [state, dispatch] = useReducer(reducer, initailState);


        // actions === {someActionName : (dispatch) => return () => {...} }
        /*
         This will itrate every eaction we passed on action obj
         and invoke it with our dispatch variable passed in as argument 
         so later it can be avaiable to our actions out side other
         components. if we dont do this step "disptach" will not be 
         be invoke in this block of code.  
        */

        const boundActions = {};

        for (let key in actions) {
            // call func with dispatch arg & store in new obj with same key name 
            // console.log(key, "retrun keys")

            boundActions[key] = actions[key](dispatch);
        }

        // console.log({ ...boundActions }, actions)
        // ex :boundActions = { addBlogPost , deletblogPost }

        return (
            <Context.Provider value={{ state, ...boundActions }}>
                {children}
            </Context.Provider>
        )
    }


    return { Context, Provider }
}


