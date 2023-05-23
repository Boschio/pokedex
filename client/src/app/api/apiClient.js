import axios from "axios"

class ApiClient {
    constructor(remoteHostUrl) {
        this.remoteHostUrl = remoteHostUrl
        this.token = null
        this.tokenName = "poke_token"
    }

    setToken(token) {
        this.token = token
        localStorage.setItem(this.tokenName, token)
    }

    async request({ endpoint, method = `GET`, data={}}) {
        const url = `${this.remoteHostUrl}/${endpoint}`

        const headers = {
            "Content-Type": "application/json"
        }

        if(this.token) {
            headers["Authorization"] = `Bearer ${this.token}`
        }

        try {
            const res = await axios ({ url, method, data, headers })
            return {data: res.data, error:null}
        } catch(error) {
            console.error({errorResponse: error.response})
            const message = error?.response?.data?.error?.message
            return { data: null,error: message || String(error)}
        }
    }

    async loginUser(credentials) {
        return await this.request({ endpoint: `login`, method: `POST`, data: credentials})
    }

    async logoutUser() {
        this.setToken(null)
        localStorage.setItem(this.tokenName, "")
    }
    
    async signupUser(credentials) {
        return await this.request({ endpoint: `signup`, method: `POST`, data: credentials})
    }

    async fetchUserFromToken() {
        return await this.request({ endpoint: `me`, method: `GET` })
    }

    async fetchUserFromID(userId) {
        return await this.request({ endpoint: `user/${userId}/profile`, method: `GET` })
    }
}

export default new ApiClient("http://localhost:8000")

