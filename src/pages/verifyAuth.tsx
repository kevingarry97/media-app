import React, { useEffect, useState } from 'react';
import LoadingIndicator from '../components/loadingIndicator';
import { verifyUser } from '../services/auth';

const VerifyAuth = ({match}: any) => {
    const [confirming, setConfirming] = useState(true);

    useEffect(() => {
        const {id} = match.params;

        (async () => {
            const {status} = await verifyUser(id);

            if(status == 200) { 
                setConfirming(false);

                (window as Window).location = '/auth';
            }
        })();
    }, [match.params]);
    
    return <LoadingIndicator visible={confirming} />;
}
 
export default VerifyAuth;