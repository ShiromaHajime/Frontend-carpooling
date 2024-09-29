
export const loginUser = async (username: string, password: string) => {

    const data = {
        username,
        password
    };
    
    const conver = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // Convertir data POST a una cadena JSON
    };


    try {
        
        const res = await fetch('http://localhost:5000/users', conver);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        // const response = JSON.stringify(res)
        // console.log(response);

        if (res.status == 201) {
            return res.json()
        } else return false

    } catch (error) {
        console.log(error);

        return false;
    }

}