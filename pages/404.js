import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function NotFound(props) {
    const router = useRouter();
    useEffect(()=>{
        setTimeout(()=>{
            router.push('/');
        }, 4000)
    }, [])
    return (
        <div className="not-found">
            <h1>404</h1>
            <h2>Ooops! That page cannot found :(</h2>
            <p>Redirecting to the <Link href="/">Homepage</Link> for more marmite goodness...</p>
        </div>
    );
}

export default NotFound;