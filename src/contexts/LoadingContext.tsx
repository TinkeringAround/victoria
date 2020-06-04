import React from "react";

interface Props {
    toggleLoadingScreen: (show: boolean) => void;
}

const LoadingContext = React.createContext<Props>({
    toggleLoadingScreen: (show: boolean) => {
    }
});

export default LoadingContext;
