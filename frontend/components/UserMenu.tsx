import { useState } from "react";
import { useAuth } from "@/context/authContext";
import { AvatarSegment } from "@/app/main/main.styles";
import { Stack, Avatar, Button, space} from "@kinsta/stratus";
import styled from "@emotion/styled";
import { LogOut } from "lucide-react";

const LogoutButton = styled(Button)({
    display: 'flex',
    position: "absolute",
    justifyContent: 'center',
    right: 0,
    marginTop: 8,
    width: '100%',
    top: "100%",
    borderRadius: 6,
    minWidth: 160,
    zIndex: 1000,
    gap: space[250]
})

export function UserMenu({ email }: { email?: string }) {
    const { logout } = useAuth();
    const [open, setOpen] = useState(false);

    return (
        <div style={{ position: "relative" }}>
            
            <AvatarSegment onClick={() => setOpen(!open)} style={{ cursor: "pointer" }}>
                <Stack direction="row">
                    <div>{email}</div>
                    <Avatar />
                </Stack>
                {open && (
                    <LogoutButton type="danger" onClick={logout}>
                        <LogOut></LogOut>
                        Logout&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                   
                    </LogoutButton>
                )}
            </AvatarSegment>
        </div>
    );
}
