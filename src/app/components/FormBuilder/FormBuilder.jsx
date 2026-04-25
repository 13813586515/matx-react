import { useState, useCallback } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Grid from "@mui/material/Grid2";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import DragIndicator from "@mui/icons-material/DragIndicator";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import Add from "@mui/icons-material/Add";
import ContentCopy from "@mui/icons-material/ContentCopy";
import Download from "@mui/icons-material/Download";
import Upload from "@mui/icons-material/Upload";
import Preview from "@mui/icons-material/Visibility";
import Code from "@mui/icons-material/Code";
import TextFields from "@mui/icons-material/TextFields";
import CheckBox from "@mui/icons-material/CheckBox";
import RadioButtonChecked from "@mui/icons-material/RadioButtonChecked";
import ToggleOn from "@mui/icons-material/ToggleOn";
import ArrowDropDownCircle from "@mui/icons-material/ArrowDropDownCircle";
import Tune from "@mui/icons-material/Tune";
import CalendarToday from "@mui/icons-material/CalendarToday";

import DynamicForm from "./DynamicForm";
import { fieldTypes } from "./FormField";

const fieldTypeDefinitions = [
  { type: fieldTypes.text, label: "Text Input", icon: <TextFields /> },
  { type: fieldTypes.email, label: "Email", icon: <TextFields /> },
  { type: fieldTypes.password, label: "Password", icon: <TextFields /> },
  { type: fieldTypes.number, label: "Number", icon: <TextFields /> },
  { type: fieldTypes.textarea, label: "Text Area", icon: <TextFields /> },
  { type: fieldTypes.select, label: "Select", icon: <ArrowDropDownCircle /> },
  { type: fieldTypes.checkbox, label: "Checkbox", icon: <CheckBox /> },
  { type: fieldTypes.radio, label: "Radio Group", icon: <RadioButtonChecked /> },
  { type: fieldTypes.switch, label: "Switch", icon: <ToggleOn /> },
  { type: fieldTypes.slider, label: "Slider", icon: <Tune /> },
  { type: fieldTypes.date, label: "Date Picker", icon: <CalendarToday /> },
  { type: fieldTypes.autocomplete, label: "Autocomplete", icon: <ArrowDropDownCircle /> },
];

