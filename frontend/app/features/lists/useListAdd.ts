import { ADD_LIST, ACCEPT_INVITATION } from "@/app/api/graphql/operations";
import { useMutation } from "@apollo/client/react";

function useListAdd() {
    const [addList] = useMutation(ADD_LIST, {
        refetchQueries: ["GetUserData"],
    });

    const [acceptInvitation] = useMutation(ACCEPT_INVITATION, {
        refetchQueries: ["GetUserData"],
    });

    return {
        addList,
        acceptInvitation
    };
}

export default useListAdd