import Editor from "../Editor";
import { useRouter } from "next/router";
import app from '../../firebase/clientApp';
import { getAuth } from 'firebase/auth'

export default function configSite() {
    const auth = getAuth(app);
    const router = useRouter();
    const {params = []} = router.query;
    return (
        <>
            {/* <h1>{params}</h1> */}
            <Editor 
                name={params[0]}
                auth={auth}
            />
        </>
    );
}