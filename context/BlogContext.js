import createDataContext from './createDataContext'

// Reducers
const blogReducer = (state, action) => {
    switch (action.type) {
        case 'edit_blogpost':
            return state.map(blog => blog.id === action.payload.id ? action.payload : blog)
        case 'delete_blogpost':
            return state.filter(blogPost => blogPost.id !== action.payload)
        case 'add_blogpost':
            const { title, content } = action.payload
            return [
                ...state,
                {
                    id: Math.floor(Math.random() * 9999),
                    title,
                    content
                }
            ]
        default:
            return state
    }
}

// actions
const addBlogPost = dispatch => {
    return (title, content, callback) => {
        dispatch({ type: 'add_blogpost', payload: { title, content } })
        callback && callback();
    }
}

const deletblogPost = dispatch => {
    return (id) => {
        dispatch({ type: 'delete_blogpost', payload: id })
    }
}

const editBlogPost = (dispatch) => {
    return (id, title, content, callback) => {
        dispatch({ type: "edit_blogpost", payload: { id, title, content } })
        callback && callback();
    }
}

export const { Context, Provider } = createDataContext(blogReducer, { addBlogPost, deletblogPost, editBlogPost }, [])






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
