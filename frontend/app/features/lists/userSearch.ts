import { SEARCH_USERS } from '@/app/api/graphql/operations';
import { useLazyQuery } from '@apollo/client/react';
import { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebouncer';

function useUserSearch() {
    const [userSearchText, setUserSearchText] = useState("")
    const debouncedUserSearch = useDebounce(userSearchText, 300);

    const [searchUsers, { error, data }] = useLazyQuery(SEARCH_USERS);

    useEffect(() => {
        searchUsers({ variables: { searchText: debouncedUserSearch } });
    }, [debouncedUserSearch]);

    return {
        setUserSearchText,
        error,
        users: data?.searchUsers ?? [],
    };
}

export default useUserSearch

