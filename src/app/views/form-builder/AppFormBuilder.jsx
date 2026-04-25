import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Alert from "@mui/material/Alert";

import { Breadcrumb, SimpleCard } from "app/components";
import { FormBuilder, DynamicForm, fieldTypes } from "app/components/FormBuilder";

import { styled } from "@mui/material/styles";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

const sampleFormSchema = [
  {
    id: "field_1",
    type: fieldTypes.text,
    name: "fullName",
    label: "Full Name",
    required: true,
    helperText: "Enter your first and last name",
    size: { xs: 12, md: 6 },
  },
  {
    id: "field_2",
    type: fieldTypes.email,
    name: "email",
    label: "Email Address",
    required: true,
    size: { xs: 12, md: 6 },
  },
  {
    id: "field_3",
    type: fieldTypes.select,
    name: "country",
    label: "Country",
    required: true,
    options: [
      { value: "us", label: "United States" },
      { value: "uk", label: "United Kingdom" },
      { value: "ca", label: "Canada" },
      { value: "au", label: "Australia" },
      { value: "de", label: "Germany" },
      { value: "fr", label: "France" },
      { value: "jp", label: "Japan" },
      { value: "cn", label: "China" },
    ],
    size: { xs: 12, md: 6 },
  },
  {
    id: "field_4",
    type: fieldTypes.radio,
    name: "gender",
    label: "Gender",
    options: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
      { value: "other", label: "Other" },
    ],
    size: { xs: 12, md: 6 },
  },
  {
    id: "field_5",
    type: fieldTypes.slider,
    name: "experience",
    label: "Years of Experience",
    min: 0,
    max: 30,
    step: 1,
    defaultValue: 5,
    size: { xs: 12, md: 12 },
  },
  {
    id: "field_6",
    type: fieldTypes.switch,
    name: "subscribe",
    label: "Subscribe to newsletter",
    defaultValue: true,
    size: { xs: 12, md: 6 },
  },
  {
    id: "field_7",
    type: fieldTypes.checkbox,
    name: "terms",
    label: "I agree to the terms and conditions",
    required: true,
    size: { xs: 12, md: 6 },
  },
  {
    id: "field_8",
    type: fieldTypes.textarea,
    name: "bio",
    label: "Tell us about yourself",
    rows: 4,
    size: { xs: 12, md: 12 },
  },
];

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`form-builder-tabpanel-${index}`}
      aria-labelledby={`form-builder-tab-${index}`}
      {...other}>
      {value === index && <Box sx={{ py: 2 }}>{children}</Box>}
    </div>
  );
}

