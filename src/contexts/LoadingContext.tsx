import React from "react";

interface Props {
    showLoadingScreenForDuration: (duration: number) => void;
}

const loadingContext = React.createContext<Props>({
    showLoadingScreenForDuration: (duration: number) => {
    }
});

export default loadingContext;
