import { Field, useField } from "formik";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Switch from "@mui/material/Switch";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Autocomplete } from "@mui/material";
import Chip from "@mui/material/Chip";

export const fieldTypes = {
  text: "text",
  email: "email",
  password: "password",
  number: "number",
  textarea: "textarea",
  select: "select",
  checkbox: "checkbox",
  radio: "radio",
  switch: "switch",
  slider: "slider",
  autocomplete: "autocomplete",
  date: "date",
};

function TextFieldComponent({ field, form, label, helperText, type = "text", ...props }) {
  const error = form.touched[field.name] && form.errors[field.name];
  
  return (
    <TextField
      {...field}
      {...props}
      label={label}
      type={type}
      fullWidth
      variant="outlined"
      error={!!error}
      helperText={error || helperText}
      value={field.value || ""}
    />
  );
}

function TextareaComponent({ field, form, label, helperText, rows = 4, ...props }) {
  const error = form.touched[field.name] && form.errors[field.name];
  
  return (
    <TextField
      {...field}
      {...props}
      label={label}
      fullWidth
      variant="outlined"
      multiline
      rows={rows}
      error={!!error}
      helperText={error || helperText}
      value={field.value || ""}
    />
  );
}

function SelectComponent({ field, form, label, helperText, options = [], ...props }) {
  const error = form.touched[field.name] && form.errors[field.name];
  
  return (
    <FormControl fullWidth error={!!error} variant="outlined">
      <InputLabel>{label}</InputLabel>
      <Select
        {...field}
        {...props}
        label={label}
        value={field.value || ""}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {(error || helperText) && <FormHelperText>{error || helperText}</FormHelperText>}
    </FormControl>
  );
}

function CheckboxComponent({ field, form, label, helperText, ...props }) {
  const error = form.touched[field.name] && form.errors[field.name];
  
  return (
    <Box>
      <FormControlLabel
        control={
          <Checkbox
            {...field}
            {...props}
            checked={field.value || false}
            color="primary"
          />
        }
        label={label}
      />
      {error && <FormHelperText error>{error}</FormHelperText>}
    </Box>
  );
}

function RadioComponent({ field, form, label, helperText, options = [], ...props }) {
  const error = form.touched[field.name] && form.errors[field.name];
  
  return (
    <FormControl component="fieldset" error={!!error}>
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup
        {...field}
        {...props}
        row
        value={field.value || ""}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio color="primary" />}
            label={option.label}
          />
        ))}
      </RadioGroup>
      {(error || helperText) && <FormHelperText>{error || helperText}</FormHelperText>}
    </FormControl>
  );
}

function SwitchComponent({ field, form, label, helperText, ...props }) {
  const error = form.touched[field.name] && form.errors[field.name];
  
  return (
    <Box>
      <FormControlLabel
        control={
          <Switch
            {...field}
            {...props}
            checked={field.value || false}
            color="primary"
          />
        }
        label={label}
      />
      {error && <FormHelperText error>{error}</FormHelperText>}
    </Box>
  );
}

function SliderComponent({ field, form, label, helperText, min = 0, max = 100, step = 1, marks, ...props }) {
  const error = form.touched[field.name] && form.errors[field.name];
  
  return (
    <Box>
      <Typography variant="body2" gutterBottom>
        {label}: {field.value || min}
      </Typography>
      <Slider
        {...field}
        {...props}
        value={field.value || min}
        onChange={(e, value) => form.setFieldValue(field.name, value)}
        min={min}
        max={max}
        step={step}
        marks={marks}
        valueLabelDisplay="auto"
      />
      {(error || helperText) && <FormHelperText error={!!error}>{error || helperText}</FormHelperText>}
    </Box>
  );
}

function AutocompleteComponent({ field, form, label, helperText, options = [], multiple = false, ...props }) {
  const error = form.touched[field.name] && form.errors[field.name];
  
  return (
    <Autocomplete
      {...props}
      options={options}
      value={field.value || (multiple ? [] : null)}
      onChange={(e, value) => form.setFieldValue(field.name, value)}
      multiple={multiple}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            label={typeof option === "string" ? option : option.label}
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          error={!!error}
          helperText={error || helperText}
          fullWidth
        />
      )}
      getOptionLabel={(option) => typeof option === "string" ? option : option.label}
    />
  );
}

function DateFieldComponent({ field, form, label, helperText, ...props }) {
  const error = form.touched[field.name] && form.errors[field.name];
  
  return (
    <TextField
      {...field}
      {...props}
      label={label}
      type="date"
      fullWidth
      variant="outlined"
      error={!!error}
      helperText={error || helperText}
      value={field.value || ""}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}

export function FormField({ fieldConfig, ...props }) {
  const { type, name, label, size, group, ...rest } = fieldConfig;
  
  switch (type) {
    case fieldTypes.text:
    case fieldTypes.email:
    case fieldTypes.password:
    case fieldTypes.number:
      return (
        <Field
          name={name}
          component={TextFieldComponent}
          label={label}
          type={type}
          {...rest}
          {...props}
        />
      );
    case fieldTypes.textarea:
      return (
        <Field
          name={name}
          component={TextareaComponent}
          label={label}
          {...rest}
          {...props}
        />
      );
    case fieldTypes.select:
      return (
        <Field
          name={name}
          component={SelectComponent}
          label={label}
          {...rest}
          {...props}
        />
      );
    case fieldTypes.checkbox:
      return (
        <Field
          name={name}
          component={CheckboxComponent}
          label={label}
          {...rest}
          {...props}
        />
      );
    case fieldTypes.radio:
      return (
        <Field
          name={name}
          component={RadioComponent}
          label={label}
          {...rest}
          {...props}
        />
      );
    case fieldTypes.switch:
      return (
        <Field
          name={name}
          component={SwitchComponent}
          label={label}
          {...rest}
          {...props}
        />
      );
    case fieldTypes.slider:
      return (
        <Field
          name={name}
          component={SliderComponent}
          label={label}
          {...rest}
          {...props}
        />
      );
    case fieldTypes.autocomplete:
      return (
        <Field
          name={name}
          component={AutocompleteComponent}
          label={label}
          {...rest}
          {...props}
        />
      );
    case fieldTypes.date:
      return (
        <Field
          name={name}
          component={DateFieldComponent}
          label={label}
          {...rest}
          {...props}
        />
      );
    default:
      return (
        <Field
          name={name}
          component={TextFieldComponent}
          label={label}
          {...rest}
          {...props}
        />
      );
  }
}

export default FormField;
