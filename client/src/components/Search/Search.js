import { useState, useEffect } from "react";
import InputField from "../InputField/InputField";
import SearchResultsBox from "../SearchResultsBox/SearchResultsBox";
import axios from "../../utilities/axios";
import "./styles.css";

export default function Search() {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [focus, setFocus] = useState(false);

    const handleInput = (searchQuery, value) => setSearchQuery(value);
    const handleSubmit = (event) => event.preventDefault();

    const handleFocus = () => setFocus(true);
    const handleBlur = () => setTimeout(() => setFocus(false), 100);

    useEffect(() => {
        if (searchQuery) {
            setLoading(true);
            const debounce = setTimeout(async () => {
                const res = await axios.get(`/api/search/users?q=${searchQuery}`);
                setSearchResults(res.data.users);
                setLoading(false);
            }, 1000);
            return () => clearTimeout(debounce);
        } else {
            setLoading(false);
        }
    }, [searchQuery]);

    return (
        <form className="search" onBlur={handleBlur}>
            <InputField
                name="searchQuery"
                label="Search"
                handleInput={handleInput}
                loading={loading}
                handleBlur={handleBlur}
                handleFocus={handleFocus}
            />
            {!searchQuery ? null : <SearchResultsBox searchResults={searchResults} focus={focus} />}
        </form >
    );
}