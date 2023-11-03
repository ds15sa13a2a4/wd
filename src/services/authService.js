import axios from 'axios';
import { setAuthorizationToken } from '../helpers/setAuthorizationToken';
import { decrypt, encrypt } from '../hashing';
import { Cookies } from 'react-cookie';


const login = async (email, password) => {
    try {
        const res = await axios.post(`http://${process.env.REACT_APP_API_URL}:3001/loginUser`, { email, password })

        // Handle the response
        if (res.status === 200) {
            const token = res.data.idToken
            try {
                setAuthorizationToken(token);
                const cookies = new Cookies();
                cookies.set("token", token, {
                    maxAge: 60 * 60,
                });
            } catch (error) {
                console.log(error)
            }
            return res.data;
        } else {
            // There was an error submitting the form
            console.log("Error submitting form: " + res.statusText);
        }
        // console.log(object)
    } catch (err) {
        return console.log(err);
    }
}

const logout = () => {
    setAuthorizationToken(false);
    const cookies = new Cookies();
    const token = cookies.get("token")
    cookies.set("token", token, {
        maxAge: 0,
    });
}

const tokenExists = async (token) => {
    const res = await axios.get(`http://${process.env.REACT_APP_API_URL}:3001/user/${token}`)
    const user = res.data.data
    user.uid = user.uid // server'dan firebase'den çekilirken encrypt edilmemiş halde geliyor.
    // token kullanılarak çekildiği için güvenli hala fakat server'da encrypt edilerek gönderilmesi şiddetle önerilir.
    return user
}

export default { login, logout, tokenExists };