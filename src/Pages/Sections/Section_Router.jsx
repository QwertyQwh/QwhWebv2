import { useRef, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Section_Colorie from './Section_Colorie';

export default function Section_Router(props){
    const data = useLoaderData()
    console.log(data)
    switch (data.name) {
        case 'coding':
            return <Section_Colorie {...data} />
            break;
    
        default:
            break;
    }
    return null
}