import React from 'react'
import { USER_DATAS } from "@/app/api/graphql/operations";
import { useAuth } from '@/context/authContext';
import { useQuery } from "@apollo/client/react";
import { useMemo, useEffect } from 'react';
import type { Item } from '@/types/itemType';
import { useRouter } from 'next/navigation';

export function useHomeInformations() {
    const { isAuthenticated, user } = useAuth();
    const router = useRouter();

    const { loading, error, data } = useQuery(USER_DATAS, {
        skip: !user
    });

    useEffect(() => {
        if (!user) {
            router.replace("/login");
        }
    }, [isAuthenticated]);

    return {
        loading,
        error,
        items: data?.userData.items ?? [],
        lists: data?.userData?.lists ?? []
    }
}

export default useHomeInformations