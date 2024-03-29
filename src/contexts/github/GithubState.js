import React, { useReducer } from "react"
import axios from "axios"
import GithubContext from "./GithubContext"
import GithubReducer from "./GithubReducer"

import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_REPOS,
    GET_USER
} from '../types'

let githubClientId
let githubClientSecret

if (process.env.NODE_ENV !== 'production') {
    githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID
    githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET
} else {
    githubClientId = process.env.GITHUB_CLIENT_ID
    githubClientSecret = process.env.GITHUB_CLIENT_SECRET
    if (!githubClientId || !githubClientSecret) {
        githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID
        githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET
    }
    // console.log('GithubState', { res: process.env })
}
const GithubState = (props) => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState)

    // Search User
    const searchUsers = async (text) => {
        setLoading()
        const url = `https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
        const res = await axios.get(url)
        dispatch({
            type: SEARCH_USERS,
            payload: res.data.items
        })
    }

    // Get User
    const getUser = async (username) => {
        setLoading()
        const url = `https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`
        const res = await axios.get(url)
        dispatch({
            type: GET_USER,
            payload: res.data
        })
    }

    // Get Repos
    const getUserRepos = async (username) => {
        setLoading()
        const url = `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`
        const res = await axios.get(url)
        dispatch({
            type: GET_REPOS,
            payload: res.data
        })
    }
    // Clear Users
    const clearUsers = () => dispatch({ type: CLEAR_USERS })
    // Set Loading
    const setLoading = () => dispatch({ type: SET_LOADING })

    return <GithubContext.Provider
        value={{
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            searchUsers,
            clearUsers,
            getUser,
            getUserRepos
        }}>
        {props.children}
    </GithubContext.Provider>
}

export default GithubState