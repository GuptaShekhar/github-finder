import React, { useContext } from 'react'
import UserItem from './UserItem'
import Spinner from '../layouts/Spinner'
import GithubContext from '../../contexts/github/GithubContext'

const Users = () => {
    const githubContext = useContext(GithubContext)

    const { users, loading } = githubContext
    if (loading) {
        return <Spinner />
    } else {
        return (
            <div style={userStyle}>
                {
                    users.map(user => (
                        <UserItem key={user.id} user={user} />
                    ))
                }
            </div >
        )
    }

}

const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
}
export default Users