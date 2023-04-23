import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { TrueTask } from "./CardStyled";

interface CardProps {
  title: string;
  children: JSX.Element;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <>
      <Grid
        container
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(-200deg, #d500f9 0%, #212121 45%)"
        }}
      >
        <Grid item xs={12} sm={5} md={5} lg={6}>
          <TrueTask>{"TrueTask"}</TrueTask>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Poppins",
              fontWeight: "300",
              textAlign: "center",
              mb: "20px",
              mt: "20px",
              fontSize: "20px",
              color: "white"
            }}
          >
            Adicione suas tarefas, <br />
            Organize sua vida, <br />
            Encontre a clareza mental que você tanto busca.
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={5} lg={3}>
          <Paper
            elevation={6}
            sx={{
              padding: "35px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Poppins",
                fontWeight: "300",
                textAlign: "center",
                mb: "20px",
                fontSize: "18px"
              }}
            ></Typography>
            <Typography
              variant="h5"
              sx={{
                fontFamily: "Poppins",
                fontWeight: "400",
                textAlign: "center",
                mb: "15px"
              }}
            >
              {title}
            </Typography>
            <Box>{children}</Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export { Card };
