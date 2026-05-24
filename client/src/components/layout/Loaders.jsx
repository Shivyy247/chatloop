import { Grid, Skeleton, Stack, Box } from "@mui/material";
import { BouncingSkeleton } from "../styles/StyledComponents";

const LayoutLoader = () => {
  return (
    <Grid
      container
      height={"calc(100vh - 4.5rem)"}
      sx={{
        background: "#0b141a", // Main Dark Background
      }}
    >
      {/* SIDEBAR SKELETON */}
      <Grid
        item
        sm={4}
        md={3}
        sx={{
          display: { xs: "none", sm: "block" },
          height: "100%",
          borderRight: "1px solid #222d34",
          background: "#111b21", // Sidebar Dark
          padding: "1rem",
        }}
      >
        <Stack spacing={1}>
          {Array.from({ length: 9 }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              height={70}
              sx={{
                borderRadius: "12px",
                bgcolor: "#1f2c33", // Subtle grey for skeletal items
                opacity: 0.6,
              }}
            />
          ))}
        </Stack>
      </Grid>

      {/* CHAT AREA SKELETON */}
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        lg={6}
        sx={{
          height: "100%",
          background: "#0b141a",
          padding: "1.2rem",
        }}
      >
        <Stack spacing={2}>
          {Array.from({ length: 8 }).map((_, index) => (
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
                  borderRadius:
                    index % 2 === 0
                      ? "0px 12px 12px 12px"
                      : "12px 0px 12px 12px",
                  bgcolor: index % 2 === 0 ? "#202c33" : "#005c4b", // WhatsApp bubble colors
                  opacity: 0.5,
                }}
              />
            </Box>
          ))}
        </Stack>
      </Grid>

      {/* PROFILE SKELETON */}
      <Grid
        item
        md={4}
        lg={3}
        sx={{
          display: { xs: "none", md: "block" },
          height: "100%",
          padding: "1.5rem",
          borderLeft: "1px solid #222d34",
          background: "#111b21",
        }}
      >
        <Stack spacing={2} alignItems={"center"}>
          <Skeleton
            variant="circular"
            width={120}
            height={120}
            sx={{ bgcolor: "#1f2c33" }}
          />

          <Skeleton
            variant="rounded"
            width={"60%"}
            height={24}
            sx={{ borderRadius: "8px", bgcolor: "#1f2c33" }}
          />

          <Skeleton
            variant="rounded"
            width={"40%"}
            height={16}
            sx={{ borderRadius: "8px", bgcolor: "#1f2c33" }}
          />

          <Box sx={{ width: "100%", mt: 2 }}>
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton
                key={index}
                variant="rounded"
                width={"100%"}
                height={60}
                sx={{
                  borderRadius: "12px",
                  bgcolor: "#1f2c33",
                  mb: 2,
                  opacity: 0.4,
                }}
              />
            ))}
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
};

const TypingLoader = () => {
  return (
    <Stack
      direction={"row"}
      spacing={"0.4rem"}
      sx={{
        padding: "0.6rem 1rem",
        width: "fit-content",
        borderRadius: "0px 12px 12px 12px", // WhatsApp tail style
        background: "#202c33",
        border: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {Array.from({ length: 3 }).map((_, index) => (
        <BouncingSkeleton
          key={index}
          variant="circular"
          width={8}
          height={8}
          sx={{
            bgcolor: "#00a884", // Pure Emerald Green
            animationDelay: `${index * 0.15}s`,
          }}
        />
      ))}
    </Stack>
  );
};

export { LayoutLoader, TypingLoader };
