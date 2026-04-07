import { ADD_LIST, ACCEPT_INVITATION } from "@/app/api/graphql/operations";
import { useMutation } from "@apollo/client/react";

function useListAdd() {
    const [addList, { error: addListError }] = useMutation(ADD_LIST, {
        refetchQueries: ["GetUserData"],
    });

    const [acceptInvitation, { error: acceptInvitationError }] = useMutation(ACCEPT_INVITATION, {
        refetchQueries: ["GetUserData"],
    });

    return {
        addList,
        addListError,
        acceptInvitation,
        acceptInvitationError
    };
}

export default useListAdd