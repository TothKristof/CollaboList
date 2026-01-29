import { RowWithSpaceBetween } from "../app/global.styles"
import Brand from "@/components/Brand";
import { UserMenu } from "@/components/UserMenu";
import { useAuth } from "@/context/authContext";
import Link from 'next/link'
import { Button, Dropdown, Stack, Tooltip } from "@kinsta/stratus";
import { ThemeName, useTheme } from "@/context/themeContext";
import { Sun, Moon, Star, Trees } from 'lucide-react';
import { useState } from "react";
import { usePathname } from 'next/navigation';
import styled from "@emotion/styled";

const ThemeToggleButton = styled.button((props) => ({
    background: props.theme.colors.primary,
    color: props.theme.colors.text,
    border: 'none',
    padding: 6,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 6,

    '&:hover': {
        opacity: 0.85,
    },
}));

export default function Navbar() {
    const { isAuthenticated, user } = useAuth();
    const { theme, setTheme } = useTheme();
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const isLanding = pathname === '/';

    const themeOptions: { value: ThemeName; icon: JSX.Element }[] = [
        { value: 'light', icon: <Sun size={18} /> },
        { value: 'dark', icon: <Moon size={18} /> },
        { value: 'midnight', icon: <Star size={18} /> },
        { value: 'forest', icon: <Trees size={18} /> },
    ];

    const activeTheme = themeOptions.find(t => t.value === theme);
    const availableThemes = themeOptions.filter(t => t.value !== theme);

    const handleThemeChange = (value: ThemeName) => {
        setTheme(value);
        setOpen(false);
    };

    return (
        <RowWithSpaceBetween>
            <Brand />

            <Stack direction="row" gap={100}>
                <Dropdown
                    isOpen={open}
                    onOpenChange={setOpen}
                    floatingElement={
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                gap: 2,
                            }}
                        >
                            {availableThemes.map((opt) => (
                                <Button
                                    key={opt.value}
                                    type="secondary"
                                    onClick={() => handleThemeChange(opt.value)}
                                    style={{
                                        justifyContent: 'flex-start',
                                        padding: 6,
                                    }}
                                >
                                    {opt.icon}
                                </Button>
                            ))}
                        </div>
                    }
                >
                    <Tooltip content="Change theme">
                        <ThemeToggleButton onClick={() => setOpen(v => !v)}>
                            {activeTheme?.icon}
                        </ThemeToggleButton>
                    </Tooltip>
                </Dropdown>

                {isLanding && (
                    isAuthenticated ? (
                        <Link href="/main">
                            <Button>Go to Dashboard</Button>
                        </Link>
                    ) : (
                        <Link href="/login">
                            <Button>Sign in</Button>
                        </Link>
                    )
                )}

                {isAuthenticated && !isLanding && (
                    <UserMenu email={user?.email} />
                )}
            </Stack>
        </RowWithSpaceBetween>
    );
}