const generateId = () => `field_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

const createDefaultField = (type) => ({
  id: generateId(),
  type: type,
  name: `field_${Date.now()}`,
  label: `New ${type} Field`,
  required: false,
  helperText: "",
  defaultValue: "",
  size: { xs: 12, md: 6 },
});

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`builder-tabpanel-${index}`}
      aria-labelledby={`builder-tab-${index}`}
      {...other}>
      {value === index && <Box sx={{ py: 2 }}>{children}</Box>}
    </div>
  );
}

export default function FormBuilder({ onExport, initialFields = [], ...props }) {
  const [fields, setFields] = useState(initialFields);
  const [activeTab, setActiveTab] = useState(0);
  const [editingField, setEditingField] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const addField = useCallback((type) => {
    const newField = createDefaultField(type);
    setFields((prev) => [...prev, newField]);
    showSnackbar(`Added ${type} field`);
  }, []);

  const deleteField = useCallback((id) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
    showSnackbar("Field deleted");
  }, []);

  const duplicateField = useCallback((field) => {
    const duplicated = {
      ...field,
      id: generateId(),
      name: `${field.name}_copy`,
      label: `${field.label} (Copy)`,
    };
    setFields((prev) => [...prev, duplicated]);
    showSnackbar("Field duplicated");
  }, []);

  const openEditDialog = useCallback((field) => {
    setEditingField({ ...field });
    setEditDialogOpen(true);
  }, []);

  const closeEditDialog = useCallback(() => {
    setEditDialogOpen(false);
    setEditingField(null);
  }, []);

  const saveField = useCallback(() => {
    if (!editingField) return;
    setFields((prev) =>
      prev.map((f) => (f.id === editingField.id ? editingField : f))
    );
    closeEditDialog();
    showSnackbar("Field updated");
  }, [editingField, closeEditDialog]);

  const updateEditingField = useCallback((updates) => {
    setEditingField((prev) => (prev ? { ...prev, ...updates } : null));
  }, []);

  const handleDragStart = useCallback((index) => {
    setDraggedIndex(index);
  }, []);

  const handleDragOver = useCallback((e, index) => {
    e.preventDefault();
    setDragOverIndex(index);
  }, []);

  const handleDrop = useCallback((index) => {
    if (draggedIndex === null || draggedIndex === index) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    setFields((prev) => {
      const newFields = [...prev];
      const [removed] = newFields.splice(draggedIndex, 1);
      newFields.splice(index, 0, removed);
      return newFields;
    });

    setDraggedIndex(null);
    setDragOverIndex(null);
    showSnackbar("Field reordered");
  }, [draggedIndex]);

  const exportJSON = useCallback(() => {
    const json = JSON.stringify(fields, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "form-schema.json";
    a.click();
    URL.revokeObjectURL(url);
    showSnackbar("Form schema exported");
    if (onExport) onExport(fields);
  }, [fields, onExport]);

  const copyToClipboard = useCallback(() => {
    const json = JSON.stringify(fields, null, 2);
    navigator.clipboard.writeText(json);
    showSnackbar("JSON copied to clipboard");
  }, [fields]);

  const handleImport = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (Array.isArray(imported)) {
          setFields(imported.map((f) => ({ ...f, id: f.id || generateId() })));
          showSnackbar("Form schema imported successfully");
        } else {
          showSnackbar("Invalid JSON format. Expected an array.", "error");
        }
      } catch (err) {
        showSnackbar("Failed to parse JSON", "error");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const presetTemplates = [
    {
      name: "Contact Form",
      fields: [
        { ...createDefaultField(fieldTypes.text), name: "name", label: "Full Name", required: true },
        { ...createDefaultField(fieldTypes.email), name: "email", label: "Email Address", required: true },
        { ...createDefaultField(fieldTypes.textarea), name: "message", label: "Message", required: true },
      ],
    },
    {
      name: "User Registration",
      fields: [
        { ...createDefaultField(fieldTypes.text), name: "username", label: "Username", required: true },
        { ...createDefaultField(fieldTypes.email), name: "email", label: "Email", required: true },
        { ...createDefaultField(fieldTypes.password), name: "password", label: "Password", required: true },
        { ...createDefaultField(fieldTypes.checkbox), name: "terms", label: "I agree to the terms", required: true },
      ],
    },
    {
      name: "Survey Form",
      fields: [
        { ...createDefaultField(fieldTypes.text), name: "name", label: "Your Name" },
        {
          ...createDefaultField(fieldTypes.radio),
          name: "satisfaction",
          label: "How satisfied are you?",
          options: [
            { label: "Very Satisfied", value: "very_satisfied" },
            { label: "Satisfied", value: "satisfied" },
            { label: "Neutral", value: "neutral" },
            { label: "Dissatisfied", value: "dissatisfied" },
          ],
        },
        { ...createDefaultField(fieldTypes.slider), name: "rating", label: "Rating (1-10)", min: 1, max: 10 },
        { ...createDefaultField(fieldTypes.textarea), name: "feedback", label: "Additional Feedback" },
      ],
    },
  ];

  const loadTemplate = (template) => {
    setFields(template.fields.map((f) => ({ ...f, id: generateId() })));
    showSnackbar(`Loaded ${template.name} template`);
  };

  return (
    <Box sx={{ width: "100%", ...props }}>
      <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h5">Form Builder</Typography>
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            startIcon={<Upload />}
            component="label">
            Import
            <input
              type="file"
              hidden
              accept=".json"
              onChange={handleImport}
            />
          </Button>
          <Button
            variant="outlined"
            startIcon={<ContentCopy />}
            onClick={copyToClipboard}>
            Copy JSON
          </Button>
          <Button
            variant="contained"
            startIcon={<Download />}
            onClick={exportJSON}>
            Export
          </Button>
        </Stack>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Field Types
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Stack spacing={1}>
                {fieldTypeDefinitions.map((def) => (
                  <Button
                    key={def.type}
                    variant="outlined"
                    size="small"
                    fullWidth
                    startIcon={def.icon}
                    onClick={() => addField(def.type)}>
                    {def.label}
                  </Button>
                ))}
              </Stack>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom>
                Templates
              </Typography>
              <Stack spacing={1}>
                {presetTemplates.map((template) => (
                  <Chip
                    key={template.name}
                    label={template.name}
                    onClick={() => loadTemplate(template)}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 9 }}>
          <Card>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs value={activeTab} onChange={handleTabChange}>
                <Tab icon={<Edit />} label="Builder" iconPosition="start" />
                <Tab icon={<Preview />} label="Preview" iconPosition="start" />
                <Tab icon={<Code />} label="JSON" iconPosition="start" />
              </Tabs>
            </Box>

            <CardContent>
              <TabPanel value={activeTab} index={0}>
                {fields.length === 0 ? (
                  <Box
                    sx={{
                      p: 8,
                      textAlign: "center",
                      border: "2px dashed",
                      borderColor: "divider",
                      borderRadius: 2,
                    }}>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      No fields yet
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Drag or click field types from the sidebar to add them to your form
                    </Typography>
                  </Box>
                ) : (
                  <Stack spacing={2}>
                    {fields.map((field, index) => (
                      <Card
                        key={field.id}
                        variant="outlined"
                        sx={{
                          opacity: draggedIndex === index ? 0.5 : 1,
                          borderColor: dragOverIndex === index ? "primary.main" : "divider",
                        }}
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={(e) => handleDragOver(e, index)}
                        onDrop={() => handleDrop(index)}>
                        <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                          <DragIndicator sx={{ cursor: "grab", color: "text.secondary" }} />
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle2">
                              {field.label}
                              {field.required && (
                                <Chip
                                  label="Required"
                                  size="small"
                                  color="error"
                                  variant="outlined"
                                  sx={{ ml: 1 }}
                                />
                              )}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Type: {field.type} | Name: {field.name}
                            </Typography>
                          </Box>
                          <Stack direction="row" spacing={0.5}>
                            <Tooltip title="Edit">
                              <IconButton
                                size="small"
                                onClick={() => openEditDialog(field)}>
                                <Edit fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Duplicate">
                              <IconButton
                                size="small"
                                onClick={() => duplicateField(field)}>
                                <ContentCopy fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => deleteField(field.id)}>
                                <Delete fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </CardContent>
                      </Card>
                    ))}
                  </Stack>
                )}
              </TabPanel>

              <TabPanel value={activeTab} index={1}>
                {fields.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    Add some fields to preview the form
                  </Typography>
                ) : (
                  <Card variant="outlined" sx={{ p: 3 }}>
                    <DynamicForm
                      fields={fields}
                      title="Form Preview"
                      onSubmit={(values, actions) => {
                        console.log("Preview submitted:", values);
                        showSnackbar("Form submitted! Check console for values.");
                        actions.setSubmitting(false);
                      }}
                    />
                  </Card>
                )}
              </TabPanel>

              <TabPanel value={activeTab} index={2}>
                <TextField
                  fullWidth
                  multiline
                  minRows={15}
                  maxRows={30}
                  value={JSON.stringify(fields, null, 2)}
                  variant="outlined"
                  InputProps={{
                    readOnly: true,
                    sx: { fontFamily: "monospace", fontSize: "0.875rem" },
                  }}
                />
              </TabPanel>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={editDialogOpen} onClose={closeEditDialog} maxWidth="md" fullWidth>
        <DialogTitle>Edit Field</DialogTitle>
        <DialogContent>
          {editingField && (
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={2}>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    label="Field Name"
                    value={editingField.name}
                    onChange={(e) => updateEditingField({ name: e.target.value })}
                    helperText="Used as the formik field key"
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    label="Label"
                    value={editingField.label}
                    onChange={(e) => updateEditingField({ label: e.target.value })}
                  />
                </Grid>
                <Grid size={6}>
                  <FormControl fullWidth>
                    <InputLabel>Field Type</InputLabel>
                    <Select
                      value={editingField.type}
                      label="Field Type"
                      onChange={(e) => updateEditingField({ type: e.target.value })}>
                      {fieldTypeDefinitions.map((def) => (
                        <MenuItem key={def.type} value={def.type}>
                          {def.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={6}>
                  <FormControl fullWidth>
                    <InputLabel>Grid Size (MD)</InputLabel>
                    <Select
                      value={editingField.size?.md || 6}
                      label="Grid Size (MD)"
                      onChange={(e) =>
                        updateEditingField({
                          size: { ...editingField.size, md: e.target.value },
                        })
                      }>
                      <MenuItem value={12}>Full Width (12)</MenuItem>
                      <MenuItem value={6}>Half (6)</MenuItem>
                      <MenuItem value={4}>Third (4)</MenuItem>
                      <MenuItem value={3}>Quarter (3)</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={12}>
                  <TextField
                    fullWidth
                    label="Helper Text"
                    value={editingField.helperText || ""}
                    onChange={(e) => updateEditingField({ helperText: e.target.value })}
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    fullWidth
                    label="Default Value"
                    value={editingField.defaultValue || ""}
                    onChange={(e) => updateEditingField({ defaultValue: e.target.value })}
                  />
                </Grid>
                <Grid size={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={editingField.required || false}
                        onChange={(e) => updateEditingField({ required: e.target.checked })}
                      />
                    }
                    label="Required Field"
                  />
                </Grid>

                {(editingField.type === fieldTypes.select ||
                  editingField.type === fieldTypes.radio ||
                  editingField.type === fieldTypes.autocomplete) && (
                  <Grid size={12}>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle2" gutterBottom>
                      Options (one per line, format: value|label)
                    </Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      value={
                        editingField.options
                          ?.map((o) => `${o.value}|${o.label}`)
                          .join("\n") || ""
                      }
                      onChange={(e) => {
                        const lines = e.target.value.split("\n").filter((l) => l.trim());
                        const options = lines.map((line) => {
                          const [value, label] = line.split("|");
                          return {
                            value: value?.trim() || label?.trim() || "",
                            label: label?.trim() || value?.trim() || "",
                          };
                        });
                        updateEditingField({ options });
                      }}
                      placeholder="option1|Option 1&#10;option2|Option 2"
                    />
                  </Grid>
                )}

                {editingField.type === fieldTypes.slider && (
                  <>
                    <Grid size={4}>
                      <TextField
                        fullWidth
                        type="number"
                        label="Min Value"
                        value={editingField.min || 0}
                        onChange={(e) =>
                          updateEditingField({ min: parseInt(e.target.value) || 0 })
                        }
                      />
                    </Grid>
                    <Grid size={4}>
                      <TextField
                        fullWidth
                        type="number"
                        label="Max Value"
                        value={editingField.max || 100}
                        onChange={(e) =>
                          updateEditingField({ max: parseInt(e.target.value) || 100 })
                        }
                      />
                    </Grid>
                    <Grid size={4}>
                      <TextField
                        fullWidth
                        type="number"
                        label="Step"
                        value={editingField.step || 1}
                        onChange={(e) =>
                          updateEditingField({ step: parseInt(e.target.value) || 1 })
                        }
                      />
                    </Grid>
                  </>
                )}

                {editingField.type === fieldTypes.autocomplete && (
                  <Grid size={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={editingField.multiple || false}
                          onChange={(e) =>
                            updateEditingField({ multiple: e.target.checked })
                          }
                        />
                      }
                      label="Allow Multiple Selection"
                    />
                  </Grid>
                )}

                {editingField.type === fieldTypes.textarea && (
                  <Grid size={12}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Number of Rows"
                      value={editingField.rows || 4}
                      onChange={(e) =>
                        updateEditingField({ rows: parseInt(e.target.value) || 4 })
                      }
                    />
                  </Grid>
                )}
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditDialog}>Cancel</Button>
          <Button onClick={saveField} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}>
        <Alert
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          severity={snackbar.severity}
          sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