export default function AppFormBuilder() {
  const [activeTab, setActiveTab] = useState(0);
  const [submittedData, setSubmittedData] = useState(null);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSampleFormSubmit = (values, actions) => {
    console.log("Sample form submitted:", values);
    setSubmittedData(values);
    actions.setSubmitting(false);
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "Tools", path: "/" }, { name: "Form Builder" }]}
        />
      </Box>

      <SimpleCard title="Low-Code Form Generator">
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          A visual form builder that allows you to create Formik forms through JSON configuration.
          Drag and drop field types, customize properties, and export JSON schemas.
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Chip label="Formik Integration" color="primary" />
          <Chip label="Yup Validation" color="secondary" />
          <Chip label="MUI Components" />
          <Chip label="Drag & Drop" />
          <Chip label="JSON Export/Import" />
        </Stack>
      </SimpleCard>

      <Box sx={{ mt: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="Visual Builder" />
            <Tab label="Dynamic Form Demo" />
            <Tab label="Code Examples" />
          </Tabs>
        </Box>

        <TabPanel value={activeTab} index={0}>
          <Alert severity="info" sx={{ mb: 3 }}>
            <strong>How to use:</strong> Click on field types from the left sidebar to add them to your form.
            Drag fields to reorder them. Click the edit icon to customize field properties.
            Export your form as JSON when ready.
          </Alert>
          <FormBuilder />
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 7 }}>
              <Card>
                <CardContent>
                  <DynamicForm
                    fields={sampleFormSchema}
                    title="Sample Registration Form"
                    submitLabel="Register"
                    onSubmit={handleSampleFormSubmit}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Features Demo
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    This form demonstrates all supported field types:
                  </Typography>
                  <Stack spacing={1}>
                    {[
                      "Text Input (with validation)",
                      "Email Input",
                      "Select/Dropdown",
                      "Radio Buttons",
                      "Slider",
                      "Switch Toggle",
                      "Checkbox",
                      "Text Area",
                    ].map((feature, i) => (
                      <Chip key={i} label={feature} variant="outlined" />
                    ))}
                  </Stack>

                  <Divider sx={{ my: 3 }} />

                  <Typography variant="subtitle2" gutterBottom>
                    Submitted Data:
                  </Typography>
                  {submittedData ? (
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: "background.default",
                        borderRadius: 1,
                        fontFamily: "monospace",
                        fontSize: "0.75rem",
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-all",
                      }}>
                      {JSON.stringify(submittedData, null, 2)}
                    </Box>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      Fill out and submit the form to see the data here.
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    1. Basic DynamicForm Usage
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Create a form from JSON schema:
                  </Typography>
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: "background.default",
                      borderRadius: 1,
                      fontFamily: "monospace",
                      fontSize: "0.75rem",
                      whiteSpace: "pre-wrap",
                      overflow: "auto",
                      maxHeight: 300,
                    }}>
{`import { DynamicForm } from 'app/components/FormBuilder';

const formFields = [
  {
    type: 'text',
    name: 'username',
    label: 'Username',
    required: true,
  },
  {
    type: 'email',
    name: 'email',
    label: 'Email',
    required: true,
  },
  {
    type: 'select',
    name: 'role',
    label: 'Role',
    options: [
      { value: 'admin', label: 'Administrator' },
      { value: 'user', label: 'Regular User' },
    ],
  },
];

function MyForm() {
  return (
    <DynamicForm
      fields={formFields}
      title="User Registration"
      onSubmit={(values, actions) => {
        console.log('Submitted:', values);
        actions.setSubmitting(false);
      }}
    />
  );
}`}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    2. Field Configuration Options
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Available field types and their properties:
                  </Typography>
                  
                  <Stack spacing={2}>
                    {[
                      {
                        type: "text, email, password, number",
                        props: "label, required, helperText, defaultValue, size, validation (minLength, maxLength, pattern)",
                      },
                      {
                        type: "textarea",
                        props: "label, required, helperText, defaultValue, size, rows",
                      },
                      {
                        type: "select",
                        props: "label, required, helperText, defaultValue, size, options[]",
                      },
                      {
                        type: "radio",
                        props: "label, required, helperText, defaultValue, size, options[]",
                      },
                      {
                        type: "checkbox, switch",
                        props: "label, required, helperText, defaultValue, size",
                      },
                      {
                        type: "slider",
                        props: "label, required, helperText, defaultValue, size, min, max, step, marks[]",
                      },
                      {
                        type: "autocomplete",
                        props: "label, required, helperText, defaultValue, size, options[], multiple",
                      },
                      {
                        type: "date",
                        props: "label, required, helperText, defaultValue, size",
                      },
                    ].map((item, i) => (
                      <Box key={i}>
                        <Chip label={item.type} color="primary" size="small" sx={{ mb: 0.5 }} />
                        <Typography variant="caption" color="text.secondary" display="block">
                          {item.props}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    3. Using FormBuilder Component
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    The FormBuilder component provides a visual interface for creating forms:
                  </Typography>
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: "background.default",
                      borderRadius: 1,
                      fontFamily: "monospace",
                      fontSize: "0.75rem",
                      whiteSpace: "pre-wrap",
                      overflow: "auto",
                    }}>
{`import { FormBuilder } from 'app/components/FormBuilder';

function FormBuilderPage() {
  const handleExport = (fields) => {
    // Save fields to backend or localStorage
    console.log('Form schema:', fields);
  };

  return (
    <FormBuilder
      onExport={handleExport}
      initialFields={[
        // Optional: pre-load existing fields
      ]}
    />
  );
}`}
                  </Box>

                  <Divider sx={{ my: 3 }} />

                  <Typography variant="subtitle2" gutterBottom>
                    Key Features:
                  </Typography>
                  <Grid container spacing={2}>
                    {[
                      {
                        title: "Drag & Drop Reordering",
                        desc: "Reorder fields by dragging them up or down",
                      },
                      {
                        title: "Field Property Editor",
                        desc: "Edit field names, labels, validation, options, etc.",
                      },
                      {
                        title: "Live Preview",
                        desc: "See your form in action with the Preview tab",
                      },
                      {
                        title: "JSON Export/Import",
                        desc: "Export form schema as JSON, or import existing schemas",
                      },
                      {
                        title: "Field Templates",
                        desc: "Quick start with Contact Form, Registration, Survey templates",
                      },
                      {
                        title: "Copy to Clipboard",
                        desc: "One-click copy of JSON schema",
                      },
                    ].map((feature, i) => (
                      <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
                        <Card variant="outlined" sx={{ p: 2, height: "100%" }}>
                          <Typography variant="subtitle2" gutterBottom>
                            {feature.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {feature.desc}
                          </Typography>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      </Box>
    </Container>
  );
}
