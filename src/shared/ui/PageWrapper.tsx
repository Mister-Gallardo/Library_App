import { Box, useTheme } from "@mui/material";
import { ReactNode } from "react";

interface AuthProfileWrapperProps {
  children: ReactNode;
}

const AuthProfileWrapper: React.FC<AuthProfileWrapperProps> = ({
  children,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "80vw", md: "65vw", lg: "42vw", xl: "36vw" },
        height: { xs: "100vh", sm: "auto" },
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(135deg, rgb(40, 46, 68), rgb(61, 78, 103))"
            : "linear-gradient(135deg, rgba(220, 235, 255, 1), rgba(200, 220, 255, 1))",
        boxShadow: {
          xs: "none",
          sm:
            theme.palette.mode === "dark"
              ? "0px 0px 24px rgba(0, 0, 0, 0.6), 0px 4px 8px rgba(0, 0, 0, 0.4)"
              : "0px 0px 24px rgba(0, 0, 0, 0.15), 0px 4px 8px rgba(0, 0, 0, 0.1)",
        },
        display: "flex",
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: {xs: 'none', sm: '15px'},
        padding: '30px 0px 40px',
      }}
    >
      {children}
    </Box>
  );
};

export default AuthProfileWrapper;
