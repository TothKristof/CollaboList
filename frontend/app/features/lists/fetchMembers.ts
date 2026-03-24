import { GET_LIST_MEMBERS } from '@/app/api/graphql/operations';
import { useLazyQuery } from '@apollo/client/react';
import { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebouncer';

function useFetchMembers() {
    const [fetchUsers, { error, data, refetch }] = useLazyQuery(GET_LIST_MEMBERS);

    return {
        fetchUsers,
        members: data?.getListMembers ?? [],
        refetch,
        error
    };
}

export default useFetchMembers

