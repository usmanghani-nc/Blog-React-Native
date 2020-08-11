import createDataContext from './createDataContext'
import jsonServer from '../src/api/jsonServer'

// Reducers
const blogReducer = (state, action) => {
    switch (action.type) {
        case "get_blogposts":
            return action.payload
        case 'edit_blogpost':
            return state.map(blog => blog.id === action.payload.id ? action.payload : blog)
        case 'delete_blogpost':
            return state.filter(blogPost => blogPost.id !== action.payload)
        default:
            return state
    }
}

// actions
const getBlogPosts = dispatch => {
    return async () => {
        const response = await jsonServer.get('/blogposts')
        dispatch({ type: "get_blogposts", payload: response.data })
    }
}

const addBlogPost = dispatch => {
    return async (title, content, callback) => {
        await jsonServer.post('/blogposts', { title, content })
        callback && callback();
    }
}

const deletblogPost = dispatch => {
    return async (id) => {
        await jsonServer.delete(`/blogposts/${id}`)
        dispatch({ type: 'delete_blogpost', payload: id })
    }
}

const editBlogPost = (dispatch) => {
    return async (id, title, content, callback) => {
        await jsonServer.put(`/blogposts/${id}`, { title, content })
        dispatch({ type: "edit_blogpost", payload: { id, title, content } })
        callback && callback();
    }
}

export const { Context, Provider } = createDataContext(blogReducer, { getBlogPosts, addBlogPost, deletblogPost, editBlogPost }, [])






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
