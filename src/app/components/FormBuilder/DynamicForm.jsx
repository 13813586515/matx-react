import { Formik, Form } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import FormField from "./FormField";

function buildValidationSchema(fields) {
  const schema = {};
  
  fields.forEach((field) => {
    let validator;
    
    switch (field.type) {
      case "email":
        validator = Yup.string().email("Invalid email address");
        break;
      case "number":
        validator = Yup.number().typeError("Must be a number");
        break;
      case "checkbox":
      case "switch":
        validator = Yup.boolean();
        break;
      case "slider":
        validator = Yup.number()
          .min(field.min || 0, `Minimum value is ${field.min || 0}`)
          .max(field.max || 100, `Maximum value is ${field.max || 100}`);
        break;
      default:
        validator = Yup.string();
    }
    
    if (field.required) {
      if (field.type === "checkbox" || field.type === "switch") {
        validator = validator.oneOf([true], "This field is required");
      } else {
        validator = validator.required("This field is required");
      }
    }
    
    if (field.validation) {
      if (field.validation.minLength) {
        validator = validator.min(field.validation.minLength, `Minimum ${field.validation.minLength} characters`);
      }
      if (field.validation.maxLength) {
        validator = validator.max(field.validation.maxLength, `Maximum ${field.validation.maxLength} characters`);
      }
      if (field.validation.pattern) {
        validator = validator.matches(new RegExp(field.validation.pattern), field.validation.message || "Invalid format");
      }
    }
    
    schema[field.name] = validator;
  });
  
  return Yup.object().shape(schema);
}

function buildInitialValues(fields) {
  const values = {};
  
  fields.forEach((field) => {
    switch (field.type) {
      case "checkbox":
      case "switch":
        values[field.name] = field.defaultValue ?? false;
        break;
      case "slider":
        values[field.name] = field.defaultValue ?? field.min ?? 0;
        break;
      case "number":
        values[field.name] = field.defaultValue ?? "";
        break;
      case "autocomplete":
        values[field.name] = field.multiple ? (field.defaultValue ?? []) : (field.defaultValue ?? null);
        break;
      default:
        values[field.name] = field.defaultValue ?? "";
    }
  });
  
  return values;
}

function DynamicForm({
  fields = [],
  initialValues,
  validationSchema,
  onSubmit,
  submitLabel = "Submit",
  gridSpacing = 3,
  showReset = true,
  title,
  ...props
}) {
  const calculatedInitialValues = initialValues || buildInitialValues(fields);
  const calculatedValidationSchema = validationSchema || buildValidationSchema(fields);

  const groupedFields = fields.reduce((acc, field) => {
    const group = field.group || "default";
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(field);
    return acc;
  }, {});

  return (
    <Formik
      initialValues={calculatedInitialValues}
      validationSchema={calculatedValidationSchema}
      onSubmit={(values, actions) => {
        if (onSubmit) {
          onSubmit(values, actions);
        } else {
          console.log("Form submitted:", values);
          actions.setSubmitting(false);
        }
      }}
      {...props}>
      {({ isSubmitting, resetForm, values }) => (
        <Form>
          {title && (
            <>
              <Typography variant="h5" gutterBottom>
                {title}
              </Typography>
              <Divider sx={{ mb: 3 }} />
            </>
          )}

          {Object.entries(groupedFields).map(([group, groupFields], groupIndex) => (
            <Box key={group} sx={{ mb: groupIndex < Object.keys(groupedFields).length - 1 ? 3 : 0 }}>
              {group !== "default" && (
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                  {group}
                </Typography>
              )}
              <Grid container spacing={gridSpacing}>
                {groupFields.map((field) => (
                  <Grid
                    key={field.name}
                    size={{
                      xs: field.size?.xs || 12,
                      sm: field.size?.sm || 12,
                      md: field.size?.md || 6,
                      lg: field.size?.lg || 6,
                    }}>
                    <FormField fieldConfig={field} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}

          <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : submitLabel}
            </Button>
            {showReset && (
              <Button
                type="button"
                variant="outlined"
                onClick={() => resetForm()}>
                Reset
              </Button>
            )}
          </Box>
        </Form>
      )}
    </Formik>
  );
}

export default DynamicForm;
