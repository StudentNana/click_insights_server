import React, { PropsWithChildren } from "react";
import Topbar from './topbar';
export default function Layout({ children }: PropsWithChildren){
    return (
        <>
            <Topbar />
            {children}
        </>
    );
};
