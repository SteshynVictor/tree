import axios from 'axios';

const useAxios = () => {

    const config={
        baseURL:`${process.env.REACT_APP_API_URL}`,
        headers:
            {
                'Content-Type' : 'multipart/form-data'
            }
    };

    const instance = axios.create(config);
    return instance;

}

export default useAxios;