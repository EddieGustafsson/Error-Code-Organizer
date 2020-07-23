import React from 'react';
import { Breadcrumb} from 'semantic-ui-react'

function Breadcrumbhead() {
    const sections = [
        { key: 'Dashboard', content: 'Dashboard', link: true },
        { key: 'Test1', content: 'Test1', link: true },
        { key: 'Test2', content: 'Test2', active: true },
    ]

    return (
        <Breadcrumb icon='right angle' sections={sections} />
    );
}

export default Breadcrumbhead;
