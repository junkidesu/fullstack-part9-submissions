import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  ButtonGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Input,
  SelectChangeEvent,
  OutlinedInput,
} from "@mui/material";
import { Diagnosis, EntryFormValues } from "../../types";

interface NewEntryFormProps {
  onSubmit: (newEntry: EntryFormValues) => void;
  diagnoses: Diagnosis[];
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const NewEntryForm = ({ onSubmit, diagnoses }: NewEntryFormProps) => {
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [employerName, setEmployerName] = useState<string>("");
  const [dischargeDate, setDischargeDate] = useState<string>("");
  const [dischargeCriteria, setDischargeCriteria] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [type, setType] = useState<string>("HealthCheck");

  const onDiagnosisCodeChange = (
    event: SelectChangeEvent<typeof diagnosisCodes>
  ) => {
    const {
      target: { value },
    } = event;

    setDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
  };

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const base = {
      description,
      date,
      specialist,
      diagnosisCodes,
    };

    switch (type) {
      case "HealthCheck":
        onSubmit({
          ...base,
          type,
          healthCheckRating: Number(healthCheckRating),
        });
        break;
      case "OccupationalHealthcare":
        onSubmit({
          ...base,
          type,
          employerName,
          sickLeave:
            startDate && endDate
              ? {
                  startDate,
                  endDate,
                }
              : undefined,
        });
        break;
      case "Hospital":
        onSubmit({
          ...base,
          type,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        });
        break;
      default:
        console.log("to be added");
    }

    setDescription("");
    setDate("");
    setSpecialist("");
    setHealthCheckRating(0);
    setDiagnosisCodes([]);
    setStartDate("");
    setEndDate("");
    setEmployerName("");
    setDischargeCriteria("");
    setDischargeDate("");
  };

  return (
    <Box sx={{ border: "3px dotted black", padding: "5px 10px" }}>
      <h4>New Entry</h4>

      <form onSubmit={addEntry}>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel id="entry-type-select-label">Type</InputLabel>

          <Select
            labelId="entry-type-select-label"
            label="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value={"HealthCheck"}>Health Check</MenuItem>
            <MenuItem value={"OccupationalHealthcare"}>
              Occupational Healthcare
            </MenuItem>
            <MenuItem value={"Hospital"}>Hospital</MenuItem>
          </Select>
        </FormControl>

        <TextField
          sx={{ m: 1 }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          label="Description"
          fullWidth
          required
        />

        <Box sx={{ m: 1 }}>
          <InputLabel htmlFor="id">Date</InputLabel>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Box>

        <TextField
          sx={{ m: 1 }}
          value={specialist}
          onChange={(e) => setSpecialist(e.target.value)}
          label="Specialist"
          fullWidth
          required
        />

        <FormControl sx={{ m: 1 }} fullWidth>
          <InputLabel id="diagnosis-codes-select">Diagnosis codes</InputLabel>

          <Select
            labelId="diagnosis-codes-select"
            label="Diagnosis Codes"
            multiple
            value={diagnosisCodes}
            input={<OutlinedInput label="Diagnosis codes" />}
            onChange={onDiagnosisCodeChange}
            MenuProps={MenuProps}
          >
            {diagnoses
              .map((d) => d.code)
              .map((code) => (
                <MenuItem key={code} value={code}>
                  {code}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        {type === "HealthCheck" && (
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel id="health-check-select">Type</InputLabel>

            <Select
              labelId="health-check-select"
              label="Rating"
              value={healthCheckRating}
              onChange={(e) => setHealthCheckRating(Number(e.target.value))}
            >
              <MenuItem value={0}>Healthy</MenuItem>
              <MenuItem value={1}>Low Risk</MenuItem>
              <MenuItem value={2}>High Risk</MenuItem>
              <MenuItem value={3}>Critical Risk</MenuItem>
            </Select>
          </FormControl>
        )}

        {type === "OccupationalHealthcare" && (
          <div>
            <TextField
              sx={{ m: 1 }}
              value={employerName}
              onChange={(e) => setEmployerName(e.target.value)}
              label="Employer"
              required
              fullWidth
            />

            <Box sx={{ m: 1 }}>
              <InputLabel>Sick leave</InputLabel>

              <Box sx={{ m: 1 }}>
                <InputLabel htmlFor="start-date">Start Date</InputLabel>
                <Input
                  id="start-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </Box>
              <Box sx={{ m: 1 }}>
                <InputLabel htmlFor="end-date">End Date</InputLabel>
                <Input
                  id="end-date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </Box>
            </Box>
          </div>
        )}

        {type === "Hospital" && (
          <Box sx={{ m: 1 }}>
            <InputLabel>Discharge</InputLabel>

            <TextField
              label="Criteria"
              value={dischargeCriteria}
              onChange={(e) => setDischargeCriteria(e.target.value)}
              fullWidth
              required
            />

            <Box sx={{ m: 1 }}>
              <InputLabel htmlFor="discharge-date">Discharge date</InputLabel>
              <Input
                id="discharge-date"
                type="date"
                value={dischargeDate}
                onChange={(e) => setDischargeDate(e.target.value)}
                required
              />
            </Box>
          </Box>
        )}

        <ButtonGroup
          variant="contained"
          aria-label="medium button group"
          sx={{ marginTop: "10px" }}
        >
          <Button color="primary" type="submit">
            Add
          </Button>
          <Button color="secondary">Cancel</Button>
        </ButtonGroup>
      </form>
    </Box>
  );
};

export default NewEntryForm;
