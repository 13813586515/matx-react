import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid2";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";

import { Breadcrumb, SimpleCard } from "app/components";
import {
  TextSkeleton,
  CardSkeleton,
  ListSkeleton,
  AvatarSkeleton,
  DashboardSkeleton,
  FormSkeleton,
} from "app/components/MatxSkeleton";

import { styled } from "@mui/material/styles";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

const SectionTitle = ({ children }) => (
  <Typography variant="h6" sx={{ mb: 2, mt: 4 }}>
    {children}
  </Typography>
);

const ToggleButton = ({ loading, onClick, label }) => (
  <Button
    variant={loading ? "outlined" : "contained"}
    color={loading ? "error" : "primary"}
    onClick={onClick}
    sx={{ mb: 2 }}>
    {loading ? `Hide ${label}` : `Show ${label}`}
  </Button>
);

function TextSkeletonDemo() {
  const [loading, setLoading] = useState(true);

  const sampleText = (
    <Stack spacing={1}>
      <Typography variant="h6">This is a heading</Typography>
      <Typography variant="body1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua.
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
      </Typography>
    </Stack>
  );

  return (
    <Box>
      <SectionTitle>Text Skeleton</SectionTitle>
      <ToggleButton loading={loading} onClick={() => setLoading(!loading)} label="Skeleton" />
      <Card>
        <CardContent>{loading ? <TextSkeleton lines={3} /> : sampleText}</CardContent>
      </Card>
    </Box>
  );
}

