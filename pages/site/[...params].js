import Editor from "../Editor";
import { useRouter } from "next/router";

export default function site() {

    const router = useRouter();
    const {params = []} = router.query;

    return (
        <>
            {/* <h1>{params}</h1> */}
            <Editor 
                name={params[0]}
            />
        </>
    );
}