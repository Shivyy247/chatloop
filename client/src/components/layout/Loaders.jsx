import { Grid, Skeleton, Stack, Box } from "@mui/material";

import { BouncingSkeleton } from "../styles/StyledComponents";

const LayoutLoader = () => {
  return (
    <Grid
      container
      height={"calc(100vh - 4.5rem)"}
      sx={{
        background: "var(--bg-primary)",
      }}
    >
      {/* SIDEBAR */}

      <Grid
        size={{ sm: 4, md: 3 }}
        sx={{
          display: { xs: "none", sm: "block" },

          height: "100%",

          borderRight: "1px solid var(--border-color)",

          background: "var(--bg-secondary)",

          padding: "1rem",
        }}
      >
        <Stack spacing={1}>
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              height={70}
              sx={{
                borderRadius: "18px",

                bgcolor: "var(--bg-chat)",
              }}
            />
          ))}
        </Stack>
      </Grid>

      {/* CHAT AREA */}

      <Grid
        size={{ xs: 12, sm: 8, md: 5, lg: 6 }}
        sx={{
          height: "100%",

          background: "var(--bg-primary)",

          padding: "1.2rem",
        }}
      >
        <Stack spacing={2}>
          {Array.from({ length: 10 }).map((_, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",

                justifyContent: index % 2 === 0 ? "flex-start" : "flex-end",
              }}
            >
              <Skeleton
                variant="rounded"
                width={index % 2 === 0 ? "55%" : "45%"}
                height={60}
                sx={{
                  borderRadius: "20px",

                  bgcolor: "var(--bg-secondary)",
                }}
              />
            </Box>
          ))}
        </Stack>
      </Grid>

      {/* PROFILE */}

      <Grid
        size={{ md: 4, lg: 3 }}
        sx={{
          display: { xs: "none", md: "block" },

          height: "100%",

          padding: "1.5rem",

          borderLeft: "1px solid var(--border-color)",

          background: "var(--bg-secondary)",
        }}
      >
        <Stack spacing={2} alignItems={"center"}>
          <Skeleton
            variant="circular"
            width={110}
            height={110}
            sx={{
              bgcolor: "var(--bg-chat)",
            }}
          />

          <Skeleton
            variant="rounded"
            width={"70%"}
            height={28}
            sx={{
              borderRadius: "12px",

              bgcolor: "var(--bg-chat)",
            }}
          />

          <Skeleton
            variant="rounded"
            width={"50%"}
            height={18}
            sx={{
              borderRadius: "12px",

              bgcolor: "var(--bg-chat)",
            }}
          />

          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              width={"100%"}
              height={70}
              sx={{
                borderRadius: "18px",

                bgcolor: "var(--bg-chat)",
              }}
            />
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
};

const TypingLoader = () => {
  return (
    <Stack
      direction={"row"}
      spacing={"0.45rem"}
      sx={{
        padding: "0.6rem 1rem",

        width: "fit-content",

        borderRadius: "16px",

        background: "var(--bg-secondary)",

        border: "1px solid var(--border-color)",

        boxShadow: "var(--shadow-sm)",
      }}
    >
      {Array.from({ length: 4 }).map((_, index) => (
        <BouncingSkeleton
          key={index}
          variant="circular"
          width={12}
          height={12}
          sx={{
            bgcolor: "var(--emerald)",

            animationDelay: `${index * 0.15}s`,
          }}
        />
      ))}
    </Stack>
  );
};

export { LayoutLoader, TypingLoader };