function CardSkeletonDemo() {
  const [loading, setLoading] = useState(true);

  const sampleCard = (
    <Card>
      <Box
        sx={{
          height: 200,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
        <Typography variant="h5" color="white">
          Product Image
        </Typography>
      </Box>
      <CardContent>
        <Typography variant="h6">Product Title</Typography>
        <Typography variant="body2" color="text.secondary">
          This is a product description that provides details about the item.
        </Typography>
        <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
          $99.99
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <SectionTitle>Card Skeleton</SectionTitle>
      <ToggleButton loading={loading} onClick={() => setLoading(!loading)} label="Skeleton" />
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          {loading ? <CardSkeleton /> : sampleCard}
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          {loading ? <CardSkeleton /> : sampleCard}
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          {loading ? <CardSkeleton hasAction /> : sampleCard}
        </Grid>
      </Grid>
    </Box>
  );
}

function ListSkeletonDemo() {
  const [loading, setLoading] = useState(true);

  const sampleList = (
    <Card>
      <List>
        {[
          { name: "John Doe", email: "john@example.com" },
          { name: "Jane Smith", email: "jane@example.com" },
          { name: "Bob Wilson", email: "bob@example.com" },
          { name: "Alice Brown", email: "alice@example.com" },
          { name: "Charlie Davis", email: "charlie@example.com" }
        ].map((item, index) => (
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar>{item.name.charAt(0)}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={item.name} secondary={item.email} />
          </ListItem>
        ))}
      </List>
    </Card>
  );

  return (
    <Box>
      <SectionTitle>List Skeleton</SectionTitle>
      <ToggleButton loading={loading} onClick={() => setLoading(!loading)} label="Skeleton" />
      {loading ? (
        <Card>
          <ListSkeleton count={5} />
        </Card>
      ) : (
        sampleList
      )}
    </Box>
  );
}

function AvatarSkeletonDemo() {
  const [loading, setLoading] = useState(true);

  const sampleAvatars = (
    <Stack direction="row" spacing={3} alignItems="center">
      <Avatar sx={{ width: 40, height: 40 }}>A</Avatar>
      <Avatar sx={{ width: 56, height: 56 }}>B</Avatar>
      <Avatar sx={{ width: 80, height: 80 }}>C</Avatar>
      <Avatar sx={{ width: 40, height: 40, borderRadius: 2 }}>D</Avatar>
    </Stack>
  );

  return (
    <Box>
      <SectionTitle>Avatar Skeleton</SectionTitle>
      <ToggleButton loading={loading} onClick={() => setLoading(!loading)} label="Skeleton" />
      <Card>
        <CardContent>
          {loading ? (
            <Stack direction="row" spacing={3} alignItems="center">
              <AvatarSkeleton size={40} />
              <AvatarSkeleton size={56} />
              <AvatarSkeleton size={80} />
              <AvatarSkeleton size={40} variant="rounded" />
            </Stack>
          ) : (
            sampleAvatars
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

function DashboardSkeletonDemo() {
  const [loading, setLoading] = useState(true);

  return (
    <Box>
      <SectionTitle>Dashboard Skeleton</SectionTitle>
      <ToggleButton loading={loading} onClick={() => setLoading(!loading)} label="Skeleton" />
      {loading ? (
        <DashboardSkeleton />
      ) : (
        <Box sx={{ p: 3 }}>
          <Grid container spacing={3}>
            {[1, 2, 3, 4].map((i) => (
              <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
                <SimpleCard title={`Stat Card ${i}`}>
                  <Typography variant="h4">${(Math.random() * 10000).toFixed(2)}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Revenue
                  </Typography>
                </SimpleCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
}

function FormSkeletonDemo() {
  const [loading, setLoading] = useState(true);

  const sampleForm = (
    <Card>
      <CardContent>
        <Stack spacing={3}>
          <Box>
            <Typography variant="body2" sx={{ mb: 1 }}>Full Name</Typography>
            <Typography variant="body1">John Doe</Typography>
          </Box>
          <Box>
            <Typography variant="body2" sx={{ mb: 1 }}>Email</Typography>
            <Typography variant="body1">john@example.com</Typography>
          </Box>
          <Box>
            <Typography variant="body2" sx={{ mb: 1 }}>Phone</Typography>
            <Typography variant="body1">+1 234 567 8900</Typography>
          </Box>
          <Box>
            <Typography variant="body2" sx={{ mb: 1 }}>Address</Typography>
            <Typography variant="body1">123 Main Street, New York, NY 10001</Typography>
          </Box>
          <Button variant="contained" sx={{ width: 120 }}>Submit</Button>
        </Stack>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <SectionTitle>Form Skeleton</SectionTitle>
      <ToggleButton loading={loading} onClick={() => setLoading(!loading)} label="Skeleton" />
      {loading ? (
        <Card>
          <CardContent>
            <FormSkeleton fields={4} />
          </CardContent>
        </Card>
      ) : (
        sampleForm
      )}
    </Box>
  );
}

function AutoToggleDemo() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box>
      <SectionTitle>Auto Toggle Demo (3 seconds)</SectionTitle>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        This demo simulates data loading. The skeleton will disappear after 3 seconds.
        Click "Reload" to restart.
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          setLoading(true);
          setTimeout(() => setLoading(false), 3000);
        }}
        sx={{ mb: 2 }}>
        Reload
      </Button>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          {loading ? (
            <CardSkeleton />
          ) : (
            <SimpleCard title="Loaded Content">
              <Typography variant="body1">
                This content was loaded after 3 seconds. The skeleton screen provides a
                better user experience than a traditional loading spinner.
              </Typography>
            </SimpleCard>
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {loading ? (
            <Card>
              <ListSkeleton count={3} />
            </Card>
          ) : (
            <Card>
              <List>
                {["Item 1", "Item 2", "Item 3"].map((item, i) => (
                  <ListItem key={i}>
                    <ListItemText primary={item} secondary="Loaded successfully" />
                  </ListItem>
                ))}
              </List>
            </Card>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default function AppSkeleton() {
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "Components", path: "/material" }, { name: "Skeleton" }]}
        />
      </Box>

      <SimpleCard title="Skeleton Components">
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Skeleton screens (also known as ghost screens) are used to indicate that content is
          currently loading. They provide a better user experience than traditional loading
          spinners because they give users a preview of the page structure.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Available skeleton types: <code>text</code>, <code>card</code>, <code>list</code>,{" "}
          <code>avatar</code>, <code>dashboard</code>, <code>form</code>
        </Typography>
      </SimpleCard>

      <TextSkeletonDemo />
      <Divider sx={{ my: 4 }} />

      <CardSkeletonDemo />
      <Divider sx={{ my: 4 }} />

      <ListSkeletonDemo />
      <Divider sx={{ my: 4 }} />

      <AvatarSkeletonDemo />
      <Divider sx={{ my: 4 }} />

      <FormSkeletonDemo />
      <Divider sx={{ my: 4 }} />

      <DashboardSkeletonDemo />
      <Divider sx={{ my: 4 }} />

      <AutoToggleDemo />
    </Container>
  );
}
