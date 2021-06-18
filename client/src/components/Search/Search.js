import { useState, useEffect } from "react";
import InputField from "../InputField/InputField";
import SearchResultsBox from "../SearchResultsBox/SearchResultsBox";
import axios from "../../utilities/axios";
import "./styles.css";

export default function Search() {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleInput = (searchQuery, value) => {
        setSearchQuery(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

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
        <form className="search">
            <InputField
                name="searchQuery"
                label="Search"
                handleInput={handleInput}
                loading={loading}
            />
            {!searchQuery ? null : <SearchResultsBox searchResults={searchResults} />}
        </form >
    );
}