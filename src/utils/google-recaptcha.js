import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { createContext, useContext } from 'react';

const ReCaptchaContext = createContext(null);

export function useReCaptcha() {
    return useContext(ReCaptchaContext);
}

function GoogleReCaptchaContextProvider({ children }) {
    const { executeRecaptcha } = useGoogleReCaptcha();

    async function handleReCaptcha() {
        if (!executeRecaptcha) {
            console.log('reCAPTCHA não está carregado ainda');
            return;
        }
        return await executeRecaptcha('action');
    }

    return (
        <ReCaptchaContext.Provider value={{ handleReCaptcha }}>
            {children}
        </ReCaptchaContext.Provider>
    );
}

export default function GoogleReCaptcha({ children }) {
    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            scriptProps={{
                async: true,
                defer: true,
                appendTo: 'head',
                nonce: undefined,
            }}
        >
            <GoogleReCaptchaContextProvider>
                {children}
            </GoogleReCaptchaContextProvider>
        </GoogleReCaptchaProvider>
    );
}
