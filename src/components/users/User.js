import React, { Fragment, useEffect, useContext } from 'react'
import Repos from '../repos/Repos'
import Spinner from '../layouts/Spinner'
import { Link, useParams } from 'react-router-dom'
import GithubContext from '../../contexts/github/GithubContext'

const User = () => {
    const githubContext = useContext(GithubContext)
    const { user, loading, getUser, getUserRepos, repos } = githubContext
    const params = useParams()
    useEffect(() => {
        getUser(params.login)
        getUserRepos(params.login)
        // eslint-disable-next-line
    }, [])

    const {
        name,
        avatar_url,
        location,
        bio,
        blog,
        login,
        html_url,
        company,
        followers,
        following,
        public_repos,
        public_gists,
        hireable
    } = user

    if (loading) return <Spinner />

    return (
        <Fragment>
            <Link to='/' className='btn btn-light'>
                Back to Search
            </Link>
            Hireable:{' '}
            {hireable ? (
                <i className='fas fa-check text-success' />
            ) : (
                <i className='fas fa-times-circle text-danger' />
            )}
            <div className='card grid-2'>
                <div className='all-center'>
                    <img src={avatar_url} className='round-img' alt='' style={{ width: '150px' }} />

                    <h1>{name}</h1>
                    <p>Location: {location}</p>
                </div>
                <div>
                    {bio && (
                        <Fragment>
                            <h3>Bio</h3>
                            <p>{bio}</p>
                        </Fragment>
                    )}
                    <a href={html_url} className='btn btn-dark my-1'>
                        Visit GitHub profile
                    </a>
                    <ul>
                        <li>
                            {login && (
                                <Fragment>
                                    <strong>Login: </strong>{login}
                                </Fragment>
                            )}
                        </li>
                        <li>
                            {company && (
                                <Fragment>
                                    <strong>Company: </strong>{company}
                                </Fragment>
                            )}
                        </li>
                        <li>
                            {blog && (
                                <Fragment>
                                    <strong>Website: </strong>{blog}
                                </Fragment>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
            <div className='card text-center'>
                <div className='badge badge-factory'>Followers: {followers}</div>
                <div className='badge badge-success'>Following: {following}</div>
                <div className='badge badge-light'>Public Repos: {public_repos}</div>
                <div className='badge badge-dark'>Public Gists: {public_gists}</div>
            </div>
            <Repos repos={repos} />
        </Fragment >
    )
}

export default User