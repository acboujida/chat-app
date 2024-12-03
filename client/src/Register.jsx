import axios from "axios"
import { useState } from "react"

export default function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    async function register(ev) {
        ev.preventDefault()
        setError('')
        if (username.length < 3 || password.length < 6) {
            setError('Username must be at least 3 characters and password at least 6 characters.')
            return
        }
        if (username.length > 30) {
            setError('Username must be at most 30 characters.')
            return
        }
        setLoading(true)
        try {
            await axios.post('/register', {username, password})
        } catch (err) {
            if (err.response) {
                if (err.response.status === 409) {
                    setError('Username already exists. Please choose another one.')
                } else {
                    setError('An error occured. Please try again.')
                }
            } else {
                setError('An error occured. Please try again.')
            }
        } finally {
            setLoading(false)
        }
        
    }
    return (
        <div className="bg-purple-50 h-screen flex items-center">
            <form className="w-64 mx-auto mb-12" onSubmit={register}>
                <input value={username} 
                    onChange={ev => setUsername(ev.target.value)} 
                    type="text" placeholder="Username" 
                    className="block w-full rounded-sm p-2 mb-2 border"/>
                <input value={password}
                        onChange={ev => setPassword(ev.target.value)} 
                        type="password" placeholder="Password" 
                        className="block w-full rounded-sm p-2 mb-2 border"/>
                <button className="bg-purple-500 text-white block w-full rounded-md p-2" disabled={loading}>{loading? 'Registering...' : 'Register'}</button>
                {error && <div className="text-red-500 mb-4 blocks w-full p-2">{error}</div>}
            </form>
        </div>
    )
}