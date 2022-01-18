import React, { ChangeEvent, useEffect, useState } from "react"

export interface SearchBoxProps {
    placeholder?: string
    onChange?: (text: string) => void;
}

export const SearchBox = ({ onChange, placeholder = 'Search text here...' }: SearchBoxProps) => {
    const [searchText, setSearchText] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;
        setSearchText(text);
    };

    useEffect(() => {
        if (onChange) {
            onChange(searchText);
        }
    }, [searchText])

    return (
        <div className="search-box">
            <input className="search-box__input" onChange={handleChange} value={searchText} type="text" title="Search" placeholder={placeholder} />
        </div>
    )
}
