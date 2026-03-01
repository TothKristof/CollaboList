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


    const transformedItems = useMemo(() => {
        const items = data?.userData.items ?? [];

        return items.map((item: Item) => ({
            ...item,
            addDate: new Date(Number(item.addDate)),
            lastUpdatedDate: new Date(Number(item.lastUpdatedDate)),
        }));
    }, [data?.userData]);

    return {
        loading,
        error,
        items: transformedItems,
        lists: data?.userData?.lists ?? []
    }
}

export default useHomeInformations