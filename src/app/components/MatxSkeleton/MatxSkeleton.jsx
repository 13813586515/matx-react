import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid2";

export function TextSkeleton({ lines = 3, variant = "text", width = "100%", ...props }) {
  return (
    <Stack spacing={1} {...props}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          variant={variant}
          width={
            typeof width === "function"
              ? width(index)
              : index === lines - 1 && typeof width === "string"
              ? "60%"
              : width
          }
          height={variant === "text" ? 24 : undefined}
        />
      ))}
    </Stack>
  );
}

export function CardSkeleton({ hasImage = true, hasAction = false, ...props }) {
  return (
    <Card {...props}>
      {hasImage && <Skeleton variant="rectangular" height={200} />}
      <CardContent>
        <Skeleton variant="text" height={32} width="60%" />
        <Skeleton variant="text" height={24} />
        <Skeleton variant="text" height={24} width="80%" />
        {hasAction && (
          <Box sx={{ mt: 2 }}>
            <Skeleton variant="rounded" width={100} height={36} />
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export function ListItemSkeleton({ hasAvatar = true, ...props }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 2 }} {...props}>
      {hasAvatar && <Skeleton variant="circular" width={48} height={48} />}
      <Box sx={{ flex: 1 }}>
        <Skeleton variant="text" height={24} width="40%" />
        <Skeleton variant="text" height={20} width="70%" />
      </Box>
    </Box>
  );
}

export function ListSkeleton({ count = 5, hasAvatar = true, ...props }) {
  return (
    <Stack {...props}>
      {Array.from({ length: count }).map((_, index) => (
        <ListItemSkeleton key={index} hasAvatar={hasAvatar} />
      ))}
    </Stack>
  );
}

export function AvatarSkeleton({ size = 40, variant = "circular", ...props }) {
  return (
    <Skeleton
      variant={variant}
      width={size}
      height={size}
      {...props}
    />
  );
}

export function DashboardSkeleton({ ...props }) {
  return (
    <Box sx={{ p: 3 }} {...props}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <CardSkeleton hasImage={false} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <CardSkeleton hasImage={false} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <CardSkeleton hasImage={false} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <CardSkeleton hasImage={false} />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 0 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent>
              <Skeleton variant="text" height={32} width="30%" sx={{ mb: 2 }} />
              <Skeleton variant="rounded" height={200} />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <ListSkeleton count={5} />
        </Grid>
      </Grid>
    </Box>
  );
}

export function FormSkeleton({ fields = 4, ...props }) {
  return (
    <Stack spacing={3} {...props}>
      {Array.from({ length: fields }).map((_, index) => (
        <Box key={index}>
          <Skeleton variant="text" height={20} width="30%" sx={{ mb: 1 }} />
          <Skeleton variant="rounded" height={56} />
        </Box>
      ))}
      <Skeleton variant="rounded" width={120} height={40} sx={{ mt: 2 }} />
    </Stack>
  );
}

export default function MatxSkeleton({ type = "text", ...props }) {
  switch (type) {
    case "text":
      return <TextSkeleton {...props} />;
    case "card":
      return <CardSkeleton {...props} />;
    case "list":
      return <ListSkeleton {...props} />;
    case "avatar":
      return <AvatarSkeleton {...props} />;
    case "dashboard":
      return <DashboardSkeleton {...props} />;
    case "form":
      return <FormSkeleton {...props} />;
    default:
      return <Skeleton {...props} />;
  }
}
