import React from "react";

interface Props {
    toggleLoadingScreen: (show: boolean) => void;
}

const loadingContext = React.createContext<Props>({
    toggleLoadingScreen: (show: boolean) => {
    }
});

export default loadingContext;
