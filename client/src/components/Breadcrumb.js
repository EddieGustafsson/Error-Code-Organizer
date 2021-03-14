import React from 'react';
import { Breadcrumb } from 'semantic-ui-react'
import { useLocation } from 'react-router-dom';
import capitalizeFirstLetter from '../helpers/capitalizeFirstLetter';

function Breadcrumbhead() {
    const location = useLocation();

    let sections = location.pathname.split('/').map((p, i, arr) => {
        if (i === 0) return {
            key: i,
            content: 'Dashboard',
            href: '/',
            active: (i === arr.length - 1),
            link: (i < arr.length - 1)
        };

        if (p === 'project') {
            return {
                key: i,
                content: 'Projects',
                href: '/projects',
                active: false,
                link: true
            };
        }

        if (p === 'user') {
            return {
                key: i,
                content: 'User',
                href: '',
                active: false,
                link: false
            };
        }

        if (i === arr.length - 1) return {
            key: i,
            content: capitalizeFirstLetter(p),
            active: (i === arr.length - 1)
        };

        return {
            key: i,
            content: capitalizeFirstLetter(p),
            href: arr.slice(0, i + 1).join('/'),
            active: (i === arr.length - 1),
            link: (i < arr.length - 1)
        }
    }
    );

    sections = sections.filter(x => x.content !== '');

    return <Breadcrumb icon='right angle' sections={sections} />;
}

export default Breadcrumbhead;
