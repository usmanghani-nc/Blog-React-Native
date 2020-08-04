import createDataContext from './createDataContext'

// Reducers
const blogReducer = (state, action) => {
    switch (action.type) {
        case 'delete_blogpost':
            return state.filter(blogPost => blogPost.id !== action.payload)
        case 'add_blogpost':
            return [
                ...state,
                {
                    id: Math.floor(Math.random() * 9999),
                    title: `Blog post ${state.length + 1}`
                }
            ]
        default:
            return state
    }
}

// actions
const addBlogPost = dispatch => {
    return () => {
        dispatch({ type: 'add_blogpost' })
    }
}

const deletblogPost = dispatch => {
    return (id) => {
        dispatch({ type: 'delete_blogpost', payload: id })
    }
}

export const { Context, Provider } = createDataContext(blogReducer, { addBlogPost, deletblogPost }, [])






// REMIDNER ... //
// import React, { useReducer } from 'react'

// const BlogContext = React.createContext();

// const blogReducer = (state, action) => {
//     switch (action.type) {
//         case 'add_blogpost':
//             return [...state, { title: `Blog post ${state.length + 1}` }]
//         default:
//             return state
//     }
// }

// export const BlogProvider = ({ children }) => {
//     const [blogPosts, dispatch] = useReducer(blogReducer, [])

//     const addBlogPost = () => {
//         dispatch({ type: 'add_blogpost' })
//     }

//     return (
//         <BlogContext.Provider value={{ data: blogPosts, addBlogPost }}>
//             {children}
//         </BlogContext.Provider>
//     )
// }

// export default BlogContext;
