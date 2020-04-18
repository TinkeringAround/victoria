import React from "react";

interface Props {
    user: any
    logout: () => void
}

const userContext = React.createContext<Props>({
    user: {},
    logout: () => {
    }
});

export default userContext;
